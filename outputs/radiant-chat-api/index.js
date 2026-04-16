/**
 * Radiant Digital Chat API v3.0
 *
 * Endpoints (public):
 *   GET  /              → health check
 *   POST /api/chat      → mode-aware chat (llm | static)
 *
 * Admin panel (secret URL set via ADMIN_PATH env var):
 *   GET  <ADMIN_PATH>              → serves admin React SPA
 *   POST <ADMIN_PATH>/auth/login   → login (rate-limited)
 *   POST <ADMIN_PATH>/auth/logout  → logout
 *   GET  <ADMIN_PATH>/api/status   → current mode + uptime [JWT]
 *   POST <ADMIN_PATH>/api/toggle   → switch llm ↔ static [JWT]
 */

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { handleLLMChat, GEMMA_MODEL } from './handlers/llmHandler.js'
import { handleStaticChat } from './handlers/staticHandler.js'
import { requireAuth } from './middleware/auth.js'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Validate required env vars ───────────────────────────────────────────────
const REQUIRED = ['GOOGLE_AI_API_KEY', 'ADMIN_USERNAME', 'ADMIN_PASSWORD_HASH', 'JWT_SECRET', 'ADMIN_PATH']
for (const key of REQUIRED) {
  if (!process.env[key]) {
    console.error(`ERROR: ${key} is missing from .env`)
    process.exit(1)
  }
}

const ADMIN_PATH = process.env.ADMIN_PATH  // e.g. /admin-a8f2k3p9
const ADMIN_DIST = join(__dirname, '../radiant-chat-admin/dist')
const CONFIG_PATH = join(__dirname, 'config.json')
const COOKIE_NAME = 'admin_token'

// ─── Config helpers (chat mode persisted to config.json) ─────────────────────
function readConfig() {
  try {
    return JSON.parse(readFileSync(CONFIG_PATH, 'utf8'))
  } catch {
    return { chatMode: 'llm' }
  }
}

function writeConfig(data) {
  writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2), 'utf8')
}

// ─── Express setup ────────────────────────────────────────────────────────────
const app = express()

const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true)
    else callback(new Error(`CORS blocked: ${origin}`))
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

// ─── Rate limiter for login endpoint (5 attempts / 15 min per IP) ─────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts — try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ─── Public: Health check ─────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  const { chatMode } = readConfig()
  res.json({
    status: 'ok',
    service: 'Radiant Digital Chat API',
    model: GEMMA_MODEL,
    version: '3.0.0',
    chatMode,
    timestamp: new Date().toISOString(),
  })
})

// ─── Public: Chat endpoint ────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message field is required and must be a string' })
  }

  const sanitized = message.trim().slice(0, 500)
  if (sanitized.length === 0) {
    return res.status(400).json({ error: 'message cannot be empty' })
  }

  const { chatMode } = readConfig()
  console.log(`[${new Date().toISOString()}] mode=${chatMode} query="${sanitized}"`)

  // ── Static mode — instant, no API call ────────────────────────────────────
  if (chatMode === 'static') {
    const response = handleStaticChat(sanitized)
    return res.status(200).json(response)
  }

  // ── LLM mode — Gemma 4 ────────────────────────────────────────────────────
  try {
    const response = await handleLLMChat(sanitized)
    return res.status(200).json(response)
  } catch (error) {
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota')) {
      console.warn('Google AI rate limit hit — falling back to static')
      return res.status(200).json(handleStaticChat(sanitized))
    }
    console.error('LLM error:', error?.message || error)
    return res.status(200).json(handleStaticChat(sanitized))
  }
})

// ─── Admin: Serve React SPA static files ─────────────────────────────────────
app.use(ADMIN_PATH, express.static(ADMIN_DIST))

// ─── Admin: Login ─────────────────────────────────────────────────────────────
app.post(`${ADMIN_PATH}/auth/login`, loginLimiter, (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  const validUser = username === process.env.ADMIN_USERNAME
  const validPass = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH)

  // Identical error for wrong user or wrong pass — don't reveal which
  if (!validUser || !validPass) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '4h' })

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 4 * 60 * 60 * 1000,
  })

  return res.status(200).json({ ok: true })
})

// ─── Admin: Logout ────────────────────────────────────────────────────────────
app.post(`${ADMIN_PATH}/auth/logout`, (_req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'strict' })
  return res.status(200).json({ ok: true })
})

// ─── Admin: Status [JWT protected] ───────────────────────────────────────────
app.get(`${ADMIN_PATH}/api/status`, requireAuth, (_req, res) => {
  const config = readConfig()
  return res.status(200).json({
    chatMode: config.chatMode,
    uptime: process.uptime(),
    model: GEMMA_MODEL,
    timestamp: new Date().toISOString(),
  })
})

// ─── Admin: Toggle mode [JWT protected] ──────────────────────────────────────
app.post(`${ADMIN_PATH}/api/toggle`, requireAuth, (req, res) => {
  const { mode } = req.body

  if (mode !== 'llm' && mode !== 'static') {
    return res.status(400).json({ error: 'mode must be "llm" or "static"' })
  }

  const config = readConfig()
  const previous = config.chatMode
  config.chatMode = mode
  writeConfig(config)

  console.log(`[Admin] Chat mode: ${previous} → ${mode} (by ${req.admin.username})`)

  return res.status(200).json({ ok: true, chatMode: mode, previous })
})

// ─── Admin: SPA catch-all (client-side routing) ───────────────────────────────
app.get(`${ADMIN_PATH}/*`, (_req, res) => {
  res.sendFile(join(ADMIN_DIST, 'index.html'))
})

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  const { chatMode } = readConfig()
  console.log(`
  ┌──────────────────────────────────────────────────────┐
  │   Radiant Digital Chat API v3.0                      │
  │   http://localhost:${PORT}                              │
  │   Chat mode : ${chatMode.padEnd(38)}│
  │   Model     : ${GEMMA_MODEL.padEnd(38)}│
  │   Admin URL : localhost:${PORT}${ADMIN_PATH.padEnd(27)}│
  └──────────────────────────────────────────────────────┘
  `)
})

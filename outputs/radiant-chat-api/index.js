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
import { sendReportEmail, isMailConfigured } from './utils/mailer.js'

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
const ADMIN_DIST = join(__dirname, 'admin-panel')
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
  process.env.FRONTEND_URL,
].filter(Boolean)

const localhostPattern = /^http:\/\/localhost:\d+$/

// Per-request CORS so we can detect same-origin (Origin host === request host)
// and allow it without needing FRONTEND_URL to be set. This makes the
// reverse-proxy-under-same-domain deploy on Liquid Web work out of the box.
app.use((req, res, next) => {
  const origin = req.headers.origin
  const host = req.headers.host
  let sameOrigin = false
  if (origin && host) {
    try {
      sameOrigin = new URL(origin).host === host
    } catch { /* malformed Origin — treat as cross-origin */ }
  }

  return cors({
    origin: (o, callback) => {
      if (!o || sameOrigin || localhostPattern.test(o) || allowedOrigins.includes(o)) callback(null, true)
      else callback(new Error(`CORS blocked: ${o}`))
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })(req, res, next)
})

// The report endpoint carries a base64 PDF, so it needs a larger body limit.
// Every other route keeps the tight 10kb cap.
const REPORT_PATH = '/api/assessment-report'
app.use((req, res, next) => {
  if (req.path === REPORT_PATH) return express.json({ limit: '4mb' })(req, res, next)
  return express.json({ limit: '10kb' })(req, res, next)
})
app.use(cookieParser())

// Rate limit the report endpoint (10 requests / hour per IP)
const reportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many report requests — try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

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

// ─── Public: Email the assessment report PDF ─────────────────────────────────
app.post(REPORT_PATH, reportLimiter, async (req, res) => {
  const { name, email, company, sector, orgSize, department, consent,
    assessment, headline, pdfBase64, pdfFilename, filename, website } = req.body || {}
  const reportFilename = pdfFilename || filename // frontend sends pdfFilename; keep filename as fallback

  // Honeypot — silently accept bot submissions without sending anything
  if (website) return res.status(200).json({ ok: true })

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email is required' })
  }
  if (!pdfBase64 || typeof pdfBase64 !== 'string' || pdfBase64.length > 5_000_000) {
    return res.status(400).json({ error: 'A valid report attachment is required' })
  }

  if (!isMailConfigured()) {
    return res.status(503).json({ error: 'email_not_configured' })
  }

  try {
    const pdfBuffer = Buffer.from(pdfBase64, 'base64')
    const lead = {
      name: (name || '').toString().slice(0, 120),
      email: email.trim().slice(0, 160),
      company: (company || '').toString().slice(0, 160),
      sector: (sector || '').toString().slice(0, 80),
      orgSize: (orgSize || '').toString().slice(0, 40),
      department: (department || '').toString().slice(0, 80),
      consent: !!consent,
      assessment: (assessment || 'Assessment').toString().slice(0, 60),
      headline: (headline || '').toString().slice(0, 200),
    }
    await sendReportEmail(lead, pdfBuffer, (reportFilename || 'Radiant-Report.pdf').toString().slice(0, 120))
    console.log(`[${new Date().toISOString()}] report emailed → ${lead.email} (${lead.assessment})`)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Report email failed:', error?.message || error)
    return res.status(500).json({ error: 'send_failed' })
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

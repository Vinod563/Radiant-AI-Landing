/**
 * Radiant Digital Chat API
 * Express server that connects the chat UI to Groq (LLaMA 3.3)
 * and returns structured JSON cards matching the frontend card schema.
 *
 * Endpoints:
 *   GET  /           → health check
 *   POST /api/chat   → main chat endpoint
 */

import express from 'express'
import cors from 'cors'
import Groq from 'groq-sdk'
import dotenv from 'dotenv'
import { radiantContext } from './knowledge/radiantContext.js'
import { buildSystemPrompt, validateResponse, getFallbackResponse } from './utils/cardBuilder.js'

dotenv.config()

// ─── Validate env vars on startup ────────────────────────────────────────────
if (!process.env.GROQ_API_KEY) {
  console.error('ERROR: GROQ_API_KEY is missing from .env file')
  process.exit(1)
}

// ─── Init ─────────────────────────────────────────────────────────────────────
const app = express()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// ─── Allowed frontend origins ─────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',          // Vite dev server
  'http://localhost:4173',          // Vite preview
  process.env.FRONTEND_URL,        // Production Vercel URL (set in .env)
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., curl, Postman) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin}`))
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json({ limit: '10kb' }))

// ─── Build system prompt once at startup (not on every request) ───────────────
const SYSTEM_PROMPT = buildSystemPrompt(radiantContext)

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Radiant Digital Chat API',
    model: 'llama-3.3-70b-versatile',
    timestamp: new Date().toISOString(),
  })
})

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body

  // Input validation
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message field is required and must be a string' })
  }

  const sanitized = message.trim().slice(0, 500) // limit input length

  if (sanitized.length === 0) {
    return res.status(400).json({ error: 'message cannot be empty' })
  }

  console.log(`[${new Date().toISOString()}] Query: "${sanitized}"`)

  try {
    // ── Call Groq API ──────────────────────────────────────────────────────────
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: sanitized,
        },
      ],
      temperature: 0.3,         // low temperature = consistent JSON structure
      max_tokens: 1800,
      response_format: { type: 'json_object' },  // forces valid JSON output
    })

    const rawContent = completion.choices[0]?.message?.content

    if (!rawContent) {
      console.warn('Empty response from Groq')
      return res.status(200).json(getFallbackResponse())
    }

    // ── Parse JSON ─────────────────────────────────────────────────────────────
    let parsed
    try {
      parsed = JSON.parse(rawContent)
    } catch (parseError) {
      console.error('JSON parse failed:', rawContent.slice(0, 200))
      return res.status(200).json(getFallbackResponse())
    }

    // ── Validate structure ─────────────────────────────────────────────────────
    if (!validateResponse(parsed)) {
      console.warn('Invalid card structure from LLM:', JSON.stringify(parsed).slice(0, 200))
      return res.status(200).json(getFallbackResponse())
    }

    // ── Ensure exactly 4 follow-ups ────────────────────────────────────────────
    const followUp = Array.isArray(parsed.followUp) && parsed.followUp.length >= 4
      ? parsed.followUp.slice(0, 4)
      : [
          'What solutions does Radiant Digital offer?',
          'Tell me about the Precision Context Engine',
          'Show me a case study',
          'How can I contact Radiant Digital?',
        ]

    console.log(`[${new Date().toISOString()}] Success: ${parsed.cards.length} cards returned`)

    return res.status(200).json({
      cards: parsed.cards,
      followUp,
    })

  } catch (error) {
    // ── Handle Groq API errors ─────────────────────────────────────────────────
    if (error?.status === 429) {
      console.warn('Groq rate limit hit')
      return res.status(200).json({
        ...getFallbackResponse(),
        cards: [{
          type: 'hero',
          title: "One moment — we'll be right back",
          subtitle: "We're experiencing high demand. Please try your question again in a moment, or reach out to us at info@radiant.digital.",
          accent: '#596AE0',
        }],
      })
    }

    console.error('Groq API error:', error?.message || error)
    return res.status(200).json(getFallbackResponse())
  }
})

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────────┐
  │   Radiant Digital Chat API                  │
  │   Running on http://localhost:${PORT}          │
  │   Model: llama-3.3-70b-versatile            │
  │   Allowed origins: ${allowedOrigins.length} configured            │
  └─────────────────────────────────────────────┘
  `)
})

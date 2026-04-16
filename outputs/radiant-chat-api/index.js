/**
 * Radiant Digital Chat API v2.0
 * Express server powered by Gemma 4 (Google AI) with dynamic card selection.
 * Gemma 4 intelligently picks the right UI card type based on query intent.
 *
 * Endpoints:
 *   GET  /           → health check
 *   POST /api/chat   → main chat endpoint
 */

import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { radiantContext } from './knowledge/radiantContext.js'
import { buildSystemPrompt, validateResponse, getFallbackResponse } from './utils/cardBuilder.js'

dotenv.config()

// ─── Validate env vars on startup ────────────────────────────────────────────
if (!process.env.GOOGLE_AI_API_KEY) {
  console.error('ERROR: GOOGLE_AI_API_KEY is missing from .env file')
  console.error('Get your free key at: https://aistudio.google.com/apikey')
  process.exit(1)
}

// ─── Init Google AI client ────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)

const GEMMA_MODEL = 'gemma-4-31b-it'

// ─── Init Express ─────────────────────────────────────────────────────────────
const app = express()

// ─── Allowed frontend origins ─────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
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

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Radiant Digital Chat API',
    model: GEMMA_MODEL,
    version: '2.0.0',
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

  const sanitized = message.trim().slice(0, 500)

  if (sanitized.length === 0) {
    return res.status(400).json({ error: 'message cannot be empty' })
  }

  console.log(`[${new Date().toISOString()}] Query: "${sanitized}"`)

  // ── Build system prompt — Gemma chooses card types autonomously ───────────────
  const systemPrompt = buildSystemPrompt(radiantContext)

  try {
    // ── Init Gemma 4 model with native JSON output + system instruction ────────
    const model = genAI.getGenerativeModel({
      model: GEMMA_MODEL,
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',  // native JSON enforcement
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    })

    // ── Call Gemma 4 ──────────────────────────────────────────────────────────
    const result = await model.generateContent(sanitized)

    // Gemma 4 is a thinking model — it returns thought parts alongside the actual
    // response. SDK v0.24 concatenates all parts in .text(), so we extract only
    // the non-thought part manually to get clean JSON.
    const candidate = result.response.candidates?.[0]
    const responsePart = candidate?.content?.parts?.find(p => !p.thought)
    const rawContent = responsePart?.text || result.response.text()

    if (!rawContent) {
      console.warn('Empty response from Gemma 4')
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
      console.warn('Invalid card structure from Gemma 4:', JSON.stringify(parsed).slice(0, 200))
      return res.status(200).json(getFallbackResponse())
    }

    // ── Ensure exactly 4 follow-ups ────────────────────────────────────────────
    const followUp = Array.isArray(parsed.followUp) && parsed.followUp.length >= 4
      ? parsed.followUp.slice(0, 4)
      : [
          'What solutions does Radiant Digital offer?',
          'Tell me about the Precision Context Engine',
          'Show me case studies',
          'How can I contact Radiant Digital?',
        ]

    console.log(`[${new Date().toISOString()}] Success: ${parsed.cards.length} cards | Types: ${parsed.cards.map(c => c.type).join(', ')}`)

    return res.status(200).json({
      message: parsed.message || '',
      cards: parsed.cards,
      followUp,
    })

  } catch (error) {
    // ── Handle Google AI API errors ────────────────────────────────────────────
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota')) {
      console.warn('Google AI rate limit hit')
      return res.status(200).json({
        ...getFallbackResponse(),
        cards: [{
          type: 'hero',
          title: "One moment — we'll be right back",
          subtitle: "We're experiencing high demand. Please try your question again in a moment, or reach out at info@radiant.digital.",
          accent: '#596AE0',
        }],
      })
    }

    console.error('Google AI API error:', error?.message || error)
    return res.status(200).json(getFallbackResponse())
  }
})

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────────────────┐
  │   Radiant Digital Chat API v2.0                     │
  │   Running on http://localhost:${PORT}                  │
  │   Model: ${GEMMA_MODEL}                    │
  │   Dynamic UI: 9 card types, intent-aware routing    │
  │   Allowed origins: ${allowedOrigins.length} configured                      │
  └─────────────────────────────────────────────────────┘
  `)
})

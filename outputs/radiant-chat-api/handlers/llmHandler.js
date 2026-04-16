/**
 * LLM Handler — Gemma 4 (Google AI)
 * Extracted from index.js v2.0. Called when chatMode === 'llm'.
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import { radiantContext } from '../knowledge/radiantContext.js'
import { buildSystemPrompt, validateResponse, getFallbackResponse } from '../utils/cardBuilder.js'

const GEMMA_MODEL = 'gemma-4-31b-it'

let genAI = null

function getClient() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
  }
  return genAI
}

/**
 * @param {string} sanitized  — already trimmed + capped at 500 chars
 * @returns {{ message: string, cards: object[], followUp: string[] }}
 */
export async function handleLLMChat(sanitized) {
  const systemPrompt = buildSystemPrompt(radiantContext)

  const model = getClient().getGenerativeModel({
    model: GEMMA_MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.3,
      maxOutputTokens: 2048,
    },
  })

  const result = await model.generateContent(sanitized)

  // Gemma 4 is a thinking model — extract only the non-thought part for clean JSON
  const candidate = result.response.candidates?.[0]
  const responsePart = candidate?.content?.parts?.find(p => !p.thought)
  const rawContent = responsePart?.text || result.response.text()

  if (!rawContent) {
    console.warn('[LLM] Empty response from Gemma 4')
    return getFallbackResponse()
  }

  let parsed
  try {
    parsed = JSON.parse(rawContent)
  } catch {
    console.error('[LLM] JSON parse failed:', rawContent.slice(0, 200))
    return getFallbackResponse()
  }

  if (!validateResponse(parsed)) {
    console.warn('[LLM] Invalid card structure:', JSON.stringify(parsed).slice(0, 200))
    return getFallbackResponse()
  }

  const followUp = Array.isArray(parsed.followUp) && parsed.followUp.length >= 4
    ? parsed.followUp.slice(0, 4)
    : [
        'What solutions does Radiant Digital offer?',
        'Tell me about the Precision Context Engine',
        'Show me case studies',
        'How can I contact Radiant Digital?',
      ]

  console.log(`[LLM] ${parsed.cards.length} cards | Types: ${parsed.cards.map(c => c.type).join(', ')}`)

  return {
    message: parsed.message || '',
    cards: parsed.cards,
    followUp,
  }
}

export { GEMMA_MODEL }

/**
 * Chat Config Routes
 *
 * GET  /api/chat/config         — get current mode + settings (public, no api_key)
 * PUT  /api/chat/config         — update config (admin only)
 * POST /api/chat/message        — proxy message to dynamic AI if mode=dynamic
 */
const router = require('express').Router()
const pool   = require('../db/connection')

// GET /api/chat/config — public (frontend uses this to decide static vs dynamic)
router.get('/config', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT mode, api_url, model, system_prompt FROM chat_config WHERE id = 1'
    )
    if (!rows.length) return res.json({ mode: 'static' })
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load chat config' })
  }
})

// PUT /api/chat/config — admin only (auth applied in server.js)
router.put('/config', async (req, res) => {
  const { mode, api_url, api_key, model, system_prompt } = req.body

  if (!['static', 'dynamic'].includes(mode)) {
    return res.status(400).json({ error: 'mode must be "static" or "dynamic"' })
  }

  try {
    await pool.execute(
      `INSERT INTO chat_config (id, mode, api_url, api_key_enc, model, system_prompt)
       VALUES (1, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         mode = VALUES(mode),
         api_url = VALUES(api_url),
         api_key_enc = VALUES(api_key_enc),
         model = VALUES(model),
         system_prompt = VALUES(system_prompt),
         updated_at = NOW()`,
      [mode, api_url || '', api_key || '', model || 'gpt-4o', system_prompt || '']
    )
    res.json({ message: 'Chat config updated', mode })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update chat config' })
  }
})

// POST /api/chat/message — proxy to external AI when mode=dynamic
router.post('/message', async (req, res) => {
  const { message, history } = req.body
  if (!message) return res.status(400).json({ error: 'message required' })

  try {
    const [rows] = await pool.execute(
      'SELECT mode, api_url, api_key_enc, model, system_prompt FROM chat_config WHERE id = 1'
    )
    const config = rows[0]

    if (!config || config.mode === 'static') {
      return res.json({ mode: 'static', message: null })
    }

    if (!config.api_url || !config.api_key_enc) {
      return res.status(503).json({ error: 'Dynamic mode not configured' })
    }

    // Proxy to configured AI endpoint (OpenAI-compatible)
    const fetch = (await import('node-fetch')).default
    const payload = {
      model: config.model || 'gpt-4o',
      messages: [
        ...(config.system_prompt ? [{ role: 'system', content: config.system_prompt }] : []),
        ...(history || []),
        { role: 'user', content: message },
      ],
    }

    const aiRes = await fetch(`${config.api_url}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.api_key_enc}`,
      },
      body: JSON.stringify(payload),
    })

    if (!aiRes.ok) {
      const err = await aiRes.text()
      console.error('AI API error:', err)
      return res.status(502).json({ error: 'AI backend error' })
    }

    const data = await aiRes.json()
    const reply = data.choices?.[0]?.message?.content || ''
    res.json({ mode: 'dynamic', reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router

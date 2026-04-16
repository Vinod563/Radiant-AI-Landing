/**
 * CMS Content Routes — CRUD for content blocks.
 *
 * GET  /api/content          — all blocks (public, used by frontend)
 * GET  /api/content/:key     — single block (public)
 * PUT  /api/content/:key     — update block (admin only)
 * POST /api/content/:key/reset — reset to seed data (admin only)
 */
const router = require('express').Router()
const pool   = require('../db/connection')

// GET /api/content — all blocks (public endpoint, no auth)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT section_key, content_data FROM content_blocks')
    const result = {}
    for (const row of rows) {
      result[row.section_key] = typeof row.content_data === 'string'
        ? JSON.parse(row.content_data)
        : row.content_data
    }
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load content' })
  }
})

// GET /api/content/:key — single block (public)
router.get('/:key', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT content_data FROM content_blocks WHERE section_key = ?',
      [req.params.key]
    )
    if (!rows.length) return res.status(404).json({ error: 'Not found' })

    const data = typeof rows[0].content_data === 'string'
      ? JSON.parse(rows[0].content_data)
      : rows[0].content_data
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/content/:key — update (admin only, auth applied in server.js)
router.put('/:key', async (req, res) => {
  const { key } = req.params
  const body = req.body

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Body must be a JSON object' })
  }

  try {
    await pool.execute(
      `INSERT INTO content_blocks (section_key, content_data, updated_by)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_by = VALUES(updated_by), updated_at = NOW()`,
      [key, JSON.stringify(body), req.user.email]
    )
    res.json({ message: 'Saved', key })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save content' })
  }
})

module.exports = router

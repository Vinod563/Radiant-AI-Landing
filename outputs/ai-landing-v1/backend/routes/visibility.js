/**
 * Section Visibility Routes
 *
 * GET  /api/visibility        — all sections with visibility state (public)
 * PUT  /api/visibility/:name  — toggle or update section (admin only)
 * PUT  /api/visibility        — bulk update order/visibility (admin only)
 */
const router = require('express').Router()
const pool   = require('../db/connection')

// GET /api/visibility — public, used by frontend on page load
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT section_name, label, is_visible, display_order FROM section_visibility ORDER BY display_order ASC'
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load visibility config' })
  }
})

// PUT /api/visibility/:name — update single section (admin only)
router.put('/:name', async (req, res) => {
  const { name } = req.params
  const { is_visible, display_order } = req.body

  if (is_visible === undefined && display_order === undefined) {
    return res.status(400).json({ error: 'Provide is_visible or display_order' })
  }

  try {
    const fields = []
    const values = []
    if (is_visible !== undefined) { fields.push('is_visible = ?'); values.push(!!is_visible) }
    if (display_order !== undefined) { fields.push('display_order = ?'); values.push(parseInt(display_order)) }
    fields.push('updated_at = NOW()')
    values.push(name)

    await pool.execute(
      `UPDATE section_visibility SET ${fields.join(', ')} WHERE section_name = ?`,
      values
    )
    res.json({ message: 'Updated', section: name })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update visibility' })
  }
})

// PUT /api/visibility — bulk update (admin only)
// Body: [{ section_name, is_visible, display_order }, ...]
router.put('/', async (req, res) => {
  const updates = req.body
  if (!Array.isArray(updates)) return res.status(400).json({ error: 'Body must be an array' })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    for (const u of updates) {
      await conn.execute(
        `UPDATE section_visibility
         SET is_visible = ?, display_order = ?, updated_at = NOW()
         WHERE section_name = ?`,
        [!!u.is_visible, parseInt(u.display_order), u.section_name]
      )
    }
    await conn.commit()
    res.json({ message: 'Bulk update complete' })
  } catch (err) {
    await conn.rollback()
    console.error(err)
    res.status(500).json({ error: 'Bulk update failed' })
  } finally {
    conn.release()
  }
})

module.exports = router

const router  = require('express').Router()
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const pool    = require('../db/connection')

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' })
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, email, password_hash, role FROM admin_users WHERE email = ?',
      [email.toLowerCase().trim()]
    )
    const user = rows[0]
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    await pool.execute('UPDATE admin_users SET last_login = NOW() WHERE id = ?', [user.id])

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    )

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/change-password  (requires auth — handled in server.js)
router.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'newPassword must be at least 8 characters' })
  }

  try {
    const [rows] = await pool.execute(
      'SELECT password_hash FROM admin_users WHERE id = ?',
      [req.user.id]
    )
    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Current password incorrect' })

    const hash = await bcrypt.hash(newPassword, 12)
    await pool.execute('UPDATE admin_users SET password_hash = ? WHERE id = ?', [hash, req.user.id])

    res.json({ message: 'Password updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router

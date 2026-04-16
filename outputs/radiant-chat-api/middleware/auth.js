/**
 * auth.js — JWT authentication middleware
 * Verifies the httpOnly cookie set on login.
 * Attach to any route that requires admin access.
 */

import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const token = req.cookies?.admin_token

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = payload
    next()
  } catch {
    return res.status(401).json({ error: 'Session expired — please log in again' })
  }
}

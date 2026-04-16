require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const rateLimit  = require('express-rate-limit')
const { requireAuth } = require('./middleware/auth')

const authRoutes       = require('./routes/auth')
const contentRoutes    = require('./routes/content')
const visibilityRoutes = require('./routes/visibility')
const chatRoutes       = require('./routes/chat')

const app  = express()
const PORT = process.env.PORT || 3001

// ─── CORS ─────────────────────────────────────────────
const allowed = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: origin ${origin} not allowed`))
  },
  credentials: true,
}))

// ─── BODY PARSING ─────────────────────────────────────
app.use(express.json({ limit: '2mb' }))

// ─── RATE LIMITING ────────────────────────────────────
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many login attempts' })
const apiLimiter   = rateLimit({ windowMs: 1 * 60 * 1000,  max: 300 })

app.use('/api/', apiLimiter)
app.use('/api/auth/login', loginLimiter)

// ─── PUBLIC ROUTES ────────────────────────────────────
app.use('/api/auth',       authRoutes)
app.get('/api/content',    contentRoutes)
app.get('/api/content/:key', contentRoutes)
app.use('/api/visibility', (req, res, next) => {
  if (req.method === 'GET') return next()
  requireAuth(req, res, next)
}, visibilityRoutes)
app.post('/api/chat/message', chatRoutes)
app.get('/api/chat/config',   chatRoutes)

// ─── PROTECTED ADMIN ROUTES ───────────────────────────
app.use('/api/auth/change-password', requireAuth, authRoutes)
app.use('/api/content',   requireAuth, contentRoutes)
app.use('/api/chat',      requireAuth, chatRoutes)

// ─── HEALTH CHECK ─────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }))

// ─── START ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Radiant backend running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
})

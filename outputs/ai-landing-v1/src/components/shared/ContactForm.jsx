import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react'

/**
 * Shared contact form with canvas CAPTCHA + web3forms submission.
 *
 * Extracted from Chat.jsx's ContactDetailsCard so the chat contact card AND
 * both assessment flows (AI Adoption / CX Maturity) post to the SAME inbox
 * without duplicating ~250 lines. Reuse, do not duplicate.
 *
 * Props:
 *   accent     - accent color (default brand-green)
 *   subjectPrefix - email subject prefix; final subject = `${prefix} from ${name}`
 *   defaults   - { name, email, company, message } prefill
 *   meta       - extra key/values merged into the web3forms payload (e.g. assessment scores)
 *   heading    - small uppercase label above fields
 *   onSuccess  - called with the submitted form object after a successful send
 */

// Get your free access key at https://web3forms.com (enter vinod.mourya@radiant.digital)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '3a375f4a-b42f-45e0-a66f-0d787bf9e535'

export default function ContactForm({
  accent = '#91C46B',
  subjectPrefix = 'New inquiry',
  defaults = {},
  meta = null,
  heading = 'Send us a message',
  submitLabel = 'Send Message',
  onSuccess,
}) {
  const canvasRef = useRef(null)
  const [captchaCode, setCaptchaCode] = useState('')
  const [form, setForm] = useState({
    name: defaults.name || '',
    email: defaults.email || '',
    company: defaults.company || '',
    message: defaults.message || '',
    captcha: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let code = ''
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)]
    setCaptchaCode(code)
    return code
  }, [])

  const drawCaptcha = useCallback((code) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width, h = canvas.height

    ctx.fillStyle = 'rgba(10, 25, 47, 1)'
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random()*100+80}, ${Math.random()*100+80}, ${Math.random()*200+55}, 0.4)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(Math.random() * w, Math.random() * h)
      ctx.bezierCurveTo(Math.random()*w, Math.random()*h, Math.random()*w, Math.random()*h, Math.random()*w, Math.random()*h)
      ctx.stroke()
    }

    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(${Math.random()*200+55}, ${Math.random()*200+55}, ${Math.random()*200+55}, 0.3)`
      ctx.beginPath()
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2, 0, Math.PI * 2)
      ctx.fill()
    }

    const fontSize = 26
    ctx.textBaseline = 'middle'
    const startX = 15
    const spacing = (w - 30) / code.length

    for (let i = 0; i < code.length; i++) {
      ctx.save()
      const x = startX + i * spacing + spacing / 2
      const y = h / 2 + (Math.random() - 0.5) * 12
      const angle = (Math.random() - 0.5) * 0.5
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.font = `bold ${fontSize + Math.floor(Math.random()*6 - 3)}px monospace`
      const colors = ['#91C46B', '#596AE0', '#2DD4BF', '#F0974E', '#ffffff']
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.fillText(code[i], -fontSize / 4, 0)
      ctx.restore()
    }
  }, [])

  useEffect(() => {
    const code = generateCaptcha()
    const t = setTimeout(() => drawCaptcha(code), 50)
    return () => clearTimeout(t)
  }, [generateCaptcha, drawCaptcha])

  const refreshCaptcha = () => {
    const code = generateCaptcha()
    setForm(prev => ({ ...prev, captcha: '' }))
    setTimeout(() => drawCaptcha(code), 50)
  }

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    if (form.captcha.trim() !== captchaCode) {
      setError('Incorrect CAPTCHA. Please try again.')
      refreshCaptcha()
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${subjectPrefix} from ${form.name} — Radiant Digital AI`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          company: form.company || 'Not provided',
          message: form.message,
          ...(meta || {}),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        onSuccess?.(form)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Network error. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  // Static class — Tailwind JIT cannot generate arbitrary values from a runtime string.
  const focusBorder = 'focus:border-white/30'

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center"
        style={{ background: `${accent}10`, border: `1px solid ${accent}26` }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ background: `${accent}26` }}>
          <CheckCircle2 size={28} style={{ color: accent }} />
        </div>
        <h4 className="font-display font-bold text-white text-lg mb-2">Message Sent</h4>
        <p className="text-text-secondary text-sm leading-relaxed">
          Thank you, {form.name}. Our team will get back to you shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-text-muted text-[10px] font-display font-semibold uppercase tracking-widest mb-1">{heading}</div>

      <input
        type="text" name="name" placeholder="Full Name *" value={form.name} onChange={handleChange}
        className={`w-full rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none transition-all duration-200 ${focusBorder}`}
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      />
      <input
        type="email" name="email" placeholder="Work Email *" value={form.email} onChange={handleChange}
        className={`w-full rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none transition-all duration-200 ${focusBorder}`}
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      />
      <input
        type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange}
        className={`w-full rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none transition-all duration-200 ${focusBorder}`}
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      />
      <textarea
        name="message" placeholder="How can we help? *" rows={3} value={form.message} onChange={handleChange}
        className={`w-full rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none resize-none transition-all duration-200 ${focusBorder}`}
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      />

      {/* Visual CAPTCHA */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl overflow-hidden flex-shrink-0"
          style={{ border: '1px solid rgba(89,106,224,0.15)' }}>
          <canvas ref={canvasRef} width={160} height={48} className="rounded-l-xl" style={{ display: 'block' }} />
          <button type="button" onClick={refreshCaptcha} title="New CAPTCHA"
            className="px-2 py-3 text-text-muted hover:text-brand-green transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
        <input
          type="text" name="captcha" placeholder="Enter code" value={form.captcha} onChange={handleChange}
          autoComplete="off"
          className={`w-28 rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none text-center transition-all duration-200 ${focusBorder}`}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
      </div>

      {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full justify-center !py-3.5 group/btn disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{submitting ? 'Sending...' : submitLabel}</span>
        {!submitting && <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />}
      </button>

      <p className="text-text-muted text-[10px] text-center leading-relaxed">
        By submitting, you agree to be contacted by Radiant Digital.
      </p>
    </form>
  )
}

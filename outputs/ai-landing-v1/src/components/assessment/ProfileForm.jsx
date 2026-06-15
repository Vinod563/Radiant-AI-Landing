import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Check, Briefcase, Cpu, TrendingUp, Compass } from 'lucide-react'
import { roles, sectors, orgSizes, departments, personalDomainBlocklist } from '../../data/aiAssessment.js'

const ACCENT = '#91C46B'

const roleIcons = { exec: Briefcase, tech: Cpu, biz: TrendingUp, consultant: Compass }

const fieldStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
const inputCls = 'w-full rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none transition-all duration-200 focus:border-white/30'

function isPersonalEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase() || ''
  const root = domain.split('.')[0]
  return personalDomainBlocklist.includes(root)
}

// Fully custom (application-themed) dropdown — replaces the native <select> so the
// open options panel is styled to match the app instead of the OS menu.
function Dropdown({ value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox" aria-expanded={open}
        className={`${inputCls} flex items-center justify-between gap-2 text-left ${value ? '' : 'text-white/50'}`}
        style={fieldStyle}>
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown size={16} className={`flex-shrink-0 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul role="listbox"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl overflow-hidden max-h-60 overflow-y-auto list-none p-1"
            style={{ background: 'rgba(8,20,34,0.98)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}>
            {options.map(o => {
              const active = value === o
              return (
                <li key={o} role="option" aria-selected={active}>
                  <button type="button" onClick={() => { onChange(o); setOpen(false) }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm flex items-center justify-between gap-2 transition-colors ${active ? 'bg-brand-green/10 text-white' : 'text-text-secondary hover:bg-white/[0.06] hover:text-white'}`}>
                    <span>{o}</span>
                    {active && <Check size={14} className="text-brand-green flex-shrink-0" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * "About You" profile form.
 * Props:
 *   onSubmit(profile)
 *   showRole   - whether to show the role picker (default true; CX sets false)
 *   heading / subtext - optional copy overrides
 */
export default function ProfileForm({ onSubmit, showRole = true, heading, subtext }) {
  const [profile, setProfile] = useState({
    role: '', fullName: '', workEmail: '', companyName: '',
    sector: '', orgSize: '', department: '', website: '', // website = honeypot
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (showRole && !profile.role) e.role = 'Select your role.'
    if (profile.fullName.trim().split(/\s+/).filter(Boolean).length < 2) e.fullName = 'Please enter your full name (first and last).'
    const email = profile.workEmail.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.workEmail = 'Enter a valid email address.'
    else if (isPersonalEmail(email)) e.workEmail = 'Please use your work email, not a personal address.'
    if (!profile.companyName.trim()) e.companyName = 'Required.'
    if (!profile.sector) e.sector = 'Required.'
    if (!profile.orgSize) e.orgSize = 'Required.'
    if (!profile.department) e.department = 'Required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (profile.website) return // honeypot tripped — silently block
    if (validate()) onSubmit(profile)
  }

  const Err = ({ k }) => errors[k] ? <p className="text-red-400 text-xs font-medium mt-1.5">{errors[k]}</p> : null

  return (
    <motion.form onSubmit={submit}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto">
      <span className="kicker mb-3">About You</span>
      <h2 className="font-display font-black text-white text-2xl lg:text-3xl tracking-tight mb-2">
        {heading || 'First, a little context'}
      </h2>
      <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-lg">
        {subtext || "Your role tailors the questions you'll see. Everything stays confidential — this is a diagnostic, not a sales pitch."}
      </p>

      {/* Role selection */}
      {showRole && (
        <div className="mb-7">
          <label className="text-text-muted text-[11px] font-display font-semibold uppercase tracking-widest mb-3 block">Your role</label>
          <div className="grid sm:grid-cols-2 gap-3">
            {roles.map(r => {
              const active = profile.role === r.key
              const Icon = roleIcons[r.key] || Briefcase
              return (
                <button type="button" key={r.key} onClick={() => set('role', r.key)}
                  className="text-left rounded-xl px-4 py-3.5 transition-all duration-200 flex items-center gap-3.5"
                  style={{ background: active ? `${ACCENT}14` : 'rgba(255,255,255,0.025)', border: `1px solid ${active ? `${ACCENT}66` : 'rgba(255,255,255,0.07)'}` }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: active ? ACCENT : 'rgba(255,255,255,0.05)', border: `1px solid ${active ? ACCENT : 'rgba(255,255,255,0.08)'}` }}>
                    <Icon size={18} style={{ color: active ? '#021018' : '#94A3B8' }} />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-white text-sm">{r.name}</span>
                    <span className="block text-text-muted text-xs mt-0.5">{r.desc}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <Err k="role" />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input className={inputCls} style={fieldStyle} placeholder="Full name *"
            value={profile.fullName} onChange={e => set('fullName', e.target.value)} />
          <Err k="fullName" />
        </div>
        <div>
          <input type="email" className={inputCls} style={fieldStyle} placeholder="Work email *"
            value={profile.workEmail} onChange={e => set('workEmail', e.target.value)} />
          <Err k="workEmail" />
        </div>
        <div>
          <input className={inputCls} style={fieldStyle} placeholder="Company name *"
            value={profile.companyName} onChange={e => set('companyName', e.target.value)} />
          <Err k="companyName" />
        </div>
        <div>
          <Dropdown value={profile.sector} onChange={v => set('sector', v)} placeholder="Sector *" options={sectors} />
          <Err k="sector" />
        </div>
        <div>
          <Dropdown value={profile.orgSize} onChange={v => set('orgSize', v)} placeholder="Organization size *" options={orgSizes} />
          <Err k="orgSize" />
        </div>
        <div>
          <Dropdown value={profile.department} onChange={v => set('department', v)} placeholder="Department *" options={departments} />
          <Err k="department" />
        </div>
      </div>

      {/* Honeypot — visually hidden */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={profile.website} onChange={e => set('website', e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

      <button type="submit" className="btn-primary !px-9 !py-3.5 mt-8 w-full sm:w-auto justify-center">
        Start the assessment <ArrowRight size={15} />
      </button>
    </motion.form>
  )
}

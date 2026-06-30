import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Cpu, TrendingUp, Compass } from 'lucide-react'
import { roles, sectors, orgSizes, departments, personalDomainBlocklist } from '../../data/aiAssessment.js'
import Dropdown from './Dropdown'

const ACCENT = '#91C46B'

const roleIcons = { exec: Briefcase, tech: Cpu, biz: TrendingUp, consultant: Compass }

const fieldStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
const inputCls = 'w-full rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none transition-all duration-200 focus:border-white/30'

function isPersonalEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase() || ''
  const root = domain.split('.')[0]
  return personalDomainBlocklist.includes(root)
}

/**
 * "About You" profile form.
 * Props:
 *   onSubmit(profile)
 *   showRole   - whether to show the role picker (default true; CX sets false)
 *   heading / subtext - optional copy overrides
 */
export default function ProfileForm({ onSubmit, showRole = true, heading, subtext, wrapperClass = 'max-w-2xl mx-auto' }) {
  const [profile, setProfile] = useState({
    role: '', fullName: '', workEmail: '', companyName: '',
    sector: '', orgSize: '', department: '', website: '', // website = honeypot
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }))

  const validate = () => {
    // Only the role is required (when shown). Every other field is optional,
    // we just sanity-check format when a value is actually provided.
    const e = {}
    if (showRole && !profile.role) e.role = 'Select your role.'
    const email = profile.workEmail.trim()
    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.workEmail = 'Enter a valid email address.'
      else if (isPersonalEmail(email)) e.workEmail = 'Please use your work email, not a personal address.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (profile.website) return // honeypot tripped, silently block
    if (validate()) onSubmit(profile)
  }

  const Err = ({ k }) => errors[k] ? <p className="text-red-400 text-xs font-medium mt-1.5">{errors[k]}</p> : null

  return (
    <motion.form onSubmit={submit}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className={wrapperClass}>
      <span className="kicker mb-3">About You</span>
      <h2 className="font-display font-black text-white text-2xl lg:text-3xl tracking-tight mb-2">
        {heading || 'First, a little context'}
      </h2>
      <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-lg">
        {subtext || "Your role tailors the questions you'll see. Everything stays confidential: this is a diagnostic, not a sales pitch."}
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

      <div className="flex items-center justify-between mb-3">
        <label className="text-text-muted text-[11px] font-display font-semibold uppercase tracking-widest">Your details</label>
        <span className="text-text-muted text-[11px]">Optional: add now or later</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input className={inputCls} style={fieldStyle} placeholder="Full name"
            value={profile.fullName} onChange={e => set('fullName', e.target.value)} />
          <Err k="fullName" />
        </div>
        <div>
          <input type="email" className={inputCls} style={fieldStyle} placeholder="Work email"
            value={profile.workEmail} onChange={e => set('workEmail', e.target.value)} />
          <Err k="workEmail" />
        </div>
        <div>
          <input className={inputCls} style={fieldStyle} placeholder="Company name"
            value={profile.companyName} onChange={e => set('companyName', e.target.value)} />
          <Err k="companyName" />
        </div>
        <div>
          <Dropdown value={profile.sector} onChange={v => set('sector', v)} placeholder="Sector" options={sectors} />
          <Err k="sector" />
        </div>
        <div>
          <Dropdown value={profile.orgSize} onChange={v => set('orgSize', v)} placeholder="Organization size" options={orgSizes} />
          <Err k="orgSize" />
        </div>
        <div>
          <Dropdown value={profile.department} onChange={v => set('department', v)} placeholder="Department" options={departments} />
          <Err k="department" />
        </div>
      </div>

      {/* Honeypot: visually hidden */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={profile.website} onChange={e => set('website', e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

      <button type="submit" className="btn-primary !px-9 !py-3.5 mt-8 w-full sm:w-auto justify-center">
        Start the assessment <ArrowRight size={15} />
      </button>
    </motion.form>
  )
}

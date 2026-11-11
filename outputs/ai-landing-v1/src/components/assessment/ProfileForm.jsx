import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Cpu, TrendingUp, Compass, Users, CheckCircle2 } from 'lucide-react'
import { roles as aiRoles, sectors, orgSizes, departments as aiDepartments, personalDomainBlocklist } from '../../data/aiAssessment.js'
import Dropdown from './Dropdown'
import { c, tone, alpha } from '../../theme/tokens'

const roleIcons = { exec: Briefcase, tech: Cpu, biz: TrendingUp, consultant: Compass, practitioner: Users }

// Control boundary uses border-strong (≥3:1, WCAG 1.4.11)
const fieldStyle = { background: c('surface-2'), border: `1px solid ${c('border-strong')}` }
const inputCls = 'w-full rounded-xl px-4 py-3 text-sm text-ink font-medium placeholder:text-text-muted outline-none transition-all duration-200 focus:border-ink/40'

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
 *   roles / departments - option lists (default: AI assessment; CX passes its own)
 *   accent     - selection colour (default brand green)
 *   headingAs  - heading element: 'h1' on the standalone page (default), 'h2' inside the chat
 */
export default function ProfileForm({
  onSubmit, showRole = true, heading, subtext, wrapperClass = 'max-w-2xl mx-auto',
  roles = aiRoles, departments = aiDepartments, accent = '#91C46B', headingAs: Heading = 'h1',
}) {
  const ACCENT = tone(accent)
  const [profile, setProfile] = useState({
    role: '', fullName: '', workEmail: '', companyName: '',
    sector: '', orgSize: '', department: '', website: '', // website = honeypot
  })
  const [errors, setErrors] = useState({})
  const roleLabelId = useId()

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

  const Err = ({ k }) => errors[k] ? <p className="text-danger text-[13px] font-medium mt-1.5">{errors[k]}</p> : null

  return (
    <motion.form onSubmit={submit}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className={wrapperClass}>
      <span className="kicker mb-3" style={{ fontSize: 13 }}>About You</span>
      <Heading className="font-display font-bold text-ink text-2xl lg:text-3xl leading-[1.3] lg:leading-[1.3] tracking-normal mb-2">
        {heading || 'First, a little context'}
      </Heading>
      <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-lg">
        {subtext || "Your role tailors the questions you'll see. Everything stays confidential: this is a diagnostic, not a sales pitch."}
      </p>

      {/* Role selection: the one required choice, set apart from the optional details */}
      {showRole && (
        <div className="mb-9">
          <div className="flex items-center gap-2.5 mb-3">
            <span id={roleLabelId} className="text-text-secondary text-[13px] font-display font-semibold uppercase tracking-wider">Your role</span>
            <span className="text-[12px] font-display font-semibold px-2 py-0.5 rounded-full"
              style={{ color: ACCENT, background: alpha(ACCENT, 10), border: `1px solid ${alpha(ACCENT, 40)}` }}>Required</span>
          </div>
          <div role="radiogroup" aria-labelledby={roleLabelId} aria-required="true" className="grid sm:grid-cols-2 gap-3">
            {roles.map(r => {
              const active = profile.role === r.key
              const Icon = roleIcons[r.key] || Briefcase
              return (
                <button type="button" key={r.key} role="radio" aria-checked={active} onClick={() => set('role', r.key)}
                  className="relative text-left rounded-xl px-4 py-3.5 transition-all duration-200 flex items-center gap-3.5"
                  style={{
                    background: active ? alpha(ACCENT, 15) : c('surface-1'),
                    border: active ? `2px solid ${ACCENT}` : `2px solid ${c('border')}`,
                    boxShadow: active ? `0 0 0 4px ${alpha(ACCENT, 12)}` : 'none',
                  }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: active ? ACCENT : c('surface-2'), border: `1px solid ${active ? ACCENT : c('border')}` }}>
                    <Icon size={18} aria-hidden="true" style={{ color: active ? c('on-accent') : c('text-secondary') }} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display font-bold text-ink text-sm">{r.name}</span>
                    <span className="block text-text-secondary text-[13px] mt-0.5">{r.desc}</span>
                  </span>
                  {active && <CheckCircle2 size={20} aria-hidden="true" className="flex-shrink-0" style={{ color: ACCENT }} />}
                </button>
              )
            })}
          </div>
          <Err k="role" />
        </div>
      )}

      {showRole && <div className="border-t border-line mb-7" aria-hidden="true" />}

      <div className="flex items-center justify-between mb-3">
        <label className="text-text-secondary text-[13px] font-display font-semibold uppercase tracking-wider">Your details</label>
        <span className="text-text-secondary text-[13px]">Optional: add now or later</span>
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

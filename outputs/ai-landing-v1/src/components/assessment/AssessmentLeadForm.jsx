import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Dropdown from './Dropdown'
import { sectors, orgSizes, departments, personalDomainBlocklist } from '../../data/aiAssessment.js'

const fieldStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
const inputCls = 'w-full rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-white/50 outline-none transition-all duration-200 focus:border-white/30'

function isPersonalEmail(email) {
  const root = (email.split('@')[1]?.toLowerCase() || '').split('.')[0]
  return personalDomainBlocklist.includes(root)
}

/**
 * Dedicated "get your report by email" form (separate from the contact form).
 * Collects profile-style fields + a contact-consent checkbox, then calls
 * onSend(lead) which returns a promise (parent builds the PDF + emails it).
 *
 * Props: accent, title, body, bullets, defaults, onSend, submitLabel
 */
export default function AssessmentLeadForm({ accent = '#91C46B', title, body, bullets = [], defaults = {}, onSend, submitLabel = 'Email me the full report', bare = false }) {
  const [form, setForm] = useState({
    name: defaults.name || '', email: defaults.email || '', company: defaults.company || '',
    sector: defaults.sector || '', orgSize: defaults.orgSize || '', department: defaults.department || '',
    consent: false, website: '',
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    const email = form.email.trim()
    if (!email) e.email = 'Work email is required to send your report.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.'
    else if (isPersonalEmail(email)) e.email = 'Please use your work email, not a personal address.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev) => {
    ev.preventDefault()
    setError('')
    if (form.website) return // honeypot
    if (!validate()) return
    setSending(true)
    try {
      await onSend({
        name: form.name.trim(), email: form.email.trim(), company: form.company.trim(),
        sector: form.sector, orgSize: form.orgSize, department: form.department, consent: form.consent,
      })
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const Err = ({ k }) => errors[k] ? <p className="text-red-400 text-xs font-medium mt-1.5">{errors[k]}</p> : null

  return (
    <div className={bare ? '' : 'rounded-3xl p-8 lg:p-10'}
      style={bare ? undefined : { background: 'rgba(255,255,255,0.025)', border: `1px solid ${accent}26` }}>
      <span className="kicker mb-4">Get the full report</span>
      <h3 className="font-display font-black text-white text-xl lg:text-2xl tracking-tight mb-2">{title}</h3>
      {body && <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-6">{body}</p>}

      {bullets.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
          {bullets.map(b => (
            <div key={b} className="flex items-start gap-2.5">
              <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
              <span className="text-text-secondary text-sm leading-relaxed">{b}</span>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={submit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input className={inputCls} style={fieldStyle} placeholder="Full name"
              value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <input type="email" className={inputCls} style={fieldStyle} placeholder="Work email *"
              value={form.email} onChange={e => set('email', e.target.value)} />
            <Err k="email" />
          </div>
          <div>
            <input className={inputCls} style={fieldStyle} placeholder="Company name"
              value={form.company} onChange={e => set('company', e.target.value)} />
          </div>
          <div><Dropdown value={form.sector} onChange={v => set('sector', v)} placeholder="Sector" options={sectors} /></div>
          <div><Dropdown value={form.orgSize} onChange={v => set('orgSize', v)} placeholder="Organization size" options={orgSizes} /></div>
          <div><Dropdown value={form.department} onChange={v => set('department', v)} placeholder="Department" options={departments} /></div>
        </div>

        {/* Consent */}
        <button type="button" onClick={() => set('consent', !form.consent)}
          className="flex items-start gap-3 mt-5 text-left w-full">
          <span className="w-5 h-5 rounded-md flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors"
            style={{ background: form.consent ? accent : 'rgba(255,255,255,0.05)', border: `1px solid ${form.consent ? accent : 'rgba(255,255,255,0.15)'}` }}>
            {form.consent && <Check size={13} className="text-[#021018]" />}
          </span>
          <span className="text-text-secondary text-xs leading-relaxed">
            I'd like Radiant Digital to follow up with relevant insights and offers based on my results.
          </span>
        </button>

        {/* Honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          value={form.website} onChange={e => set('website', e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

        {error && <p className="text-red-400 text-xs font-medium mt-4">{error}</p>}

        <button type="submit" disabled={sending}
          className="btn-primary !px-8 !py-3.5 mt-6 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed">
          {sending ? 'Sending…' : <>{submitLabel} <ArrowRight size={15} /></>}
        </button>
        <p className="text-text-muted text-[10px] mt-3">We'll email your report as a PDF. By submitting you agree to be contacted by Radiant Digital.</p>
      </form>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Lock, CheckCircle2, Mail, FileText } from 'lucide-react'

/**
 * LockedReport — the gated full report.
 *
 * Locked state: shows a generic preview of the PDF report (sharp at the top,
 * blurred + faded toward the bottom), with the lead-capture form embedded
 * directly over the faded area — no modal. After submission `unlocked` flips
 * true and a short "we've emailed it" confirmation replaces everything.
 *
 * Props: kind, result, accent, unlocked, form, emailDelivered, sentTo
 */
export default function LockedReport({ kind, result, accent = '#91C46B', unlocked, form, emailDelivered, sentTo }) {
  const isAi = kind === 'ai'

  if (unlocked) {
    // Report is intentionally NOT shown here — it's delivered by email only.
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="mag-card p-8 lg:p-10 text-center"
      >
        <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: `${accent}1f`, border: `1px solid ${accent}40` }}>
          {emailDelivered ? <CheckCircle2 size={26} style={{ color: accent }} /> : <Mail size={26} style={{ color: accent }} />}
        </div>
        <h3 className="font-display font-black text-white text-xl lg:text-2xl tracking-tight mb-2">
          {emailDelivered ? 'Your report is on its way' : 'Thanks — we have your details'}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto">
          {emailDelivered
            ? <>We've emailed your full report{sentTo ? <> to <span className="text-white font-semibold">{sentTo}</span></> : ''}. Check your inbox in the next few minutes — and your spam folder, just in case.</>
            : <>We've recorded your details{sentTo ? <> for <span className="text-white font-semibold">{sentTo}</span></> : ''} and our team will make sure your full report reaches you shortly.</>}
        </p>
        <p className="text-text-muted text-xs leading-relaxed max-w-md mx-auto mt-3">
          Have a question about your results? Just reply to that email — it comes straight to our team.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Full-bleed PDF preview as the background — breaks out to the viewport width */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <PdfPreview kind={kind} result={result} accent={accent} />
        {/* subtle blur on the whole sheet */}
        <div className="absolute inset-0" style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }} />
        {/* translucent overlay — clearer at top & bottom, ~75-80% behind the form so the report stays visible */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(1,15,30,0.04) 0%, rgba(1,15,30,0.28) 16%, rgba(1,15,30,0.78) 28%, rgba(1,15,30,0.92) 40%, rgba(1,15,30,0.92) 100%)' }} />
      </div>

      {/* "preview" chip, top-right over the clear band */}
      <div className="relative z-10 flex justify-end pt-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider"
          style={{ background: 'rgba(1,15,30,0.7)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)' }}>
          <FileText size={11} /> Report preview
        </span>
      </div>

      {/* Clear band that lets the top of the PDF page show through */}
      <div className="h-56 sm:h-72" aria-hidden="true" />

      {/* Lead form written directly over the overlay — no box */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}1f`, border: `1px solid ${accent}40` }}>
            <Lock size={16} style={{ color: accent }} />
          </div>
          <span className="text-xs font-display font-semibold uppercase tracking-wider" style={{ color: accent }}>
            {isAi ? 'AI Maturity Report' : 'CX Maturity Report'} · 6 pages
          </span>
        </div>
        {form}
      </div>

      {/* small tail so the overlay carries to the bottom edge */}
      <div className="h-10 sm:h-12" aria-hidden="true" />
    </motion.div>
  )
}

/**
 * PdfPreview — a generic, on-brand mock of the first page of the emailed PDF.
 * Intentionally light ("paper") so it reads unmistakably as a document.
 */
function PdfPreview({ kind, result, accent }) {
  const isAi = kind === 'ai'

  // The three extra sections that the PDF unlocks (generic copy for the teaser).
  const sections = isAi
    ? [
        { tag: 'What we see', heading: 'Findings — your strengths & gaps by dimension',
          lines: [0.96, 0.9, 0.82, 0.7], chips: ['Strategy & Leadership', 'Data & Technology', 'Adoption & Value'] },
        { tag: 'Recommended next step', heading: 'Your single highest-leverage move',
          lines: [0.94, 0.86, 0.74], chips: ['Prioritized', 'With rationale'] },
        { tag: "Radiant's read", heading: 'Our perspective on organizations at your stage',
          lines: [0.97, 0.92, 0.84, 0.66], chips: [] },
      ]
    : [
        { tag: 'Recommended solution', heading: 'Experience AI matched to your maturity',
          lines: [0.95, 0.88, 0.78], chips: ['Tailored', 'Outcome-led'] },
        { tag: "Radiant's read", heading: 'Why this matters at your maturity level',
          lines: [0.96, 0.9, 0.8, 0.68], chips: [] },
        { tag: 'Case studies', heading: 'Relevant proof matched to your context',
          lines: [0.92, 0.84, 0.72], chips: ['By sector', 'By outcome'] },
      ]

  return (
    <div className="h-full flex flex-col" style={{ background: '#0a1d33', minHeight: '100%' }}>
      <div className="max-w-5xl mx-auto w-full px-8 lg:px-12 py-7 lg:py-9 flex-1 flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between pb-3 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ background: '#91C46B' }} />
            <span className="font-display font-black text-[13px] tracking-tight" style={{ color: '#ffffff' }}>
              RADIANT <span style={{ color: '#91C46B' }}>AI</span>
            </span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.40)' }}>
            {isAi ? 'AI Adoption Report' : 'CX Maturity Report'} · What's inside
          </span>
        </div>

        {/* three gated sections, spread down the page */}
        <div className="flex-1 flex flex-col justify-between gap-7">
          {sections.map((s, i) => (
            <div key={s.tag} className="flex gap-4">
              <div className="font-display font-black text-2xl flex-shrink-0 w-7" style={{ color: 'rgba(255,255,255,0.16)' }}>{i + 1}</div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: '#91C46B' }}>{s.tag}</span>
                <h3 className="font-display font-black tracking-tight mt-0.5 mb-2.5" style={{ color: '#ffffff', fontSize: '1.15rem' }}>{s.heading}</h3>
                <div className="space-y-2 mb-3">
                  {s.lines.map((w, j) => (
                    <div key={j} className="h-2 rounded-full" style={{ width: `${w * 100}%`, background: 'rgba(255,255,255,0.08)' }} />
                  ))}
                </div>
                {s.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {s.chips.map(c => (
                      <span key={c} className="text-[10px] font-semibold px-2 py-1 rounded-md"
                        style={{ background: 'rgba(145,196,107,0.10)', color: '#91C46B', border: '1px solid rgba(145,196,107,0.22)' }}>{c}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

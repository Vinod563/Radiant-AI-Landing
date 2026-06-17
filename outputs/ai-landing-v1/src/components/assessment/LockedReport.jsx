import { motion } from 'framer-motion'
import { Lock, CheckCircle2, Mail } from 'lucide-react'
import FindingsPanel from './FindingsPanel'
import NextStepCard from './NextStepCard'
import { recommendedSolution } from '../../data/cxAssessment.js'
import { aiRadiantRead, cxWhyThisMatters } from '../../data/reportEditorial.js'

/**
 * LockedReport — the part of the report that lives behind the lead gate:
 *   AI:  What We See (findings) · Recommended Next Step · Radiant's Read
 *   CX:  Recommended Solution · Radiant's Read
 *
 * When `unlocked` is false these sections are rendered blurred with an
 * "Unlock full report" overlay; clicking it calls `onUnlock` (parent opens the
 * lead-form modal). After submission `unlocked` flips true: the sections render
 * in full, topped by a short "we've emailed it" confirmation.
 *
 * Props: kind, result, accent, unlocked, onUnlock, emailDelivered, sentTo
 */
export default function LockedReport({ kind, result, accent = '#91C46B', unlocked, onUnlock, emailDelivered, sentTo }) {
  const isAi = kind === 'ai'

  const sections = isAi ? (
    <>
      <FindingsPanel findings={result.findings} />
      <NextStepCard nextStep={result.nextStep} accent={accent} />
      <RadiantReadCard
        label={`Our perspective on Stage ${result.stage.index} organizations`}
        text={aiRadiantRead[result.stage.index] || aiRadiantRead[5]}
      />
    </>
  ) : (
    <>
      <CxSolutionCard accent={accent} />
      <RadiantReadCard
        label={`Why this matters at the ${result.overallLevel} level`}
        text={cxWhyThisMatters(result.overallKey)}
      />
    </>
  )

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
    <div className="relative">
      {/* Blurred preview of the locked sections */}
      <div className="space-y-5 pointer-events-none select-none max-h-[560px] overflow-hidden"
        style={{ filter: 'blur(7px)', opacity: 0.5 }} aria-hidden="true">
        {sections}
      </div>

      {/* Overlay + unlock CTA */}
      <div className="absolute inset-0 flex items-center justify-center px-6"
        style={{ background: 'linear-gradient(180deg, rgba(2,16,30,0.30) 0%, rgba(2,16,30,0.72) 55%, rgba(2,16,30,0.94) 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: `${accent}1f`, border: `1px solid ${accent}40` }}>
            <Lock size={24} style={{ color: accent }} />
          </div>
          <h3 className="font-display font-black text-white text-xl lg:text-2xl tracking-tight mb-2">
            The full report is right here
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {isAi
              ? "Your strengths and gaps dimension by dimension, Radiant's read on your stage, and your prioritized next step — unlock it and we'll email you the PDF."
              : "Your recommended solution and Radiant's read at your maturity level — unlock it and we'll email you the PDF."}
          </p>
          <button type="button" onClick={onUnlock}
            className="btn-primary !px-8 !py-3.5 inline-flex items-center gap-2"
            style={{ background: accent, borderColor: accent }}>
            <Lock size={15} /> Unlock full report
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function RadiantReadCard({ label, text }) {
  return (
    <div className="mag-card p-8 lg:p-10">
      <span className="kicker mb-4">Radiant's Read</span>
      <h4 className="font-display font-bold text-white text-base lg:text-lg mb-3">{label}</h4>
      <p className="text-text-secondary text-base leading-[1.85] max-w-2xl">{text}</p>
    </div>
  )
}

function CxSolutionCard({ accent }) {
  return (
    <div className="mag-card p-8 lg:p-10">
      <span className="kicker mb-4">Recommended Solution</span>
      <h3 className="font-display font-black text-white text-xl lg:text-2xl tracking-tight mb-3">{recommendedSolution.name}</h3>
      <p className="text-text-secondary text-base leading-[1.8] max-w-2xl mb-5">{recommendedSolution.lede}</p>
      <ul className="space-y-2.5">
        {recommendedSolution.helps.map(h => (
          <li key={h} className="flex items-start gap-2.5 text-text-secondary text-sm leading-relaxed">
            <span className="mt-1 flex-shrink-0" style={{ color: accent }}>•</span> {h}
          </li>
        ))}
      </ul>
    </div>
  )
}

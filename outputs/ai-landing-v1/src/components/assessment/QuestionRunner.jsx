import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Info } from 'lucide-react'

/**
 * Generic one-question-at-a-time runner used by both assessments.
 *
 * Props:
 *   questions   - flat array, each { id, sectionLabel, accent, trackLabel?, title?, context?, question, options:[{score,label}] }
 *   answers     - { [id]: score }
 *   onAnswer    - (id, score) => void
 *   onComplete  - () => void   (called after the last question is answered + Next)
 *   onBackToStart - () => void (called when Back is pressed on the first question)
 *   scaleHint   - optional text shown under options (e.g. "1 = least mature · 5 = most mature")
 */
export default function QuestionRunner({ questions, answers, onAnswer, onComplete, onBackToStart, scaleHint }) {
  const [index, setIndex] = useState(0)
  const [error, setError] = useState(false)

  const q = questions[index]
  const total = questions.length
  const accent = q.accent || '#91C46B'

  const selected = answers[q.id]
  const pct = Math.round(((index + (selected ? 1 : 0)) / total) * 100)

  const next = () => {
    if (!selected) { setError(true); return }
    setError(false)
    if (index + 1 < total) setIndex(index + 1)
    else onComplete()
  }
  const back = () => {
    setError(false)
    if (index === 0) onBackToStart?.()
    else setIndex(index - 1)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 text-xs font-display font-semibold">
          <span className="uppercase tracking-widest" style={{ color: accent }}>{q.sectionLabel}</span>
          <span className="text-text-muted">{pct}% complete</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: accent }}
            initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="mt-2 text-[11px] text-text-muted font-medium">
          {q.trackLabel && <span>{q.trackLabel} · </span>}
          Question {index + 1} of {total}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={q.id}
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          {q.title && (
            <div className="text-[11px] font-display font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
              {q.title}
            </div>
          )}
          <h2 className="font-display font-black text-white text-xl lg:text-2xl leading-snug tracking-tight mb-4">
            {q.question}
          </h2>

          {q.context && (
            <div className="flex items-start gap-2.5 mb-7 rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
              <p className="text-text-secondary text-sm leading-relaxed"><span className="font-semibold text-white/80">Why this matters: </span>{q.context}</p>
            </div>
          )}

          {/* Options */}
          <div role="radiogroup" aria-label={q.question}
            className={`space-y-3 rounded-2xl ${error ? 'ring-1 ring-red-400/60 p-1' : ''}`}>
            {q.options.map(opt => {
              const active = selected === opt.score
              return (
                <button key={opt.score} role="radio" aria-checked={active}
                  onClick={() => { onAnswer(q.id, opt.score); setError(false) }}
                  className="w-full text-left flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 min-h-[48px]"
                  style={{
                    background: active ? `${accent}14` : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${active ? `${accent}66` : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold leading-none"
                    style={{ background: active ? accent : 'rgba(255,255,255,0.06)', color: active ? '#021018' : '#94A3B8' }}>
                    {opt.score}
                  </span>
                  <span className={`text-sm leading-relaxed ${active ? 'text-white' : 'text-text-secondary'}`}>{opt.label}</span>
                </button>
              )
            })}
          </div>

          {scaleHint && <p className="text-text-muted text-[11px] mt-3 text-center">{scaleHint}</p>}
          {error && <p className="text-red-400 text-xs font-medium mt-3">Please select an answer to continue.</p>}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between mt-9">
        <button onClick={back}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-sm font-display font-semibold px-4 py-2.5 rounded-lg hover:bg-white/[0.04]">
          <ArrowLeft size={15} /> Back
        </button>
        <button onClick={next} className="btn-primary !px-8 !py-3">
          {index + 1 < total ? 'Next' : 'See results'} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

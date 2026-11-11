import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Info } from 'lucide-react'
import { c, tone } from '../../theme/tokens'

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
 *   initialIndex  - question to start on (resume after "Save and exit")
 *   onIndexChange - (index) => void, so the page can save the current question
 */
export default function QuestionRunner({ questions, answers, onAnswer, onComplete, onBackToStart, scaleHint, initialIndex = 0, onIndexChange }) {
  const [index, setIndex] = useState(() => Math.min(Math.max(initialIndex, 0), questions.length - 1))
  const [error, setError] = useState(false)

  // Scroll to top whenever the question changes so the new question is in view
  // (on short viewports the next question would otherwise load below the fold).
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [index])
  useEffect(() => { onIndexChange?.(index) }, [index]) // eslint-disable-line react-hooks/exhaustive-deps

  const q = questions[index]
  const total = questions.length
  const accent = tone(q.accent || '#91C46B')

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
        <div className="flex items-center justify-between mb-2 text-[13px] font-display font-semibold">
          <span className="uppercase tracking-wider" style={{ color: accent }}>{q.sectionLabel}</span>
          <span className="text-text-secondary">{pct}% complete</span>
        </div>
        <div className="h-1.5 rounded-full bg-track overflow-hidden"
          role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={pct} aria-valuetext={`${pct}% complete, question ${index + 1} of ${total}`}>
          <motion.div className="h-full rounded-full" style={{ background: accent }}
            initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="mt-2 text-[13px] text-text-secondary font-medium">
          {q.trackLabel && <span>{q.trackLabel} · </span>}
          Question {index + 1} of {total}
        </div>
      </div>

      {/* Screen readers: announce the new question after Next / Back */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`Question ${index + 1} of ${total}. ${q.question}`}
      </p>

      <AnimatePresence mode="wait">
        <motion.div key={q.id}
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          {q.title && (
            <div className="text-[13px] font-display font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>
              {q.title}
            </div>
          )}
          <h1 className="font-display font-bold text-ink text-xl lg:text-2xl leading-[1.4] lg:leading-[1.4] tracking-normal mb-6">
            {q.question}
          </h1>


          {scaleHint && <p className="text-text-secondary text-[13px] mb-4 font-medium">{scaleHint}</p>}

          {/* Options */}
          <div role="radiogroup" aria-label={q.question}
            className={`space-y-3 rounded-2xl ${error ? 'ring-1 ring-danger/60 p-1' : ''}`}>
            {q.options.map(opt => {
              const active = selected === opt.score
              return (
                <button key={opt.score} role="radio" aria-checked={active}
                  onClick={() => { onAnswer(q.id, opt.score); setError(false) }}
                  className="rd-option w-full text-left flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 min-h-[48px]"
                  style={{ '--opt-accent': accent }}
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-display font-bold leading-none"
                    style={{ background: active ? accent : c('surface-2'), color: active ? c('on-accent') : c('text-secondary') }}>
                    {opt.score}
                  </span>
                  <span className={`text-base leading-relaxed ${active ? 'text-ink font-medium' : 'text-text-primary'}`}>{opt.label}</span>
                </button>
              )
            })}
          </div>

          {error && <p className="text-danger text-[13px] font-medium mt-3">Please select an answer to continue.</p>}

          {/* Context sits below the options so the question and answers read together */}
          {q.context && (
            <div className="flex items-start gap-2.5 mt-6 rounded-xl px-4 py-3 bg-surface border border-line">
              <Info size={14} aria-hidden="true" className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
              <p className="text-text-secondary text-sm leading-relaxed"><span className="font-semibold text-ink">Why this matters: </span>{q.context}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between mt-9">
        <button onClick={back}
          className="flex items-center gap-2 text-text-muted hover:text-ink transition-colors text-sm font-display font-semibold px-4 py-2.5 rounded-lg hover:bg-ink/[0.04]">
          <ArrowLeft size={15} /> Back
        </button>
        <button onClick={next} disabled={!selected}
          className="btn-primary !px-8 !py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none">
          {index + 1 < total ? 'Next' : 'See results'} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

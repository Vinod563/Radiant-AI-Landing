import { useState } from 'react'
import { ArrowRight, Info } from 'lucide-react'

/**
 * A single assessment question rendered as a chat card.
 * Once answered it becomes inert (shows the chosen option) so chat history reads
 * as a normal Q&A exchange.
 *
 * Props:
 *   card { kind, question, qIndex, total, answeredScore }
 *   onAnswer(qIndex, score, label)
 */
export default function AssessmentQuestionCard({ card, onAnswer }) {
  const { question: q, qIndex, total, answeredScore } = card
  const answered = answeredScore != null
  const [selected, setSelected] = useState(answeredScore ?? null)
  const accent = q.accent || '#91C46B'
  const value = answered ? answeredScore : selected
  const pct = Math.round(((qIndex + (value ? 1 : 0)) / total) * 100)

  return (
    <div className="mag-card p-6 lg:p-7 relative overflow-hidden">
      <div className="relative z-10">
        {/* Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2 text-[11px] font-display font-semibold">
            <span className="uppercase tracking-widest" style={{ color: accent }}>{q.sectionLabel}</span>
            <span className="text-text-muted">Question {qIndex + 1} of {total}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ background: accent, width: `${pct}%` }} />
          </div>
        </div>

        {q.title && (
          <div className="text-[11px] font-display font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>{q.title}</div>
        )}
        <h3 className="font-display font-black text-white text-lg leading-snug tracking-tight mb-3">{q.question}</h3>

        {q.context && (
          <div className="flex items-start gap-2.5 mb-5 rounded-xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
            <p className="text-text-secondary text-sm leading-relaxed"><span className="font-semibold text-white/80">Why this matters: </span>{q.context}</p>
          </div>
        )}

        <div role="radiogroup" aria-label={q.question} className="space-y-2.5">
          {q.options.map(opt => {
            const active = value === opt.score
            return (
              <button key={opt.score} role="radio" aria-checked={active}
                disabled={answered}
                onClick={() => { if (!answered) setSelected(opt.score) }}
                className={`w-full text-left flex items-center gap-3.5 rounded-xl px-4 py-3 transition-all duration-200 min-h-[48px] ${answered && !active ? 'opacity-50' : ''} ${answered ? 'cursor-default' : ''}`}
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

        {!answered && (
          <div className="flex justify-end mt-5">
            <button
              onClick={() => { if (selected != null) onAnswer(qIndex, selected, q.options.find(o => o.score === selected).label) }}
              disabled={selected == null}
              className="btn-primary !px-7 !py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {qIndex + 1 < total ? 'Next' : 'See results'} <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * A single assessment question rendered inline in the chat (no card box).
 * Answer by clicking an option, or by typing the number / answer text in the
 * chat input (handled in Chat.jsx). Once answered it goes inert and shows the pick.
 *
 * Props:
 *   card { kind, question, qIndex, total, answeredScore }
 *   onAnswer(qIndex, score, label)
 */
export default function AssessmentQuestionCard({ card, onAnswer }) {
  const { question: q, qIndex, total, answeredScore } = card
  const answered = answeredScore != null
  const accent = q.accent || '#91C46B'
  const pct = Math.round(((qIndex + (answered ? 1 : 0)) / total) * 100)

  return (
    <div>
      {/* Progress line */}
      <div className="flex items-center justify-between mb-2 text-[13px] font-display font-semibold">
        <span className="uppercase tracking-wider" style={{ color: accent }}>{q.sectionLabel}</span>
        <span className="text-text-secondary">Question {qIndex + 1} of {total}</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden mb-4"
        role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={100}
        aria-valuenow={pct} aria-valuetext={`${pct}% complete, question ${qIndex + 1} of ${total}`}>
        <div className="h-full rounded-full transition-all duration-500" style={{ background: accent, width: `${pct}%` }} />
      </div>

      {q.title && (
        <div className="text-[13px] font-display font-bold uppercase tracking-wider mb-1.5" style={{ color: accent }}>{q.title}</div>
      )}
      <h3 className="font-display font-bold text-white text-lg lg:text-xl leading-[1.4] lg:leading-[1.4] tracking-normal mb-4">{q.question}</h3>


      <div role="radiogroup" aria-label={q.question} className="space-y-2.5">
        {q.options.map(opt => {
          const active = answeredScore === opt.score
          return (
            <button key={opt.score} role="radio" aria-checked={active}
              disabled={answered}
              onClick={() => { if (!answered) onAnswer(qIndex, opt.score, opt.label) }}
              className={`w-full text-left flex items-center gap-3.5 rounded-xl px-4 py-3 transition-all duration-200 min-h-[48px] ${answered ? 'cursor-default' : 'hover:-translate-y-px'} ${answered && !active ? 'opacity-40' : ''}`}
              style={{
                background: active ? `${accent}14` : 'rgba(255,255,255,0.025)',
                border: `1px solid ${active ? `${accent}66` : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-display font-bold leading-none"
                style={{ background: active ? accent : 'rgba(255,255,255,0.06)', color: active ? '#021018' : '#94A3B8' }}>
                {opt.score}
              </span>
              <span className={`text-base leading-relaxed ${active ? 'text-white' : 'text-white/85'}`}>{opt.label}</span>
            </button>
          )
        })}
      </div>

      {/* Context below the options so the question and answers read together */}
      {q.context && (
        <p className="text-text-secondary text-sm leading-relaxed mt-4 max-w-2xl">
          <span className="font-semibold text-white/70">Why this matters: </span>{q.context}
        </p>
      )}

      {!answered && (
        <p className="text-text-secondary text-[13px] mt-3">
          Tap an option above, or reply with the number ({q.options.map(o => o.score).join('/')}) or the answer text.
        </p>
      )}
    </div>
  )
}

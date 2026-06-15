import { CheckCircle2, AlertTriangle, Minus } from 'lucide-react'

/**
 * Findings panel — strengths (green) and gaps (amber), or a fallback note.
 * Props: findings { strengths:[{section,title,body}], gaps:[...], fallback:{title,body}|null }
 */
export default function FindingsPanel({ findings }) {
  const { strengths, gaps, fallback } = findings

  if (fallback) {
    return (
      <div className="mag-card p-8 lg:p-10">
        <span className="kicker mb-5">What We See</span>
        <div className="flex items-start gap-3 mt-2">
          <Minus size={18} className="text-brand-green mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-display font-bold text-white text-base mb-1">{fallback.title}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{fallback.body}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mag-card p-8 lg:p-10">
      <span className="kicker mb-6">What We See</span>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-7 mt-2">
        {strengths.length > 0 && (
          <div>
            <div className="text-[11px] font-display font-bold uppercase tracking-widest text-brand-green mb-4">Strengths</div>
            <div className="space-y-5">
              {strengths.map(s => (
                <Finding key={s.section} icon={CheckCircle2} color="#91C46B" {...s} />
              ))}
            </div>
          </div>
        )}
        {gaps.length > 0 && (
          <div>
            <div className="text-[11px] font-display font-bold uppercase tracking-widest text-brand-orange mb-4">Gaps to Close</div>
            <div className="space-y-5">
              {gaps.map(g => (
                <Finding key={g.section} icon={AlertTriangle} color="#F0974E" {...g} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Finding({ icon: Icon, color, section, title, body }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={17} className="mt-0.5 flex-shrink-0" style={{ color }} />
      <div>
        <div className="text-[10px] font-display font-semibold uppercase tracking-widest text-text-muted mb-1">{section}</div>
        <h4 className="font-display font-bold text-white text-sm mb-1 leading-snug">{title}</h4>
        <p className="text-text-secondary text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

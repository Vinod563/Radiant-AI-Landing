import { motion } from 'framer-motion'
import { scoreBarStyle, sections } from '../../data/aiAssessment.js'

/**
 * Per-dimension score bars for the AI assessment.
 * Props: sectionAverages { [sectionKey]: number 0..5 }
 */
export default function ScoreBars({ sectionAverages }) {
  return (
    <div className="mag-card p-8 lg:p-10">
      <span className="kicker mb-6">Scores by Dimension</span>
      <div className="space-y-6 mt-2">
        {sections.map(s => {
          const score = sectionAverages[s.key] || 0
          const { color, label } = scoreBarStyle(score)
          const pct = (score / 5) * 100
          return (
            <div key={s.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-display font-semibold text-sm">{s.label}</span>
                <span className="text-xs font-semibold" style={{ color }}>
                  {score ? score.toFixed(1) : '-'} · {label}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div className="h-full rounded-full"
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: color }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

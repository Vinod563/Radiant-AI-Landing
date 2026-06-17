import { motion } from 'framer-motion'

/**
 * MaturityStaircase — ascending 5-step staircase visualization.
 * Shows all 5 named AI Adoption stages. The respondent's current stage
 * is highlighted in brand-green. Previous stages are faint green.
 * Future stages are muted/dark.
 *
 * Props:
 *   currentIndex  number 1..5 — the respondent's stage
 *   accent        string — accent color (default brand-green)
 */

const STAGES = [
  { index: 1, key: 'assess', name: 'Assess', tagline: 'No strategy yet' },
  { index: 2, key: 'train', name: 'Train', tagline: 'Pilots & literacy gaps' },
  { index: 3, key: 'adopt', name: 'Adopt', tagline: 'AI live, not scaled' },
  { index: 4, key: 'govern', name: 'Govern', tagline: 'Broadly deployed' },
  { index: 5, key: 'scale', name: 'Scale', tagline: 'AI-first advantage' },
]

export default function MaturityStaircase({ currentIndex = 1, accent = '#91C46B' }) {
  return (
    <div className="mag-card p-8 lg:p-10">
      <div className="flex items-start justify-between mb-6">
        <span className="kicker">Where You Are in the Journey</span>
        <div className="text-right">
          <span className="font-display font-black text-sm" style={{ color: accent }}>
            Stage {currentIndex} of 5
          </span>
        </div>
      </div>

      {/* Staircase container */}
      <div className="relative">
        {/* Desktop staircase */}
        <div className="hidden sm:flex items-end gap-2 h-52">
          {STAGES.map((s) => {
            const isPast = s.index < currentIndex
            const isCurrent = s.index === currentIndex
            const isFuture = s.index > currentIndex
            // Height: each step is taller — 20% per step
            const heightPct = 30 + s.index * 14

            return (
              <motion.div
                key={s.key}
                className="flex-1 flex flex-col items-center justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: s.index * 0.08 }}
              >
                {/* Current stage label above */}
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-2 text-center"
                  >
                    <div className="text-[10px] font-display font-bold uppercase tracking-widest mb-1"
                      style={{ color: accent }}>
                      You are here
                    </div>
                    <div className="w-0 h-0 mx-auto" style={{
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: `5px solid ${accent}`,
                    }} />
                  </motion.div>
                )}

                {/* Step bar */}
                <motion.div
                  className="w-full rounded-t-lg relative overflow-hidden flex flex-col items-center justify-end pb-3"
                  style={{
                    height: `${heightPct}%`,
                    background: isCurrent
                      ? `linear-gradient(180deg, ${accent}30 0%, ${accent}18 100%)`
                      : isPast
                        ? 'rgba(145,196,107,0.08)'
                        : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isCurrent ? accent + '50' : isPast ? accent + '20' : 'rgba(255,255,255,0.07)'}`,
                    borderBottom: 'none',
                  }}
                >
                  {/* Shimmer on current */}
                  {isCurrent && (
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(180deg, ${accent}08 0%, transparent 60%)` }} />
                  )}

                  <div className="relative z-10 text-center px-1">
                    <div className="font-display font-black text-lg leading-none mb-0.5"
                      style={{ color: isCurrent ? accent : isPast ? accent + '60' : 'rgba(255,255,255,0.2)' }}>
                      {s.index}
                    </div>
                    <div className="font-display font-bold text-xs leading-tight"
                      style={{ color: isCurrent ? '#fff' : isPast ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.18)' }}>
                      {s.name}
                    </div>
                  </div>
                </motion.div>

                {/* Tagline below */}
                <div className="mt-2 text-center px-0.5">
                  <p className="text-[9px] leading-tight"
                    style={{ color: isCurrent ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)' }}>
                    {s.tagline}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: vertical list */}
        <div className="sm:hidden space-y-2">
          {STAGES.map((s) => {
            const isPast = s.index < currentIndex
            const isCurrent = s.index === currentIndex

            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: s.index * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: isCurrent ? `${accent}15` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isCurrent ? accent + '40' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm flex-shrink-0"
                  style={{
                    background: isCurrent ? accent + '25' : isPast ? accent + '12' : 'rgba(255,255,255,0.05)',
                    color: isCurrent ? accent : isPast ? accent + '80' : 'rgba(255,255,255,0.2)',
                  }}>
                  {s.index}
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-sm"
                    style={{ color: isCurrent ? '#fff' : isPast ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }}>
                    {s.name}
                    {isCurrent && <span className="ml-2 text-[9px] font-bold uppercase tracking-wider" style={{ color: accent }}>← You</span>}
                  </div>
                  <div className="text-[10px] mt-0.5"
                    style={{ color: isCurrent ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)' }}>
                    {s.tagline}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stage counter dots — decorative */}
        <div className="flex justify-center gap-1.5 mt-5">
          {STAGES.map(s => (
            <div key={s.key} className="rounded-full transition-all duration-300"
              style={{
                width: s.index === currentIndex ? '20px' : '6px',
                height: '6px',
                background: s.index <= currentIndex ? accent : 'rgba(255,255,255,0.12)',
              }} />
          ))}
        </div>
      </div>

      {/* Context note */}
      <p className="text-text-muted text-xs text-center mt-4 leading-relaxed">
        {currentIndex < 5
          ? `Most organizations take 12–18 months to move from Stage ${currentIndex} to Stage ${currentIndex + 1}.`
          : 'You\'re at the top of the maturity curve. The focus now is compounding the advantage.'}
      </p>
    </div>
  )
}

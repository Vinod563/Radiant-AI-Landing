import { motion } from 'framer-motion'

/**
 * Maturity reveal panel — name, tagline, description, and a progression visual.
 *
 * Used by both assessments:
 *   AI: pass `stages` (the 5 named stages) → renders an ascending staircase
 *       (increasing-height bars) with the current stage highlighted.
 *   CX: omit `stages` → renders the simple N-pip meter (3 levels).
 *
 * Props:
 *   stage   { name, index, tagline, description }
 *   accent
 *   total   number of pips for the pip-meter fallback (default 5)
 *   kicker  label above the heading (default "Your AI Maturity")
 *   prefix  heading prefix; defaults to `Stage {index}`. Pass "" for none.
 *   stages  optional [{ index, name, tagline }] — when present, render the staircase
 */
export default function StageReveal({ stage, accent = '#91C46B', total = 5, kicker = 'Your AI Maturity', prefix, stages }) {
  const head = prefix === undefined ? `Stage ${stage.index}` : prefix
  const useStaircase = Array.isArray(stages) && stages.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="mag-card p-8 lg:p-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${accent}10 0%, transparent 55%)` }} />
      <div className="relative z-10">
        <span className="kicker mb-4">{kicker}</span>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2 mb-5">
          <h2 className="font-display font-black text-white tracking-tight leading-[0.9]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}>
            {head ? `${head}: ` : ''}<span style={{ color: accent }}>{stage.name}</span>
          </h2>
        </div>
        {stage.tagline && <p className="text-text-secondary font-semibold mb-6">{stage.tagline}</p>}

        {useStaircase
          ? <Staircase stages={stages} currentIndex={stage.index} accent={accent} />
          : <PipMeter index={stage.index} total={total} accent={accent} />}

        {stage.description && <p className="text-text-secondary text-base lg:text-lg leading-[1.85]">{stage.description}</p>}
      </div>
    </motion.div>
  )
}

/* ── Pip meter (CX, and any non-staircase use) ───────────────────────────── */
function PipMeter({ index, total, accent }) {
  return (
    <div className="flex items-center gap-2 mb-7" role="img" aria-label={`Level ${index} of ${total}`}>
      {Array.from({ length: total }, (_, i) => i + 1).map(n => (
        <motion.div key={n}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 * n, duration: 0.4 }}
          className="h-2.5 flex-1 rounded-full origin-left"
          style={{ background: n <= index ? accent : 'rgba(255,255,255,0.08)' }} />
      ))}
    </div>
  )
}

/* ── Ascending staircase (AI) — bars grow taller left → right ─────────────── */
function Staircase({ stages, currentIndex, accent }) {
  const total = stages.length
  const note = currentIndex < total
    ? `Most organizations take 12–18 months to move from Stage ${currentIndex} to Stage ${currentIndex + 1}.`
    : "You're at the top of the maturity curve — the focus now is compounding the advantage."

  return (
    <div className="mb-7" role="img" aria-label={`Stage ${currentIndex} of ${total}`}>
      {/* Desktop / tablet: ascending bars — explicit increasing pixel heights so
          every step is visibly taller than the one before it. The "You are here"
          marker is absolutely positioned so it never compresses the current bar. */}
      <div className="hidden sm:block">
        <div className="flex items-end gap-2.5" style={{ height: 210 }}>
          {stages.map((s, i) => {
            const isPast = s.index < currentIndex
            const isCurrent = s.index === currentIndex
            const barH = 70 + i * 24 // 70, 94, 118, 142, 166, 190 — clear, even steps up (6 stages)

            return (
              <motion.div key={s.key || s.index}
                className="flex-1 relative h-full flex items-end"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                    className="absolute left-0 right-0 text-center" style={{ bottom: barH + 8 }}
                  >
                    <div className="text-[10px] font-display font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>
                      You are here
                    </div>
                    <div className="w-0 h-0 mx-auto" style={{
                      borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${accent}`,
                    }} />
                  </motion.div>
                )}

                <div
                  className="w-full rounded-t-lg relative overflow-hidden flex flex-col items-center justify-end pb-3"
                  style={{
                    height: barH,
                    background: isCurrent
                      ? `linear-gradient(180deg, ${accent}33 0%, ${accent}1a 100%)`
                      : isPast ? 'rgba(145,196,107,0.10)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isCurrent ? accent + '55' : isPast ? accent + '24' : 'rgba(255,255,255,0.07)'}`,
                    borderBottom: 'none',
                  }}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(180deg, ${accent}10 0%, transparent 60%)` }} />
                  )}
                  <div className="relative z-10 text-center px-1">
                    <div className="font-display font-black text-lg leading-none mb-0.5"
                      style={{ color: isCurrent ? accent : isPast ? accent + '70' : 'rgba(255,255,255,0.22)' }}>
                      {s.index}
                    </div>
                    <div className="font-display font-bold text-xs leading-tight"
                      style={{ color: isCurrent ? '#fff' : isPast ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }}>
                      {s.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Taglines row — separate from the bars so they don't affect bar heights */}
        <div className="flex gap-2.5 mt-2">
          {stages.map((s) => {
            const isCurrent = s.index === currentIndex
            return (
              <p key={s.key || s.index} className="flex-1 text-[9px] leading-tight text-center px-0.5"
                style={{ color: isCurrent ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)' }}>
                {s.tagline}
              </p>
            )
          })}
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="sm:hidden space-y-2">
        {stages.map((s, i) => {
          const isPast = s.index < currentIndex
          const isCurrent = s.index === currentIndex
          return (
            <motion.div key={s.key || s.index}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
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
                {s.tagline && (
                  <div className="text-[10px] mt-0.5" style={{ color: isCurrent ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)' }}>
                    {s.tagline}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <p className="text-text-muted text-xs mt-4 leading-relaxed">{note}</p>
    </div>
  )
}

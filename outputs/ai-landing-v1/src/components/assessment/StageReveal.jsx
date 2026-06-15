import { motion } from 'framer-motion'

/**
 * Maturity reveal panel — name, tagline, description, and an N-pip meter.
 * Used by both the AI assessment (5 stages, "Stage N:" prefix) and the CX
 * assessment (3 levels, no prefix).
 *
 * Props:
 *   stage  { name, index, tagline, description }
 *   accent
 *   total  number of pips (default 5)
 *   kicker label above the heading (default "Your AI Maturity")
 *   prefix heading prefix; defaults to `Stage {index}`. Pass "" for none.
 */
export default function StageReveal({ stage, accent = '#91C46B', total = 5, kicker = 'Your AI Maturity', prefix }) {
  const head = prefix === undefined ? `Stage ${stage.index}` : prefix
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

        {/* N-pip meter */}
        <div className="flex items-center gap-2 mb-7" role="img" aria-label={`Level ${stage.index} of ${total}`}>
          {Array.from({ length: total }, (_, i) => i + 1).map(n => (
            <motion.div key={n}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 * n, duration: 0.4 }}
              className="h-2.5 flex-1 rounded-full origin-left"
              style={{ background: n <= stage.index ? accent : 'rgba(255,255,255,0.08)' }} />
          ))}
        </div>

        {stage.description && <p className="text-text-secondary text-base lg:text-lg leading-[1.85] max-w-2xl">{stage.description}</p>}
      </div>
    </motion.div>
  )
}

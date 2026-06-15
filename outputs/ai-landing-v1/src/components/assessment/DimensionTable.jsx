import { motion } from 'framer-motion'

/**
 * CX results dimension table. The per-dimension write-ups are part of the full
 * report (PDF) — pass `compact` to show only the table.
 * Props: dimensions [{ key, label, level, color, blurb, avg }], compact
 */
export default function DimensionTable({ dimensions, compact = false }) {
  return (
    <div className="space-y-5">
      <div className="mag-card p-8 lg:p-10">
        <span className="kicker mb-6">Dimension Scores</span>
        <div className="overflow-hidden rounded-xl border border-white/[0.06] mt-2">
          {dimensions.map((d, i) => (
            <div key={d.key}
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: i % 2 ? 'rgba(255,255,255,0.015)' : 'transparent',
                borderTop: i ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
              <span className="text-white font-display font-semibold text-sm">{d.label}</span>
              <span className="text-xs font-display font-bold px-3 py-1 rounded-full"
                style={{ color: d.color, background: `${d.color}18`, border: `1px solid ${d.color}33` }}>
                {d.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {!compact && dimensions.map((d, i) => (
        <motion.div key={d.key}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, duration: 0.5 }}
          className="rounded-2xl p-6 lg:p-7"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-6 rounded-full" style={{ background: d.color }} />
            <h4 className="font-display font-bold text-white text-base">{d.label}</h4>
            <span className="text-xs font-semibold ml-auto" style={{ color: d.color }}>{d.level}</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed pl-4">{d.blurb}</p>
        </motion.div>
      ))}
    </div>
  )
}

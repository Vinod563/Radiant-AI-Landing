import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * GartnerPositioningView: 2D positioning chart, aligned to the 6-stage model.
 *
 * Axes:
 *   X  "Execution Readiness"  = avg(Data score, Adoption score) / 5
 *   Y  "Strategic Maturity"   = avg(Strategy score, People score) / 5
 *
 * The dot's diagonal position (x+y)/2 equals overall/5, the same overall average
 * that determines the 6-stage band, so the dot always lands in the stage cluster
 * that matches the respondent's computed stage.
 *
 * Stage clusters (on the maturity diagonal):
 *   Stage 1-2  Early Movers / Most Organizations  (low-left)
 *   Stage 3-4  Progressing                        (center)
 *   Stage 5-6  AI Leaders                          (top-right)  ← goal
 *
 * Quadrant labels are tilt archetypes (strategy-heavy vs execution-heavy corners),
 * read alongside the stage progression, not a competing taxonomy.
 *
 * Props:
 *   sectionAverages  { Strategy, Data, People, Adoption }  all 0..5
 *   stageIndex       1..6 (the respondent's computed stage; falls back to position)
 *   companyName      string (optional)
 *   accent           string hex
 */
export default function GartnerPositioningView({ sectionAverages = {}, stageIndex, companyName = 'Your Organization', accent = '#91C46B' }) {
  const { x, y } = useMemo(() => {
    const execX = ((sectionAverages.Data || 0) + (sectionAverages.Adoption || 0)) / 2 / 5
    const stratY = ((sectionAverages.Strategy || 0) + (sectionAverages.People || 0)) / 2 / 5
    return { x: execX, y: stratY }
  }, [sectionAverages])

  // Stage band (1-2 / 3-4 / 5-6). Use the computed stage when provided; otherwise
  // fall back to the dot's diagonal position so the two never disagree.
  const sIdx = stageIndex ?? (((x + y) / 2 < 0.466) ? 2 : ((x + y) / 2 < 0.734) ? 4 : 6)
  const group = sIdx <= 2 ? 'early' : sIdx <= 4 ? 'progress' : 'leaders'

  // Interpretation: one stage-band sentence + one tilt sentence (strategy vs
  // execution balance). Single string, so the branches can never double up.
  const bandText = group === 'early'
    ? "You're in the Early Movers group (Stage 1-2), where most organizations begin. The priority is a written AI strategy and clean data foundations before scaling execution."
    : group === 'progress'
      ? "You're in the Progressing group (Stage 3-4), ahead of the market average. The move toward AI Leadership now depends on governance maturity and scaling what works into production."
      : "You're in or near the AI Leaders group (Stage 5-6). The focus shifts to compounding the advantage: governance systems, portfolio ROI, and organizational learning loops."
  const tilt = y - x > 0.15
    ? ' Your strategy is ahead of your execution: turn planning into deployed, production use cases.'
    : x - y > 0.15
      ? ' Your execution is ahead of your strategy: add governance and a scalable framework so you build the right things.'
      : ' Strategy and execution are well balanced.'
  const meansText = bandText + tilt

  // Wide 160 x 72 viewBox so the chart fills the full row instead of a centered square.
  // Plot region: data domain 0..1 maps into these bounds; Y is flipped for SVG.
  const PX0 = 18, PX1 = 152, PY0 = 56, PY1 = 9
  const RX = PX1 - PX0
  const RY = PY0 - PY1
  const toSvgX = (v) => PX0 + v * RX
  const toSvgY = (v) => PY0 - v * RY

  const dotX = toSvgX(x)
  const dotY = toSvgY(y)

  // Stage-band clusters along the maturity diagonal (cx, cy in 0..1 domain).
  // Centers sit at the midpoint of each stage band's overall-score range, so the
  // dot (whose diagonal position = overall/5) lands inside its own stage cloud.
  // The respondent's own band is emphasized.
  const clusters = [
    { id: 'early', label: 'Early Movers', sublabel: 'Stage 1-2', cx: 0.30, cy: 0.30, rd: 0.16, color: '#64748B' },
    { id: 'progress', label: 'Progressing', sublabel: 'Stage 3-4', cx: 0.58, cy: 0.58, rd: 0.15, color: '#2DD4BF' },
    { id: 'leaders', label: 'AI Leaders', sublabel: 'Stage 5-6', cx: 0.84, cy: 0.84, rd: 0.14, color: accent },
  ].map(c => ({ ...c, active: c.id === group, opacity: c.id === group ? 0.4 : 0.18 }))

  return (
    <div className="mag-card p-8 lg:p-10">
      <div className="flex items-start justify-between mb-2">
        <span className="kicker">Competitive Positioning</span>
        <span className="text-[10px] text-text-muted font-medium">Based on your scores</span>
      </div>
      <p className="text-text-muted text-xs mb-6 leading-relaxed">
        Where your organization sits relative to AI leaders and the broader market.
      </p>

      <div className="flex gap-6 items-start">
        {/* SVG Chart */}
        <div className="flex-1 min-w-0">
          <svg viewBox="0 0 160 72" className="w-full" style={{ aspectRatio: '160 / 72' }}>
            {/* Background grid */}
            {[25, 50, 75].map(v => (
              <g key={v}>
                <line x1={PX0} y1={toSvgY(v / 100)} x2={PX1} y2={toSvgY(v / 100)}
                  stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
                <line x1={toSvgX(v / 100)} y1={PY1} x2={toSvgX(v / 100)} y2={PY0}
                  stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
              </g>
            ))}

            {/* Axes */}
            <line x1={PX0} y1={PY0} x2={PX1} y2={PY0} stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
            <line x1={PX0} y1={PY1} x2={PX0} y2={PY0} stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
            {/* Arrowheads */}
            <polygon points={`${PX1},${PY0 - 1.3} ${PX1 + 2},${PY0} ${PX1},${PY0 + 1.3}`} fill="rgba(255,255,255,0.18)" />
            <polygon points={`${PX0 - 1.3},${PY1} ${PX0},${PY1 - 2} ${PX0 + 1.3},${PY1}`} fill="rgba(255,255,255,0.18)" />

            {/* Axis labels */}
            <text x={toSvgX(0.5)} y={PY0 + 9} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="3.2" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.2">
              Execution Readiness →
            </text>
            <text x={PX0 - 9} y={toSvgY(0.5)} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="3.2" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.2"
              transform={`rotate(-90, ${PX0 - 9}, ${toSvgY(0.5)})`}>
              Strategic Maturity →
            </text>

            {/* Stage-band blobs along the maturity diagonal, each labeled with its
                stage. The respondent's own band is outlined and brightened. */}
            {clusters.map(c => (
              <g key={c.id}>
                <motion.ellipse
                  cx={toSvgX(c.cx)} cy={toSvgY(c.cy)} rx={c.rd * RX} ry={c.rd * RY}
                  fill={c.color} fillOpacity={c.opacity}
                  stroke={c.active ? c.color : 'none'} strokeOpacity={c.active ? 0.6 : 0} strokeWidth={c.active ? 0.5 : 0}
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 + clusters.findIndex(cl => cl.id === c.id) * 0.1 }}
                  style={{ transformOrigin: `${toSvgX(c.cx)}px ${toSvgY(c.cy)}px` }}
                />
                <motion.text
                  x={toSvgX(c.cx)} y={toSvgY(c.cy) - c.rd * RY - 1.6} textAnchor="middle"
                  fill={c.active ? '#fff' : 'rgba(255,255,255,0.4)'} fontSize="3" fontFamily="Inter,sans-serif"
                  fontWeight={c.active ? '800' : '700'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + clusters.findIndex(cl => cl.id === c.id) * 0.1 }}
                >
                  {c.label}
                </motion.text>
              </g>
            ))}

            {/* Path from user to the AI Leaders band (dotted), unless already there */}
            {group !== 'leaders' && (
              <motion.line
                x1={dotX} y1={dotY}
                x2={toSvgX(0.84)} y2={toSvgY(0.84)}
                stroke={accent} strokeOpacity="0.25" strokeWidth="0.5"
                strokeDasharray="1.6,1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            )}

            {/* Respondent dot */}
            <motion.circle
              cx={dotX} cy={dotY} r="2.6"
              fill={accent}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.6 }}
              style={{ filter: `drop-shadow(0 0 3px ${accent}80)`, transformOrigin: `${dotX}px ${dotY}px` }}
            />
            <motion.circle
              cx={dotX} cy={dotY} r="4.6"
              fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.4"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{ transformOrigin: `${dotX}px ${dotY}px` }}
            />

            {/* Dot label: below the dot (above if too near the bottom axis), clamped
                inside the plot. Stage labels sit above the bubbles, so placing this
                below keeps the two from colliding. */}
            <motion.text
              x={Math.min(Math.max(dotX, PX0 + 16), PX1 - 16)}
              y={dotY > PY0 - 8 ? dotY - 5 : dotY + 7}
              textAnchor="middle"
              fill="white" fontSize="3.2" fontFamily="Inter,sans-serif" fontWeight="700"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              {companyName.length > 18 ? companyName.slice(0, 16) + '…' : companyName}
            </motion.text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 w-44 space-y-3.5 pt-2 hidden sm:block">
          <div className="text-[11px] font-display font-bold uppercase tracking-wider text-text-muted mb-3">
            Maturity Stages
          </div>
          {clusters.map(c => (
            <div key={c.id} className="flex items-start gap-2.5" style={{ opacity: c.active ? 1 : 0.5 }}>
              <div className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                style={{ background: c.color, opacity: 0.85, boxShadow: c.active ? `0 0 5px ${c.color}90` : 'none' }} />
              <div>
                <div className="text-white text-xs font-semibold leading-tight">
                  {c.label}{c.active && <span className="ml-1.5 text-[10px] font-bold" style={{ color: accent }}>· you</span>}
                </div>
                <div className="text-text-muted text-[11px] leading-snug">{c.sublabel}</div>
              </div>
            </div>
          ))}

          <div className="pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: accent, boxShadow: `0 0 5px ${accent}90` }} />
              <div className="text-xs font-semibold text-white">Your Org</div>
            </div>
          </div>

          {/* Axis scores (normalized 0-100, not population percentiles) */}
          <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
            <div className="text-[11px] text-text-muted">
              <span className="block font-semibold text-text-secondary mb-0.5">Execution Readiness</span>
              <span className="text-white font-display font-bold text-sm">{Math.round(x * 100)}</span> / 100
            </div>
            <div className="text-[11px] text-text-muted">
              <span className="block font-semibold text-text-secondary mb-0.5">Strategic Maturity</span>
              <span className="text-white font-display font-bold text-sm">{Math.round(y * 100)}</span> / 100
            </div>
          </div>
        </div>
      </div>

      {/* Interpretation note */}
      <div className="mt-4 p-3 rounded-xl text-xs text-text-muted leading-relaxed"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="font-semibold text-text-secondary">What this means: </span>
        {meansText}
      </div>
    </div>
  )
}

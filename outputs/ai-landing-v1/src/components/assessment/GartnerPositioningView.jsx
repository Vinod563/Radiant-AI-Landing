import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * GartnerPositioningView — 2D scatter positioning chart.
 *
 * Axes:
 *   X  "Execution Readiness"  = avg(Data score, Adoption score) / 5
 *   Y  "Strategic Maturity"   = avg(Strategy score, People score) / 5
 *
 * Quadrant labels:
 *   TL  Planners     (high strategy, low execution)
 *   TR  AI Leaders   (high strategy, high execution)  ← goal
 *   BL  Early Movers (low strategy, low execution)    ← most orgs
 *   BR  Builders     (low strategy, high execution)
 *
 * Cluster clouds show illustrative distribution of where other orgs typically land.
 * Respondent dot is placed at their actual computed position.
 *
 * Props:
 *   sectionAverages  { Strategy, Data, People, Adoption }  all 0..5
 *   companyName      string (optional)
 *   accent           string hex
 */
export default function GartnerPositioningView({ sectionAverages = {}, companyName = 'Your Organization', accent = '#91C46B' }) {
  const { x, y } = useMemo(() => {
    const execX = ((sectionAverages.Data || 0) + (sectionAverages.Adoption || 0)) / 2 / 5
    const stratY = ((sectionAverages.Strategy || 0) + (sectionAverages.People || 0)) / 2 / 5
    return { x: execX, y: stratY }
  }, [sectionAverages])

  // Wide 160 x 72 viewBox so the chart fills the full row instead of a centered square.
  // Plot region: data domain 0..1 maps into these bounds; Y is flipped for SVG.
  const PX0 = 18, PX1 = 152, PY0 = 56, PY1 = 9
  const RX = PX1 - PX0
  const RY = PY0 - PY1
  const toSvgX = (v) => PX0 + v * RX
  const toSvgY = (v) => PY0 - v * RY

  const dotX = toSvgX(x)
  const dotY = toSvgY(y)

  // Illustrative clusters (cx, cy in 0..1 domain; rd = radius in domain units)
  const clusters = [
    { id: 'early', label: 'Most Organizations', sublabel: 'Stage 1–2', cx: 0.18, cy: 0.20, rd: 0.17, color: '#64748B', opacity: 0.35 },
    { id: 'progress', label: 'Progressing', sublabel: 'Stage 3', cx: 0.52, cy: 0.50, rd: 0.13, color: '#2DD4BF', opacity: 0.25 },
    { id: 'leaders', label: 'AI Leaders', sublabel: 'Stage 4–5', cx: 0.82, cy: 0.82, rd: 0.13, color: accent, opacity: 0.22 },
    { id: 'planners', label: 'Planners', sublabel: 'Strategy without execution', cx: 0.15, cy: 0.80, rd: 0.10, color: '#F0974E', opacity: 0.2 },
  ]

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

            {/* Quadrant divider */}
            <line x1={toSvgX(0.5)} y1={PY1} x2={toSvgX(0.5)} y2={PY0} stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" strokeDasharray="1.6,1.6" />
            <line x1={PX0} y1={toSvgY(0.5)} x2={PX1} y2={toSvgY(0.5)} stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" strokeDasharray="1.6,1.6" />

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

            {/* Quadrant labels */}
            <text x={toSvgX(0.25)} y={PY1 + 4} textAnchor="middle" fill="rgba(240,151,78,0.55)" fontSize="3" fontFamily="Inter,sans-serif" fontWeight="700">Planners</text>
            <text x={toSvgX(0.75)} y={PY1 + 4} textAnchor="middle" fill={accent + 'AA'} fontSize="3" fontFamily="Inter,sans-serif" fontWeight="800">AI Leaders</text>
            <text x={toSvgX(0.25)} y={PY0 - 2.5} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="3" fontFamily="Inter,sans-serif" fontWeight="700">Early Movers</text>
            <text x={toSvgX(0.75)} y={PY0 - 2.5} textAnchor="middle" fill="rgba(45,212,191,0.5)" fontSize="3" fontFamily="Inter,sans-serif" fontWeight="700">Builders</text>

            {/* AI Leaders goal zone highlight */}
            <rect x={toSvgX(0.6)} y={toSvgY(1.0)} width={toSvgX(1.0) - toSvgX(0.6)} height={toSvgY(0.6) - toSvgY(1.0)}
              fill={accent} fillOpacity="0.04" rx="1"
              stroke={accent} strokeOpacity="0.12" strokeWidth="0.4" />

            {/* Cluster blobs */}
            {clusters.map(c => (
              <motion.ellipse
                key={c.id}
                cx={toSvgX(c.cx)} cy={toSvgY(c.cy)} rx={c.rd * RX} ry={c.rd * RY}
                fill={c.color} fillOpacity={c.opacity}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 + clusters.findIndex(cl => cl.id === c.id) * 0.1 }}
                style={{ transformOrigin: `${toSvgX(c.cx)}px ${toSvgY(c.cy)}px` }}
              />
            ))}

            {/* Path from user to leaders zone (dotted) */}
            {(x < 0.75 || y < 0.75) && (
              <motion.line
                x1={dotX} y1={dotY}
                x2={toSvgX(0.82)} y2={toSvgY(0.82)}
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

            {/* Dot label */}
            <motion.text
              x={dotX + (dotX > toSvgX(0.6) ? -6 : 6)} y={dotY - 6}
              textAnchor={dotX > toSvgX(0.6) ? 'end' : 'start'}
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
            Market Clusters
          </div>
          {clusters.map(c => (
            <div key={c.id} className="flex items-start gap-2.5">
              <div className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                style={{ background: c.color, opacity: 0.75 }} />
              <div>
                <div className="text-white text-xs font-semibold leading-tight">{c.label}</div>
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

          {/* Axis scores */}
          <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
            <div className="text-[11px] text-text-muted">
              <span className="block font-semibold text-text-secondary mb-0.5">Execution Readiness</span>
              <span className="text-white font-display font-bold text-sm">{Math.round(x * 100)}th</span> percentile
            </div>
            <div className="text-[11px] text-text-muted">
              <span className="block font-semibold text-text-secondary mb-0.5">Strategic Maturity</span>
              <span className="text-white font-display font-bold text-sm">{Math.round(y * 100)}th</span> percentile
            </div>
          </div>
        </div>
      </div>

      {/* Interpretation note */}
      <div className="mt-4 p-3 rounded-xl text-xs text-text-muted leading-relaxed"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="font-semibold text-text-secondary">What this means: </span>
        {x < 0.4 && y < 0.4 && 'Your org is in the Early Movers cluster — where most organizations start. The path forward is to build a written strategy first, then execute against it.'}
        {x >= 0.4 && y < 0.4 && 'You have strong execution capabilities but are under-invested in strategy and governance. Risk: building the right things without a scalable framework.'}
        {x < 0.4 && y >= 0.4 && 'Strategy and governance are ahead of execution. The bottleneck is turning planning into deployed value — prioritize production use cases.'}
        {x >= 0.4 && y >= 0.4 && x < 0.7 && 'You\'re in the Progressing cluster — above average on both dimensions. The move to AI Leader status requires governance maturity and scaling discipline.'}
        {x >= 0.7 && y >= 0.7 && `You're in or near the AI Leaders cluster. At this position, the focus is compounding the advantage — governance systems, portfolio ROI, and organizational learning loops.`}
        {x >= 0.4 && x < 0.7 && y >= 0.7 && 'Strong strategy with growing execution. You\'re ahead of most peers — the gap to close is scaling what\'s working into enterprise production.'}
      </div>
    </div>
  )
}

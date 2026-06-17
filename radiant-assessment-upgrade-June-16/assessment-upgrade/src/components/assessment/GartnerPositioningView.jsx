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

  // SVG coordinate space: 0..100 in both axes
  // Origin (0,0) = bottom-left; we flip Y for SVG
  const toSvgX = (v) => 12 + v * 76    // 12..88 range
  const toSvgY = (v) => 88 - v * 76    // 88..12 range (flipped)

  const dotX = toSvgX(x)
  const dotY = toSvgY(y)

  // Illustrative clusters (x, y in 0..1 domain, r = radius in SVG units)
  const clusters = [
    { id: 'early', label: 'Most Organizations', sublabel: 'Stage 1–2', cx: 0.18, cy: 0.22, r: 14, color: '#64748B', opacity: 0.35 },
    { id: 'progress', label: 'Progressing', sublabel: 'Stage 3', cx: 0.52, cy: 0.50, r: 10, color: '#2DD4BF', opacity: 0.25 },
    { id: 'leaders', label: 'AI Leaders', sublabel: 'Stage 4–5', cx: 0.82, cy: 0.82, r: 10, color: accent, opacity: 0.22 },
    { id: 'planners', label: 'Planners', sublabel: 'Strategy without execution', cx: 0.15, cy: 0.78, r: 7, color: '#F0974E', opacity: 0.2 },
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
          <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 280 }}>
            {/* Background grid */}
            {[25, 50, 75].map(v => (
              <g key={v}>
                <line x1="12" y1={toSvgY(v / 100)} x2="88" y2={toSvgY(v / 100)}
                  stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <line x1={toSvgX(v / 100)} y1="12" x2={toSvgX(v / 100)} y2="88"
                  stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              </g>
            ))}

            {/* Quadrant divider */}
            <line x1="50" y1="12" x2="50" y2="88" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="12" y1="50" x2="88" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="2,2" />

            {/* Axes */}
            <line x1="12" y1="88" x2="88" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <line x1="12" y1="12" x2="12" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            {/* Arrowheads */}
            <polygon points="88,87 90,88 88,89" fill="rgba(255,255,255,0.15)" />
            <polygon points="11,12 12,10 13,12" fill="rgba(255,255,255,0.15)" />

            {/* Axis labels */}
            <text x="50" y="96.5" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="3.2" fontFamily="Inter,sans-serif">
              Execution Readiness →
            </text>
            <text x="5.5" y="50" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="3.2" fontFamily="Inter,sans-serif"
              transform="rotate(-90, 5.5, 50)">
              Strategic Maturity →
            </text>

            {/* Quadrant labels */}
            <text x="29" y="17" textAnchor="middle" fill="rgba(240,151,78,0.45)" fontSize="2.8" fontFamily="Inter,sans-serif" fontWeight="600">Planners</text>
            <text x="71" y="17" textAnchor="middle" fill={accent + '80'} fontSize="2.8" fontFamily="Inter,sans-serif" fontWeight="700">AI Leaders</text>
            <text x="29" y="96" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="2.8" fontFamily="Inter,sans-serif" fontWeight="600">Early Movers</text>
            <text x="71" y="96" textAnchor="middle" fill="rgba(45,212,191,0.4)" fontSize="2.8" fontFamily="Inter,sans-serif" fontWeight="600">Builders</text>

            {/* Cluster blobs */}
            {clusters.map(c => (
              <motion.ellipse
                key={c.id}
                cx={toSvgX(c.cx)} cy={toSvgY(c.cy)} rx={c.r} ry={c.r * 0.7}
                fill={c.color} fillOpacity={c.opacity}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 + clusters.findIndex(cl => cl.id === c.id) * 0.1 }}
                style={{ transformOrigin: `${toSvgX(c.cx)}px ${toSvgY(c.cy)}px` }}
              />
            ))}

            {/* AI Leaders goal zone highlight */}
            <rect x={toSvgX(0.6)} y={toSvgY(1.0)} width={toSvgX(1.0) - toSvgX(0.6)} height={toSvgY(0.6) - toSvgY(1.0)}
              fill={accent} fillOpacity="0.04" rx="1"
              stroke={accent} strokeOpacity="0.12" strokeWidth="0.5" />

            {/* Path from user to leaders zone (dotted) */}
            {(x < 0.75 || y < 0.75) && (
              <motion.line
                x1={dotX} y1={dotY}
                x2={toSvgX(0.82)} y2={toSvgY(0.82)}
                stroke={accent} strokeOpacity="0.25" strokeWidth="0.6"
                strokeDasharray="2,1.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            )}

            {/* Respondent dot */}
            <motion.circle
              cx={dotX} cy={dotY} r="3.5"
              fill={accent}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.6 }}
              style={{ filter: `drop-shadow(0 0 4px ${accent}80)`, transformOrigin: `${dotX}px ${dotY}px` }}
            />
            <motion.circle
              cx={dotX} cy={dotY} r="6"
              fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity="0.4"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{ transformOrigin: `${dotX}px ${dotY}px` }}
            />

            {/* Dot label */}
            <motion.text
              x={dotX + (dotX > 60 ? -4 : 5)} y={dotY - 5}
              textAnchor={dotX > 60 ? 'end' : 'start'}
              fill="white" fontSize="2.8" fontFamily="Inter,sans-serif" fontWeight="600"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              {companyName.length > 18 ? companyName.slice(0, 16) + '…' : companyName}
            </motion.text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 w-36 space-y-3 pt-2 hidden sm:block">
          <div className="text-[10px] font-display font-bold uppercase tracking-wider text-text-muted mb-3">
            Market Clusters
          </div>
          {clusters.map(c => (
            <div key={c.id} className="flex items-start gap-2">
              <div className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0"
                style={{ background: c.color, opacity: 0.7 }} />
              <div>
                <div className="text-white text-[10px] font-semibold leading-tight">{c.label}</div>
                <div className="text-text-muted text-[9px] leading-snug">{c.sublabel}</div>
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: accent, boxShadow: `0 0 4px ${accent}80` }} />
              <div className="text-[10px] font-semibold text-white">Your Org</div>
            </div>
          </div>

          {/* Axis scores */}
          <div className="pt-2 border-t border-white/[0.06] space-y-2">
            <div className="text-[9px] text-text-muted">
              <span className="block font-semibold text-text-secondary mb-0.5">Execution Readiness</span>
              {Math.round(x * 100)}th percentile
            </div>
            <div className="text-[9px] text-text-muted">
              <span className="block font-semibold text-text-secondary mb-0.5">Strategic Maturity</span>
              {Math.round(y * 100)}th percentile
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

import { ArrowRight, Compass, Rocket, HeartHandshake } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/**
 * PersonaPaths: maturity-based "choose your path" cards in the hero.
 *
 * Replaces the old assessment chips. Guides visitors by AI maturity instead of
 * pushing everyone to the assessment: beginners take the assessment; mature
 * users skip it and jump to the Context Engine / solutions narrative.
 *
 * Data-driven: three entries flow to 3 columns on desktop (stacked below lg).
 * The third card routes to the CX Maturity Assessment (replaces the old
 * "Take the CX Maturity Assessment" text link).
 *
 * Copy is final, supplied by the content team (radiant-ai-landing-copy-spec).
 * Hierarchy (per Lam): the verb phrase is the white headline; the diagnosis
 * line is the subhead beneath it. Buyers self-select by symptom.
 */
const paths = [
  {
    key: 'plan',
    headline: 'Plan With Confidence',
    subhead: 'Start with a map. Cut the risk.',
    blurb: 'A short diagnostic across strategy, data, people, and adoption. You get your stage, your gaps, and the sequence that produces results fastest.',
    cta: 'See where you stand',
    icon: Compass,
    accent: '#91C46B',        // brand-green
    action: 'route',
    target: '/assessment/ai',
  },
  {
    key: 'deploy',
    headline: 'Deploy With Discipline',
    subhead: 'Get to production. Cut the cost.',
    blurb: 'Accuracy, cost, and integration are where AI projects die. See how precision context and forward deployment get you past them.',
    cta: 'See the approach',
    icon: Rocket,
    accent: '#596AE0',        // brand-purple
    action: 'scroll',
    target: 'differentiator', // How We Work / Context Engine section
  },
  {
    key: 'cx',
    headline: 'Lead With Experience',
    subhead: 'Find the friction. Fix the journey.',
    blurb: 'A short diagnostic across strategy, insight, design, and accountability. You get your CX stage, your gaps, and the moves that lift loyalty fastest.',
    cta: 'See how your CX measures up',
    icon: HeartHandshake,
    accent: '#F0974E',        // brand-orange
    action: 'route',
    target: '/assessment/cx',
  },
]

export default function PersonaPaths() {
  const navigate = useNavigate()

  const onSelect = (p) => {
    if (p.action === 'route') navigate(p.target)
    else document.getElementById(p.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const grid = paths.length === 3 ? 'lg:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <div className={paths.length === 3 ? 'xl:-mx-16' : 'max-w-4xl mx-auto'}>
      <div className={`grid gap-4 ${grid} text-left`}>
        {paths.map(p => {
          const Icon = p.icon
          return (
            <button key={p.key} onClick={() => onSelect(p)}
              className="group flex flex-col rounded-2xl p-6 lg:p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full text-left"
              style={{
                background: 'rgba(8,20,36,0.72)',
                border: `1px solid ${p.accent}59`,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow: `0 16px 44px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.accent}b3`; e.currentTarget.style.boxShadow = `0 22px 56px rgba(0,0,0,0.5), 0 0 0 1px ${p.accent}40, inset 0 1px 0 rgba(255,255,255,0.06)` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${p.accent}59`; e.currentTarget.style.boxShadow = `0 16px 44px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 0%, ${p.accent}1f 0%, transparent 65%)` }} />
              <div className="relative z-10 flex flex-1 items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.accent}26`, border: `1px solid ${p.accent}4d` }}>
                  <Icon size={22} style={{ color: p.accent }} />
                </div>
                <div className="flex-1 flex flex-col self-stretch">
                  <h3 className={`font-display font-bold text-white text-xl leading-snug mb-1.5 ${paths.length === 3 ? "" : "lg:text-2xl"}`}>{p.headline}</h3>
                  <div className="font-display font-semibold text-sm mb-2.5 text-white/85">{p.subhead}</div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">{p.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-display font-semibold text-sm" style={{ color: p.accent }}>
                    {p.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

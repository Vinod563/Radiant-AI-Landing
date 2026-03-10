import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const platforms = [
  {
    num: '01',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 20%, #0a4a6e 40%, #00bcd4 60%, #e040fb 80%, #ff1493 100%)',
    title: 'Persona-Based Microagent Framework',
    desc: 'Deploy task-specific agents in days, not months. Minimal training data, low maintenance, and seamless orchestration through AgentOps — unlocking the autonomous Build-Deploy-Run value pool that defines the next wave of enterprise AI.',
    features: ['Deploy in Days', 'Minimal Training Data', 'AgentOps Orchestration', '70% Less Maintenance'],
  },
  {
    num: '02',
    gradient: 'linear-gradient(135deg, #1a0800 0%, #3d1500 20%, #8b3000 40%, #e65c00 60%, #f9a825 80%, #ff7043 100%)',
    title: 'Cognitive Experience',
    desc: 'Your users expect consumer-grade AI interactions with enterprise-grade security. Role-aware, conversational, multi-modal — with governance and compliance built in, not bolted on.',
    features: ['Role-Aware UX', 'Conversational AI', 'Multi-Modal', 'Zero-Trust Governance'],
  },
  {
    num: '03',
    gradient: 'linear-gradient(135deg, #000d1a 0%, #001a4d 25%, #003380 50%, #0066cc 70%, #00bfff 90%, #7df9ff 100%)',
    title: 'Semantic Context Engine',
    desc: 'Data without context is noise. Our semantic layer connects operational data to business outcomes through knowledge graphs — turning natural language queries into actionable, revenue-driving insights.',
    features: ['Knowledge Graphs', 'Context-Aware AI', 'Natural Language Queries', 'Revenue-Aligned Insights'],
  },
  {
    num: '04',
    gradient: 'linear-gradient(135deg, #001a00 0%, #003300 20%, #006600 40%, #009900 60%, #39d353 80%, #b8ffb8 100%)',
    title: 'Agentic Data Framework',
    desc: 'Fragmented data is the #1 blocker for enterprise AI. Our AI Fabric unifies it — ontology mapping, automated cleansing, and governed migration that turns data chaos into AI-ready assets.',
    features: ['Ontology Mapping', 'Auto Data Cleansing', 'Unified Data Layer', 'Governed Migration'],
  },
]

function HexBadge({ num }) {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 flex-shrink-0"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(145,196,107,0.35))' }}>
      <svg viewBox="0 0 52 60" className="absolute inset-0 w-full h-full" fill="none">
        <path d="M26 2L50 16V44L26 58L2 44V16L26 2Z"
          fill="#0d2a17" stroke="rgba(145,196,107,0.5)" strokeWidth="1.5" />
      </svg>
      <span className="relative font-display font-black text-sm text-brand-green z-10 leading-none">{num}</span>
    </div>
  )
}

export default function Platform() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="platform" className="py-32 bg-brand-secondary relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="kicker">Platforms</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
            Four Platforms.<br />
            <span className="grad-text">One Secure Foundation.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Enterprise AI demands more than models — it demands trust. Four battle-tested layers — agents, cognition, context, and data — built for speed without sacrificing governance, so you pay for outcomes, not experiments.
          </p>
        </motion.div>

        {/* 2-column card grid */}
        <div className="grid md:grid-cols-2 gap-7">
          {platforms.map((p, i) => (
            <motion.div key={p.num}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="rounded-3xl overflow-hidden flex flex-col"
              style={{
                background: 'rgba(1, 15, 30, 0.75)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
              }}
            >
              {/* Abstract banner image */}
              <div className="relative h-52 flex-shrink-0 overflow-hidden">
                <div className="absolute inset-0" style={{ background: p.gradient }} />
                {/* Wave overlay for depth */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 208" preserveAspectRatio="xMidYMid slice" fill="none" opacity="0.35">
                  <path d="M-50 140 Q175 60 350 130 Q525 200 750 80" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
                  <path d="M-50 170 Q200 90 380 155 Q560 220 750 110" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
                  <path d="M-50 100 Q150 30 330 105 Q510 180 750 50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Card body */}
              <div className="p-8 flex flex-col flex-1">
                {/* Hex badge — pulled up to overlap the image */}
                <div className="-mt-16 mb-5">
                  <HexBadge num={p.num} />
                </div>

                <h3 className="font-display font-black text-3xl text-white mb-4 leading-tight">
                  {p.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  {p.desc}
                </p>

                {/* 2×2 feature grid */}
                <div className="grid grid-cols-2 gap-x-8 mt-auto">
                  {p.features.map(f => (
                    <div key={f} className="py-3 border-b border-white/[0.08]">
                      <span className="text-sm font-medium text-text-secondary">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const platforms = [
  {
    num: '01',
    title: 'Secure Agent Framework',
    desc: 'Enterprise orchestration, governance controls, and compliance automation for AI agents at scale.',
    features: ['Enterprise Orchestration', 'Governance Controls', 'Multi-Agent Layer', 'Compliance'],
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a2a4e 40%, #3a6090 80%, #7ac0f0 100%)',
  },
  {
    num: '02',
    title: 'Cognitive Experience',
    desc: 'Intelligent interfaces enabling context-aware, adaptive experiences across every touchpoint.',
    features: ['Intelligent UX', 'Conversational AI', 'Context-Aware', 'AI at Scale'],
    gradient: 'linear-gradient(135deg, #1a0800 0%, #4a1800 40%, #8a3a10 80%, #f0974e 100%)',
  },
  {
    num: '03',
    title: 'Agentic Data Framework',
    desc: 'Structured pipelines, semantic search, and secure data foundations powering every model.',
    features: ['Data Pipelines', 'Semantic Search', 'AI-Ready', 'Secure Ingestion'],
    gradient: 'linear-gradient(135deg, #000a1a 0%, #002060 40%, #0050b0 80%, #60b0ff 100%)',
  },
  {
    num: '04',
    title: 'Semantic Content Engine',
    desc: 'Dynamic knowledge graphs and semantic reasoning turning raw content into actionable insight.',
    features: ['Knowledge Graph', 'Semantic Reasoning', 'Contextual AI', 'Enrichment'],
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a4020 40%, #3a7a40 80%, #91C46B 100%)',
  },
]

export default function Platform() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="platform" className="py-32 lg:py-40 bg-brand-deep relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 items-end mb-20"
        >
          <div>
            <span className="label">Technologies</span>
            <h2 className="font-heading font-extrabold text-display text-white">
              Built on a Secure,<br />
              <span className="text-brand-green">Modular</span> Foundation.
            </h2>
          </div>
          <p className="text-white/70 text-lg leading-relaxed lg:pb-2">
            Four battle-tested platform layers giving your enterprise the AI building blocks to move fast — without compromising security or scale.
          </p>
        </motion.div>

        {/* Magazine layout: 1 large + 3 stacked */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left — large card */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="mag-card overflow-hidden"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0" style={{ background: platforms[0].gradient }} />
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 500"
                preserveAspectRatio="xMidYMid slice" fill="none">
                <path d="M-50 340 Q200 100 400 260 Q600 420 850 160"
                  stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <path d="M-50 400 Q250 160 450 320 Q650 480 900 220"
                  stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </svg>
              <div className="absolute top-6 left-7 font-sans text-white/70 text-xs font-semibold tracking-[0.15em] uppercase">
                {platforms[0].num}
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-subtitle text-white mb-3">{platforms[0].title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">{platforms[0].desc}</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {platforms[0].features.map(f => (
                  <div key={f} className="py-2 border-b border-white/[0.08] text-sm text-white/70">{f}</div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — stacked cards */}
          <div className="flex flex-col gap-6">
            {platforms.slice(1).map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="mag-card overflow-hidden flex flex-row"
              >
                {/* Visual side */}
                <div className="relative w-2/5 flex-shrink-0 overflow-hidden" style={{ minHeight: '160px' }}>
                  <div className="absolute inset-0" style={{ background: p.gradient }} />
                  <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 400 300"
                    preserveAspectRatio="xMidYMid slice" fill="none">
                    <path d="M-20 200 Q100 60 200 150 Q300 240 440 100"
                      stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute top-4 left-5 font-sans text-white/70 text-xs font-semibold tracking-[0.15em] uppercase">
                    {p.num}
                  </div>
                </div>

                {/* Content side */}
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="font-display text-xl text-white mb-2">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.features.map(f => (
                      <span key={f} className="text-xs font-sans px-2.5 py-1 rounded-full bg-white/[0.05] text-white/60 border border-white/10">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

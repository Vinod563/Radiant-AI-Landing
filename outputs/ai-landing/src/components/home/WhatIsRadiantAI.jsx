import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const layers = [
  {
    num: '01',
    title: 'AI Solutions',
    lead: 'Pre-built enterprise AI that delivers impact without months of development.',
    tags: ['Enterprise ICX', 'CX Workbench', 'AI Fabric', 'DocuFlow'],
    gradient: 'linear-gradient(145deg, #1a2a1e 0%, #2d5a35 50%, #91C46B 100%)',
  },
  {
    num: '02',
    title: 'AI Platforms',
    lead: 'Core infrastructure powering enterprise AI deployment at scale.',
    tags: ['Secure Agent Framework', 'Cognitive Experience', 'Knowledge Graph'],
    gradient: 'linear-gradient(145deg, #2d1a0a 0%, #6b3a18 50%, #F0974E 100%)',
  },
  {
    num: '03',
    title: 'AI Capabilities',
    lead: 'Full-spectrum NLP, generative AI, and multi-agent systems.',
    tags: ['NLP Pipelines', 'Predictive Systems', 'Generative AI', 'Cloud Native'],
    gradient: 'linear-gradient(145deg, #0a0d2e 0%, #1a2070 50%, #596AE0 100%)',
  },
]

export default function WhatIsRadiantAI() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="ai-labs" className="py-32 lg:py-40 bg-brand-deep relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header — asymmetric editorial layout */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-end mb-24"
        >
          <div>
            <span className="label">Our Framework</span>
            <h2 className="font-heading font-extrabold text-display text-white">
              One Framework.<br />
              <span className="text-brand-green">Infinite</span> Enterprise<br />
              Possibilities.
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-white/70 text-lg leading-relaxed">
              A 7-layer architecture enabling secure, enterprise-grade AI — from rapid prototyping to full-scale deployment in 6 weeks.
            </p>
          </div>
        </motion.div>

        {/* Three editorial cards with big images */}
        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.num}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="group cursor-pointer"
            >
              {/* Large visual */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0" style={{ background: layer.gradient }} />

                {/* Wave decoration */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 533"
                  preserveAspectRatio="xMidYMid slice" fill="none">
                  <path d="M-30 360 Q100 180 200 300 Q300 420 450 220"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <path d="M-30 420 Q120 240 240 360 Q360 480 470 280"
                    stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <ellipse cx="300" cy="120" rx="120" ry="120" fill="rgba(255,255,255,0.04)" />
                </svg>

                {/* Big number overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-white/10 select-none"
                    style={{ fontSize: 'clamp(10rem, 25vw, 16rem)', lineHeight: 0.8 }}>
                    {layer.num}
                  </span>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="font-sans text-white/90 text-xs font-semibold tracking-[0.15em] uppercase">
                    Layer {layer.num}
                  </div>
                </div>

                {/* Hover scale */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="font-display text-[32px] leading-tight text-white mb-3 group-hover:text-brand-green transition-colors duration-300">
                {layer.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {layer.lead}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {layer.tags.map(t => (
                  <span key={t} className="text-xs font-sans font-medium px-3 py-1.5 rounded-full bg-white/[0.05] text-white/70 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-sans font-medium text-white/50 group-hover:text-brand-green transition-colors">
                Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

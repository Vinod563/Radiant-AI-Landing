import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const layers = [
  {
    num: '01',
    title: 'AI Solutions',
    lead: 'Pre-built enterprise AI solutions that deliver measurable impact without months of development.',
    tags: ['Enterprise ICX', 'CX Workbench', 'AI Fabric', 'Anomaly Detection', 'Rapid AI', 'DocuFlow'],
    color: 'text-brand-green',
    accent: '#91C46B',
    border: 'border-brand-green/25',
    gradient: 'linear-gradient(145deg, #010F1E 0%, #032d14 25%, #065c22 50%, #0d9940 70%, #39d353 88%, #91C46B 100%)',
  },
  {
    num: '02',
    title: 'AI Platforms',
    lead: 'Core infrastructure that powers enterprise AI deployment at scale, with security baked in.',
    tags: ['Secure Agent Framework', 'Cognitive Experience', 'Semantic Content Engine', 'Dynamic Knowledge Graph'],
    color: 'text-brand-orange',
    accent: '#F0974E',
    border: 'border-brand-orange/25',
    gradient: 'linear-gradient(145deg, #0d0800 0%, #2d1200 25%, #6b2d00 50%, #c45a00 70%, #f0974e 88%, #ffc97a 100%)',
  },
  {
    num: '03',
    title: 'AI Capabilities',
    lead: 'Full-spectrum AI capabilities — NLP, generative AI, multi-agent systems — powering every layer.',
    tags: ['NLP Pipelines', 'Predictive Systems', 'Generative AI', 'Multi-Agent Systems', 'Cloud Native AI'],
    color: 'text-brand-purple',
    accent: '#596AE0',
    border: 'border-brand-purple/25',
    gradient: 'linear-gradient(145deg, #01050f 0%, #080d2e 25%, #131a5c 50%, #2233b0 70%, #596ae0 88%, #8fa3f5 100%)',
  },
  {
    num: '04',
    title: 'Enablers',
    lead: 'Six core service pillars that power every AI initiative — from digital strategy and cloud infrastructure to skilled workforce delivery.',
    tags: ['Digital Strategy & Experience', 'Analytics, Data Science & AI', 'Cloud Transformation', 'Product Dev & Integration', 'Organizational Transformation', 'Skilled Workforce Solutions'],
    color: 'text-brand-teal',
    accent: '#2DD4BF',
    border: 'border-brand-teal/25',
    gradient: 'linear-gradient(145deg, #010f0d 0%, #032d27 25%, #065c4a 50%, #0d9980 70%, #2dd4bf 88%, #5eead4 100%)',
  },
]

function HexBadge({ num, accent }) {
  return (
    <div className="relative inline-flex items-center justify-center w-14 h-14 flex-shrink-0"
      style={{ filter: `drop-shadow(0 4px 14px ${accent}55)` }}>
      <svg viewBox="0 0 52 60" className="absolute inset-0 w-full h-full" fill="none">
        <path d="M26 2L50 16V44L26 58L2 44V16L26 2Z"
          fill="rgba(1,15,30,0.85)" stroke={`${accent}88`} strokeWidth="1.5" />
      </svg>
      <span className="relative font-display font-black text-sm z-10 leading-none" style={{ color: accent }}>{num}</span>
    </div>
  )
}

export default function WhatIsRadiantAI() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="ai-labs" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="editorial-bg-num absolute -right-8 top-8 select-none">AI</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-12 items-end mb-20"
        >
          <div>
            <span className="kicker">Our Framework</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
              One Framework.<br />
              <span className="grad-text">Infinite Enterprise</span><br />
              Possibilities.
            </h2>
          </div>
          <div>
            <p className="text-text-secondary text-lg leading-relaxed">
              Radiant AI is our applied intelligence framework — a 7-layer architecture that enables secure, enterprise-grade AI solutions across your entire organization. From rapid prototyping to full-scale deployment in 6 weeks.
            </p>
          </div>
        </motion.div>

        {/* Horizontal cards — stacked rows */}
        <div className="flex flex-col gap-6">
          {layers.map((layer, i) => (
            <motion.div key={layer.num}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.13 }}
              className={`rounded-3xl overflow-hidden flex flex-row border ${layer.border} group cursor-pointer`}
              style={{
                background: 'rgba(1, 15, 30, 0.8)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                minHeight: '160px',
              }}
              whileHover={{ y: -4 }}
            >
              {/* Left — abstract banner (40%) */}
              <div className="relative w-2/5 flex-shrink-0 overflow-hidden">
                <div className="absolute inset-0" style={{ background: layer.gradient }} />

                {/* Fluid wave paths */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 260"
                  preserveAspectRatio="xMidYMid slice" fill="none">
                  <path d="M-40 180 Q120 70 260 150 Q400 230 540 90"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" fill="none" />
                  <path d="M-40 220 Q140 110 280 185 Q420 255 540 130"
                    stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
                  <path d="M-40 130 Q110 30 250 110 Q390 190 540 50"
                    stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                  <ellipse cx="380" cy="70" rx="130" ry="65" fill="rgba(255,255,255,0.06)" />
                  <ellipse cx="70" cy="210" rx="90" ry="45" fill="rgba(255,255,255,0.04)" />
                </svg>

                {/* Right-edge fade into card body */}
                <div className="absolute inset-y-0 right-0 w-20"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(1,15,30,0.9))' }} />

                {/* Hex badge — centred vertically on the left panel */}
                <div className="absolute bottom-5 left-6">
                  <HexBadge num={layer.num} accent={layer.accent} />
                </div>
              </div>

              {/* Right — content (60%) */}
              <div className="flex flex-col justify-center px-8 py-6 flex-1">
                <h3 className={`font-display font-black text-2xl mb-2 leading-tight ${layer.color}`}>
                  {layer.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-xl">
                  {layer.lead}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {layer.tags.map(t => (
                    <span key={t}
                      className="text-xs font-display font-semibold px-3 py-1 rounded-full border"
                      style={{
                        color: layer.accent,
                        borderColor: `${layer.accent}33`,
                        background: `${layer.accent}0d`,
                      }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-2 text-xs font-display font-semibold ${layer.color} opacity-50 group-hover:opacity-100 transition-opacity`}>
                  Explore <ArrowRight size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

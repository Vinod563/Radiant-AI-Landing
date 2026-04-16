import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteContentContext } from '../../context/SiteContentContext'

const categoryAccents = ['#596AE0', '#F0974E', '#91C46B']
const categoryGradients = [
  'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 40%, #1a3a7e 100%)',
  'linear-gradient(135deg, #1a0800 0%, #3d1500 40%, #8b4000 100%)',
  'linear-gradient(135deg, #001a00 0%, #003300 40%, #1a6620 100%)',
]

export default function Platform() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { content } = useSiteContentContext()
  const pl = content.platform || {}
  const categories = (pl.categories || []).map((cat, i) => ({
    ...cat,
    accent: categoryAccents[i] || '#596AE0',
    gradient: categoryGradients[i] || categoryGradients[0],
    capabilities: Array.isArray(cat.capabilities) ? cat.capabilities : [],
  }))

  return (
    <section id="platform" className="py-32 bg-brand-secondary relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-8"
        >
          <span className="kicker">{pl.kicker || 'The Radiant Digital AI Platform'}</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
            {(pl.headline || 'Our foundational AI capabilities.\nThe infrastructure beneath every solution and engagement.').split('\n')[0]}<br />
            <span className="grad-text">{(pl.headline || 'Our foundational AI capabilities.\nThe infrastructure beneath every solution and engagement.').split('\n')[1]}</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            {pl.body || 'Radiant Digital does not deploy generic AI. Every solution is assembled from purpose-built platform capabilities.'}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 text-sm font-display font-medium mb-16 max-w-2xl"
        >
          {pl.subBody || 'This is the technical foundation of the Precision Context Engine.'}
        </motion.p>

        {/* Three category cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {categories.map((cat, i) => {
            const numOffset = categories.slice(0, i).reduce((sum, c) => sum + c.capabilities.length, 0)
            return (
              <motion.div key={cat.label}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className="rounded-3xl overflow-hidden flex flex-col group cursor-default relative"
                style={{
                  background: 'rgba(1, 15, 30, 0.75)',
                  border: `1px solid ${cat.accent}18`,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 60px ${cat.accent}08`,
                }}
              >
                {/* Gradient banner */}
                <div className="relative h-32 flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0" style={{ background: cat.gradient }} />

                  {/* Animated wave paths */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 128" preserveAspectRatio="xMidYMid slice" fill="none">
                    <motion.path
                      d="M-50 90 Q175 30 350 80 Q525 130 750 50"
                      stroke={`${cat.accent}55`} strokeWidth="2" fill="none"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: 0.3 + i * 0.2 }}
                    />
                    <motion.path
                      d="M-50 110 Q200 50 380 95 Q560 140 750 70"
                      stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2.5, delay: 0.5 + i * 0.2 }}
                    />
                    <circle cx="580" cy="40" r="60" fill={`${cat.accent}08`} />
                  </svg>

                  {/* Large number watermark */}
                  <div className="absolute top-3 right-5 font-display font-black text-[4.5rem] leading-none select-none pointer-events-none"
                    style={{ color: `${cat.accent}12` }}>
                    {cat.num}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  {/* Category label */}
                  <h3 className="font-display font-black text-xl mb-2 leading-tight transition-colors duration-300"
                    style={{ color: cat.accent }}>
                    {cat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {cat.desc}
                  </p>

                  {/* Capability count badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[0.6rem] font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: `${cat.accent}12`, color: `${cat.accent}cc`, border: `1px solid ${cat.accent}20` }}>
                      {cat.capabilities.length} capabilities
                    </span>
                  </div>

                  {/* Capability list */}
                  <div className="flex flex-col gap-0">
                    {cat.capabilities.map((c, ci) => (
                      <motion.div key={c}
                        className="py-3 border-b border-white/[0.05] last:border-b-0 flex items-center gap-3 group/item"
                        initial={{ opacity: 0, x: -12 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.12 + ci * 0.06 }}
                      >
                        <span className="text-[0.6rem] font-display font-bold w-5 text-right flex-shrink-0"
                          style={{ color: `${cat.accent}50` }}>
                          {String(numOffset + ci + 1).padStart(2, '0')}
                        </span>
                        <div className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: `${cat.accent}40` }} />
                        <span className="text-sm font-medium text-text-secondary transition-colors duration-300 group-hover/item:text-white/80">
                          {c}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom spacer */}
                  <div className="pt-4" />
                </div>

                {/* Bottom accent line on hover */}
                <div className="h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent 10%, ${cat.accent}30 50%, transparent 90%)` }} />
              </motion.div>
            )
          })}
        </div>

        {/* Supporting copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <p className="text-text-muted text-base max-w-xl leading-relaxed">
            These are not features. They are the building blocks from which
            Radiant Digital assembles solutions that know your environment
            before they run a single process.
          </p>
          <Link to="/chat?q=How+does+the+Radiant+AI+Platform+work" className="btn-primary group/link whitespace-nowrap">
            <span>Explore the Platform</span>
            <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

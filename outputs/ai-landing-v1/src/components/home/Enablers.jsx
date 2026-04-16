import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Compass, BarChart3, Cloud, Blocks, RefreshCw, Users } from 'lucide-react'
import { useSiteContentContext } from '../../context/SiteContentContext'

const iconMap = { Compass, BarChart3, Cloud, Blocks, RefreshCw, Users }

const visualOverrides = [
  { accent: '#91C46B', gradient: 'linear-gradient(135deg, #010F1E 0%, #0a2810 60%, #144d1e 100%)' },
  { accent: '#F0974E', gradient: 'linear-gradient(135deg, #010F1E 0%, #1a1008 60%, #3d2200 100%)' },
  { accent: '#596AE0', gradient: 'linear-gradient(135deg, #010F1E 0%, #0a0d2e 60%, #151a50 100%)' },
  { accent: '#2DD4BF', gradient: 'linear-gradient(135deg, #010F1E 0%, #041a18 60%, #0a3530 100%)' },
  { accent: '#a855f7', gradient: 'linear-gradient(135deg, #010F1E 0%, #0e0820 60%, #1a1040 100%)' },
  { accent: '#F05030', gradient: 'linear-gradient(135deg, #010F1E 0%, #1a0808 60%, #3d1010 100%)' },
]

export default function Enablers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { content } = useSiteContentContext()
  const aiFabric = content.aiFabric || {}
  const practices = (aiFabric.practices || []).map((p, i) => ({
    ...p,
    icon: iconMap[p.icon] || Compass,
    ...(visualOverrides[i] || {}),
  }))

  return (
    <section id="ai-fabric" className="py-32 lg:py-40 relative overflow-hidden">
      {/* Video background — same source as Hero, different overlay for distinct look */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.5, filter: 'hue-rotate(15deg) saturate(1.3)' }}
          ref={(el) => { if (el) el.playbackRate = 0.3 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Tinted overlay — warmer/green tone to differentiate from Hero's cooler look */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(1,15,30,0.6) 0%, rgba(10,40,20,0.55) 40%, rgba(1,15,30,0.65) 70%, rgba(5,20,35,0.6) 100%)' }} />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <span className="kicker">{aiFabric.kicker || 'AI Fabric'}</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              {(aiFabric.headline || 'We hardwire AI into\neverything we do.').split('\n')[0]}{' '}
              <span className="grad-text">{(aiFabric.headline || 'We hardwire AI into\neverything we do.').split('\n')[1]}</span>
            </h2>
          </div>
        </motion.div>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted text-base max-w-2xl leading-relaxed mb-16"
        >
          {aiFabric.body || "That is what makes Radiant Digital's enterprise transformation fundamentally faster than conventional delivery. AI Fabric is not a product. It is the way Radiant operates. Every practice runs with AI embedded: not bolted on."}
        </motion.p>

        {/* Top row: 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {practices.slice(0, 3).map((e, i) => (
            <PracticeCard key={e.title} e={e} i={i} inView={inView} />
          ))}
        </div>

        {/* Bottom row: 3 cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {practices.slice(3, 6).map((e, i) => (
            <PracticeCard key={e.title} e={e} i={i + 3} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PracticeCard({ e, i, inView }) {
  const Icon = e.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: e.gradient,
        border: `1px solid ${e.accent}15`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 24px 60px rgba(0,0,0,0.45), 0 0 40px ${e.accent}08`,
      }}
    >
      {/* Top accent line */}
      <div className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${e.accent}35, transparent)` }} />

      <div className="relative p-7 lg:p-8">
        {/* Decorative background number */}
        <div className="absolute top-4 right-5 font-display font-black text-[5rem] leading-none select-none pointer-events-none"
          style={{ color: `${e.accent}06` }}>
          {e.num}
        </div>

        {/* Accent glow on hover */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${e.accent}10, transparent 70%)` }} />

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
          style={{
            background: `${e.accent}12`,
            border: `1.5px solid ${e.accent}28`,
          }}
          whileHover={{ scale: 1.1, rotate: 4 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon size={22} style={{ color: e.accent }} />
        </motion.div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white/90 mb-3 leading-snug group-hover:text-white transition-colors duration-300 relative z-10">
          {e.title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-6 relative z-10">
          {e.desc}
        </p>

        {/* Bottom accent line */}
        <div className="pt-4 relative z-10"
          style={{ borderTop: `1px solid ${e.accent}12` }} />
      </div>

      {/* Bottom accent glow on hover */}
      <div className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${e.accent}40 50%, transparent 90%)` }} />
    </motion.div>
  )
}

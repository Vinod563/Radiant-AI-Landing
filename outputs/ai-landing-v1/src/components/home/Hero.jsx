import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const heroMetrics = [
  { val: '30–40%', label: 'Productivity Gains', color: 'text-brand-green' },
  { val: '6 wks', label: 'From Pilot to Production', color: 'text-brand-orange' },
  { val: '8', label: 'Industries Served', color: 'text-brand-green' },
  { val: '50+', label: 'Federal & Enterprise Clients', color: 'text-brand-orange' },
  { val: '99.9%', label: 'Uptime Guarantee', color: 'text-brand-purple' },
]


export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.6, playbackRate: 0.5 }}
          ref={(el) => { if (el) el.playbackRate = 0.5 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,15,30,0.5) 0%, rgba(1,15,30,0.2) 40%, rgba(1,15,30,0.4) 100%)' }} />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-center pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black leading-[1.1] mb-7 tracking-tight"
                style={{ fontSize: 'clamp(3.4rem, 6.75vw, 6.3rem)' }}
              >
                Deploy AI<br />
                in{' '}
                <span className="whitespace-nowrap" style={{
                  background: 'linear-gradient(135deg, #91C46B 0%, #F0974E 35%, #596AE0 70%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>6 Weeks.</span>
                <br />
                <span className="text-white/70" style={{ fontSize: '55%', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                  Not 6 months.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-text-secondary text-lg leading-relaxed mx-auto mb-9"
              >
                Radiant delivers enterprise-grade AI solutions built for scalability, compliance, and measurable impact — from day one.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
              >
                <a href="#solutions" className="btn-primary text-sm relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Solutions <ArrowRight size={15} />
                  </span>
                </a>
                <a href="#contact" className="btn-ghost text-sm">Book a Strategy Call</a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom metric strip with colorful accents */}
      <div className="relative border-t border-white/[0.07] backdrop-blur-sm"
        style={{ background: 'rgba(5,10,25,0.5)' }}>
        {/* Subtle rainbow line on top of strip */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, #91C46B 20%, #F0974E 40%, #596AE0 60%, #a855f7 80%, transparent 95%)', opacity: 0.25 }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-5">
            {heroMetrics.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5 + i * 0.08 }}
                className="metric-strip-item"
              >
                <span className={`font-display font-black text-2xl leading-none ${m.color}`}>{m.val}</span>
                <span className="text-text-muted text-[0.65rem] font-display font-medium mt-1.5 tracking-wide">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

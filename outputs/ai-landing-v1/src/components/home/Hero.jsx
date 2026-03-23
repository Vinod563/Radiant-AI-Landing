import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const heroMetrics = [
  { val: '40%', label: 'Avg Cost Reduction', color: 'text-brand-green' },
  { val: '6 Weeks', label: 'Pilot to Production', color: 'text-brand-orange' },
  { val: '14+', label: 'Industries Served', color: 'text-brand-green' },
  { val: '29', label: 'Telecom AI Use Cases Mapped', color: 'text-brand-orange' },
]


export default function Hero() {
  const navigate = useNavigate()

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
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)' }}
              >
                Radiant has evolved<br />
                into the{' '}
                <span className="whitespace-nowrap" style={{
                  background: 'linear-gradient(135deg, #91C46B 0%, #F0974E 35%, #596AE0 70%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>age of AI.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-text-secondary text-lg leading-relaxed mx-auto mb-4 max-w-2xl"
              >
                We have figured out a way to infuse AI into everything we do.
                That means we can now help enterprises deploy AI into their operations:
                grounded in the right context, producing measurable results,
                faster than any other approach.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="text-white/50 text-sm font-display font-semibold tracking-widest uppercase mb-9"
              >
                Enterprise transformation. Supercharged with AI.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
              >
                <a href="#contact" className="btn-primary text-sm relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Start the Conversation <ArrowRight size={15} />
                  </span>
                </a>
                <a href="#proof" className="btn-ghost text-sm">See Our Work</a>
              </motion.div>

              {/* Conversational input */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div
                  onClick={() => navigate('/chat')}
                  className="flex items-center gap-4 rounded-2xl px-7 py-5 cursor-pointer transition-all duration-300 hover:border-[rgba(145,196,107,0.35)] hover:shadow-[0_0_0_6px_rgba(145,196,107,0.08),0_20px_60px_rgba(0,0,0,0.3)] group relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(145,196,107,0.06) 0%, transparent 60%)' }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(145,196,107,0.1)', border: '1px solid rgba(145,196,107,0.2)' }}>
                    <Sparkles size={18} className="text-brand-green" />
                  </div>
                  <span className="text-white/35 text-base font-body flex-1 text-left group-hover:text-white/55 transition-colors relative z-10">
                    What problem are you trying to solve?
                  </span>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 group-hover:bg-brand-green/15"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <Search size={16} className="text-white/25 group-hover:text-brand-green/70 transition-colors" />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom metric strip */}
      <div className="relative border-t border-white/[0.07] backdrop-blur-sm"
        style={{ background: 'rgba(5,10,25,0.5)' }}>
        {/* Subtle rainbow line on top of strip */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, #91C46B 20%, #F0974E 40%, #596AE0 60%, #a855f7 80%, transparent 95%)', opacity: 0.25 }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
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

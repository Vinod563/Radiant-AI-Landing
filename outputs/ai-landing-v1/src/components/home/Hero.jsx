import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Search, Brain, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { heroMetrics as metricsData, brand } from '../../data/siteContent.js'

const metricColors = ['text-brand-green', 'text-brand-orange', 'text-brand-green', 'text-brand-orange']
const heroMetrics = metricsData.map((m, i) => ({ ...m, color: metricColors[i] }))


export default function Hero() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [showFloater, setShowFloater] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setShowFloater(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (inputRef.current) obs.observe(inputRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
    {/* Floating bottom bar */}
    <AnimatePresence>
      {showFloater && (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-2xl"
        >
          <button
            onClick={() => navigate('/chat')}
            aria-label="Ask Radiant AI about enterprise transformation"
            className="flex items-center gap-4 rounded-2xl px-7 py-4 cursor-pointer transition-all duration-300 hover:border-[rgba(145,196,107,0.35)] hover:shadow-[0_0_0_6px_rgba(145,196,107,0.08)] group relative overflow-hidden w-full text-left"
            style={{
              background: 'rgba(5,15,30,0.85)',
              border: '1.5px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(145,196,107,0.06) 0%, transparent 60%)' }} />
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
              style={{ background: 'rgba(145,196,107,0.1)', border: '1px solid rgba(145,196,107,0.2)' }}>
              <Sparkles size={16} className="text-brand-green" />
            </div>
            <span className="text-white/70 text-sm font-body flex-1 text-left group-hover:text-white/55 transition-colors relative z-10">
              What enterprise transformation are you trying to supercharge?
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 group-hover:bg-brand-green/15"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Search size={14} className="text-white/50 group-hover:text-brand-green/70 transition-colors" />
            </div>
          </button>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
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
          <div className="max-w-5xl mx-auto text-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black leading-[1.1] mb-9 tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.8rem)' }}
              >
                {brand.tagline.split('.')[0]}.{' '}
                <span className="grad-text">{brand.tagline.split('. ')[1]}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/70 text-base lg:text-lg leading-relaxed max-w-4xl mx-auto mb-10"
              >
                {brand.description}
              </motion.p>

              {/* Assessment chips with hover descriptions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap items-center justify-center gap-3 mb-6"
              >
                {[
                  { label: 'Find Your AI Readiness Gaps', to: '/assessment/ai', accent: '#91C46B', icon: Brain,
                    hover: 'Get your readiness score, uncover hidden gaps, and receive a practical roadmap to move forward.' },
                  { label: 'Find Your CX Maturity', to: '/assessment/cx', accent: '#596AE0', icon: Target,
                    hover: 'Discover your CX maturity level, uncover opportunities for improvement, and receive a roadmap for delivering better customer experiences.' },
                ].map(c => {
                  const Icon = c.icon
                  return (
                    <button key={c.to} onClick={() => navigate(c.to)}
                      className="group/chip relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-display font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                      style={{ background: `${c.accent}14`, border: `1px solid ${c.accent}40` }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${c.accent}24`; e.currentTarget.style.borderColor = `${c.accent}66` }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${c.accent}14`; e.currentTarget.style.borderColor = `${c.accent}40` }}
                    >
                      <Icon size={15} style={{ color: c.accent }} />
                      {c.label}
                      <ArrowRight size={13} style={{ color: c.accent }} className="group-hover/chip:translate-x-0.5 transition-transform" />
                      {/* hover tooltip */}
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 px-3.5 py-2.5 rounded-xl text-xs font-body font-normal leading-relaxed text-white/85 text-center opacity-0 translate-y-1 group-hover/chip:opacity-100 group-hover/chip:translate-y-0 transition-all duration-200 z-20"
                        style={{ background: 'rgba(5,18,34,0.97)', border: `1px solid ${c.accent}40`, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
                        {c.hover}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                          style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid rgba(5,18,34,0.97)' }} />
                      </span>
                    </button>
                  )
                })}
              </motion.div>

              {/* Conversational input */}
              <motion.div
                ref={inputRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <button
                  onClick={() => navigate('/chat')}
                  aria-label="Ask Radiant AI about enterprise transformation"
                  className="flex items-center gap-4 rounded-2xl px-7 py-5 cursor-pointer transition-all duration-300 hover:border-[rgba(145,196,107,0.35)] hover:shadow-[0_0_0_6px_rgba(145,196,107,0.08),0_20px_60px_rgba(0,0,0,0.3)] group relative overflow-hidden w-full text-left"
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
                  <span className="text-white/70 text-base font-body flex-1 text-left group-hover:text-white/55 transition-colors relative z-10">
                    What enterprise transformation are you trying to supercharge?
                  </span>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 group-hover:bg-brand-green/15"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <Search size={16} className="text-white/50 group-hover:text-brand-green/70 transition-colors" />
                  </div>
                </button>
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
                <span className={`font-display font-black text-2xl leading-none ${m.color}`}>{m.value}</span>
                <span className="text-text-muted text-[0.65rem] font-display font-medium mt-1.5 tracking-wide">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Quote } from 'lucide-react'

const metrics = [
  { val: '10K+', label: 'Man-Hours Saved',            color: 'grad-text' },
  { val: '43%',  label: 'Operational Efficiency Lift', color: 'text-brand-green' },
  { val: '20%',  label: 'Cost Reduction',             color: 'grad-text' },
  { val: '6 wks',label: 'Time to Full Deployment',    color: 'text-brand-orange' },
]

export default function CaseStudy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="case-study" className="py-32 bg-brand-dark relative overflow-hidden">
      {/* Editorial bg number */}
      <div className="editorial-bg-num absolute -left-4 top-0 opacity-[0.02]">V</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top headline */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="kicker">Featured Impact</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
            10,000 Hours.<br />
            Six Weeks.<br />
            <span className="grad-text">Real ROI.</span>
          </h2>
        </motion.div>

        {/* Row 1: Client info + Quote + Metrics */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Left — client + quote */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            {/* Client callout */}
            <div className="flex items-center gap-5 p-6 mag-card border border-white/[0.08] mb-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center font-display font-black text-2xl text-brand-dark flex-shrink-0">V</div>
              <div>
                <div className="font-display font-bold text-text-primary">Verizon</div>
                <div className="text-text-muted text-sm">Fortune 500 · Telecom</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span className="text-brand-green font-display text-[0.65rem] font-semibold">Case Study</span>
              </div>
            </div>

            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Radiant automated Verizon's operations workflows — eliminating 10,000+ manual hours and delivering a 43% operational efficiency lift through AI-driven orchestration, deployed in under 6 weeks.
            </p>

            {/* Pull quote */}
            <div className="relative pl-6 border-l-2 border-brand-green/40">
              <Quote size={20} className="absolute -top-1 -left-2.5 text-brand-green" />
              <p className="text-text-primary text-base italic font-light leading-relaxed">
                "Radiant's AI Fabric didn't just automate tasks — it fundamentally changed how our operations team works."
              </p>
              <span className="text-text-muted text-xs mt-2 block">— Operations Director, Verizon Enterprise</span>
            </div>
          </motion.div>

          {/* Right — metrics */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4 h-full content-center">
              {metrics.map((m, i) => (
                <motion.div key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
                  className="mag-card p-8"
                >
                  <div className={`font-display font-black leading-none mb-3 ${m.color}`}
                    style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
                    {m.val}
                  </div>
                  <div className="text-text-muted text-sm leading-snug">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Row 2: Video — full-width colorful background */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative"
      >
        {/* Colorful abstract background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(10,5,32,0.95) 0%, rgba(5,15,30,0.95) 40%, rgba(8,20,15,0.95) 100%)' }} />

          {/* Animated color orbs */}
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-[30%] left-[10%] w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(145,196,107,0.2) 0%, transparent 65%)', filter: 'blur(60px)' }}
          />
          <motion.div
            animate={{ x: [0, -30, 25, 0], y: [0, 25, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] right-[5%] w-[450px] h-[450px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(240,151,78,0.18) 0%, transparent 65%)', filter: 'blur(55px)' }}
          />
          <motion.div
            animate={{ x: [0, 30, -15, 0], y: [0, -20, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-[20%] left-[35%] w-[550px] h-[550px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(89,106,224,0.18) 0%, transparent 65%)', filter: 'blur(55px)' }}
          />
          <motion.div
            animate={{ x: [0, -25, 35, 0], y: [0, 15, -25, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[55%] w-[350px] h-[350px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 65%)', filter: 'blur(45px)' }}
          />
          <motion.div
            animate={{ x: [0, 20, -30, 0], y: [0, -35, 15, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,200,125,0.14) 0%, transparent 65%)', filter: 'blur(40px)' }}
          />

          {/* Top rainbow edge */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 5%, #91C46B 20%, #F0974E 40%, #596AE0 60%, #a855f7 80%, transparent 95%)', opacity: 0.35 }} />
          {/* Bottom rainbow edge */}
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 5%, #a855f7 20%, #596AE0 40%, #F0974E 60%, #91C46B 80%, transparent 95%)', opacity: 0.25 }} />
        </div>

        {/* Video — full width */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 80px rgba(89,106,224,0.08), 0 0 40px rgba(145,196,107,0.06)' }}>
            <div className="aspect-video flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #000a14 0%, #050818 50%, #0a0510 100%)' }}>
              {/* Inner color glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 35% 40%, rgba(145,196,107,0.1) 0%, transparent 50%), radial-gradient(ellipse at 65% 60%, rgba(89,106,224,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(240,151,78,0.06) 0%, transparent 50%)' }} />

              {/* Abstract wave lines */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 800 450" fill="none" preserveAspectRatio="xMidYMid slice">
                <path d="M-50 300 Q150 100 350 220 Q550 340 800 140" stroke="url(#vl1)" strokeWidth="1.5" />
                <path d="M-50 350 Q200 150 400 280 Q600 410 850 180" stroke="url(#vl2)" strokeWidth="1" />
                <path d="M-50 200 Q120 50 320 170 Q520 290 800 80" stroke="url(#vl3)" strokeWidth="0.8" />
                <defs>
                  <linearGradient id="vl1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#91C46B" />
                    <stop offset="100%" stopColor="#596AE0" />
                  </linearGradient>
                  <linearGradient id="vl2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F0974E" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="vl3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#596AE0" />
                    <stop offset="100%" stopColor="#00c87d" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Decorative bars */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end gap-0.5 h-20 px-8">
                {[
                  { h: 30, c: 'rgba(89,106,224,0.25)' },
                  { h: 50, c: 'rgba(89,106,224,0.3)' },
                  { h: 40, c: 'rgba(168,85,247,0.3)' },
                  { h: 70, c: 'rgba(168,85,247,0.35)' },
                  { h: 55, c: 'rgba(240,151,78,0.3)' },
                  { h: 90, c: 'rgba(240,151,78,0.4)' },
                  { h: 68, c: 'rgba(145,196,107,0.35)' },
                  { h: 100, c: 'rgba(145,196,107,0.5)' },
                  { h: 75, c: 'rgba(0,200,125,0.4)' },
                  { h: 85, c: 'rgba(145,196,107,0.4)' },
                  { h: 60, c: 'rgba(89,106,224,0.3)' },
                ].map((b, i) => (
                  <div key={i} style={{ height: `${b.h}%`, background: b.c }} className="flex-1 rounded-t-sm" />
                ))}
              </div>

              {/* Play button */}
              <button className="relative z-10 w-20 h-20 rounded-full transition-all group"
                style={{
                  background: 'linear-gradient(135deg, #91C46B 0%, #596AE0 100%)',
                  boxShadow: '0 0 50px rgba(145,196,107,0.3), 0 0 100px rgba(89,106,224,0.15)',
                }}>
                <Play size={24} className="text-white ml-1 mx-auto group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Quote } from 'lucide-react'

const metrics = [
  { val: '10K+', label: 'Hours Automated Annually',   color: 'grad-text' },
  { val: '43%',  label: 'Operational Efficiency Gain', color: 'text-brand-green' },
  { val: '$2.1M',label: 'Annual Cost Savings',         color: 'grad-text' },
  { val: '6 wks',label: 'From Kickoff to Production',  color: 'text-brand-orange' },
]

export default function CaseStudy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="case-study" className="py-32 bg-brand-dark relative overflow-hidden">
      {/* Editorial bg number */}
      <div className="editorial-bg-num absolute -left-4 top-0 opacity-[0.02]">T</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top headline */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="kicker">Proof, Not Promises</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
            $2.1M Saved.<br />
            43% More Efficient.<br />
            <span className="grad-text">In 6 Weeks.</span>
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
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center font-display font-black text-2xl text-brand-dark flex-shrink-0">T</div>
              <div>
                <div className="font-display font-bold text-text-primary">Leading Telecom Enterprise</div>
                <div className="text-text-muted text-sm">Fortune 500 · Telecommunications</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span className="text-brand-green font-display text-[0.65rem] font-semibold">Case Study</span>
              </div>
            </div>

            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Leading Telecom Enterprise needed AI that delivered measurable ROI, not another pilot. Radiant deployed agentic workflows that automated 10,000+ manual hours — a 43% efficiency gain and $2.1M in annual savings, live in production within 6 weeks.
            </p>

            {/* Pull quote */}
            <div className="relative pl-6 border-l-2 border-brand-green/40">
              <Quote size={20} className="absolute -top-1 -left-2.5 text-brand-green" />
              <p className="text-text-primary text-base italic font-light leading-relaxed">
                "We expected efficiency gains. What we got was a fundamental shift — our operations team now focuses on strategy, not firefighting."
              </p>
              <span className="text-text-muted text-xs mt-2 block">— Operations Director, Fortune 500 Telecom</span>
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

        {/* Video — full width edge-to-edge, no container */}
        <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ aspectRatio: '16/7.2' }}>
          {/* Thumbnail image */}
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=80"
            alt="Team collaborating on AI-driven operations dashboard"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(10,5,32,0.55) 0%, rgba(89,106,224,0.15) 40%, rgba(145,196,107,0.1) 70%, rgba(10,5,32,0.55) 100%)' }} />
          {/* Vignette edges */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
          {/* Bottom fade for text */}
          <div className="absolute bottom-0 left-0 right-0 h-40"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />

          {/* Play button */}
          <button className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #91C46B 0%, #596AE0 100%)',
              boxShadow: '0 0 50px rgba(145,196,107,0.4), 0 0 100px rgba(89,106,224,0.2)',
            }}>
            <Play size={28} className="text-white ml-0.5 group-hover:scale-110 transition-transform" fill="white" />
          </button>

          {/* Video label */}
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-12 z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-brand-green text-xs font-semibold tracking-widest uppercase">Watch Case Study</span>
            </div>
            <p className="text-white text-lg lg:text-xl font-display font-bold">How a Leading Telecom Enterprise Achieved 43% Efficiency Gain in 6 Weeks</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

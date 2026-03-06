import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Quote } from 'lucide-react'

const metrics = [
  { val: '10K+', label: 'Man-Hours Saved' },
  { val: '43%', label: 'Efficiency Lift' },
  { val: '20%', label: 'Cost Reduction' },
  { val: '6 wks', label: 'Time to Deploy' },
]

export default function CaseStudy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="case-study" className="bg-mag-black text-white relative overflow-hidden">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10 py-32 lg:py-40">

        {/* Top row — headline left, client + description right */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 mb-20">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="label label-dark">Featured Impact</span>
            <h2 className="font-heading font-extrabold text-display text-white leading-[0.95]">
              10,000 Hours.<br />
              Six Weeks.<br />
              <span className="text-brand-green">Real ROI.</span>
            </h2>
          </motion.div>

          {/* Client + description */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-end"
          >
            {/* Client badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-brand-green flex items-center justify-center font-display font-bold text-xl text-mag-black flex-shrink-0">
                V
              </div>
              <div>
                <div className="font-sans font-semibold text-white">Verizon</div>
                <div className="text-white/70 text-sm">Fortune 500 · Telecom</div>
              </div>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">
              Radiant automated Verizon's operations workflows — eliminating 10,000+ manual hours and delivering a 43% efficiency lift through AI-driven orchestration.
            </p>
          </motion.div>
        </div>

        {/* Metrics bar — full width, 4 columns */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-10 rounded-2xl mb-20"
          style={{
            background: 'linear-gradient(135deg, rgba(145,196,107,0.06) 0%, rgba(89,106,224,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {metrics.map((m, i) => (
            <div key={m.label} className={`${i > 0 ? 'lg:border-l lg:border-white/[0.06] lg:pl-8' : ''}`}>
              <div className="stat-number text-brand-green" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                {m.val}
              </div>
              <div className="text-white/70 text-sm mt-1">{m.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Quote — full width, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <Quote size={32} className="text-brand-green/40 mx-auto mb-6" />
          <p className="text-white/80 text-xl lg:text-2xl italic leading-relaxed mb-4">
            "Radiant's AI Fabric didn't just automate tasks — it fundamentally changed how our operations team works."
          </p>
          <span className="text-white/60 text-sm">— Operations Director, Verizon Enterprise</span>
        </motion.div>

        {/* Visual — stat card centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0D0B09 0%, #1a2a1e 30%, #2a4a30 60%, #91C46B 100%)',
            }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450"
              preserveAspectRatio="xMidYMid slice" fill="none">
              <path d="M-30 300 Q130 100 350 220 Q550 340 830 140"
                stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d="M-30 350 Q150 150 400 280 Q600 410 850 200"
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <ellipse cx="600" cy="100" rx="200" ry="200" fill="rgba(255,255,255,0.03)" />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="stat-number text-white" style={{ fontSize: 'clamp(8rem, 20vw, 14rem)' }}>
                10K
              </div>
              <div className="text-white/70 font-sans text-sm mt-2 tracking-wide">
                Hours Saved
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video section — full-width colorful background */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative"
      >
        {/* Colorful abstract background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(10,5,32,0.95) 0%, rgba(5,15,30,0.95) 40%, rgba(8,20,15,0.95) 100%)' }} />

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

          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 5%, #91C46B 20%, #F0974E 40%, #596AE0 60%, #a855f7 80%, transparent 95%)', opacity: 0.35 }} />
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 5%, #a855f7 20%, #596AE0 40%, #F0974E 60%, #91C46B 80%, transparent 95%)', opacity: 0.25 }} />
        </div>

        {/* Video container */}
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
          <div className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 80px rgba(89,106,224,0.08), 0 0 40px rgba(145,196,107,0.06)' }}>
            <div className="aspect-video flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #000a14 0%, #050818 50%, #0a0510 100%)' }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 35% 40%, rgba(145,196,107,0.1) 0%, transparent 50%), radial-gradient(ellipse at 65% 60%, rgba(89,106,224,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(240,151,78,0.06) 0%, transparent 50%)' }} />

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

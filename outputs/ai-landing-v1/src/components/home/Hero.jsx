import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const heroMetrics = [
  { val: '247', label: 'AI Models Deployed', color: 'text-brand-green' },
  { val: '98.4%', label: 'Avg Model Accuracy', color: 'text-brand-orange' },
  { val: '99.9%', label: 'Platform Uptime SLA', color: 'text-brand-green' },
  { val: '10K+', label: 'Man-Hours Saved', color: 'text-brand-orange' },
  { val: '6 wks', label: 'Time to Deploy', color: 'text-brand-purple' },
]

/* ── Abstract animated background ── */
function AbstractBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base dark-to-deep gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #010F1E 0%, #020a1a 30%, #0a0520 60%, #050d1e 100%)' }} />

      {/* Large color orbs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[15%] -left-[5%] w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(145,196,107,0.18) 0%, rgba(145,196,107,0.04) 40%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ x: [0, -25, 35, 0], y: [0, 30, -25, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] right-[-8%] w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(240,151,78,0.16) 0%, rgba(240,80,48,0.06) 40%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[5%] left-[20%] w-[550px] h-[550px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(89,106,224,0.14) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)', filter: 'blur(55px)' }}
      />
      <motion.div
        animate={{ x: [0, -20, 15, 0], y: [0, 25, -35, 0], scale: [1, 1.1, 0.92, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,200,125,0.12) 0%, rgba(145,196,107,0.04) 40%, transparent 70%)', filter: 'blur(45px)' }}
      />

      {/* Small accent orbs */}
      <motion.div
        animate={{ y: [0, -60, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[35%] left-[45%] w-[200px] h-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(240,151,78,0.12) 0%, transparent 60%)', filter: 'blur(30px)' }}
      />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[55%] w-[180px] h-[180px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 60%)', filter: 'blur(25px)' }}
      />

      {/* Diagonal accent lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <motion.path d="M-100 600 Q300 200 700 450 Q1100 700 1600 250"
          stroke="url(#line1)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
        />
        <motion.path d="M-100 750 Q400 350 800 550 Q1200 750 1600 400"
          stroke="url(#line2)" strokeWidth="1" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.8, ease: 'easeOut' }}
        />
        <motion.path d="M-100 200 Q250 50 600 300 Q950 550 1600 100"
          stroke="url(#line3)" strokeWidth="0.8" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1.1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="line1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#91C46B" />
            <stop offset="50%" stopColor="#F0974E" />
            <stop offset="100%" stopColor="#596AE0" />
          </linearGradient>
          <linearGradient id="line2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#596AE0" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#00c87d" />
          </linearGradient>
          <linearGradient id="line3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F0974E" />
            <stop offset="100%" stopColor="#91C46B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      {[
        { x: '12%', y: '20%', size: 4, color: '#91C46B', delay: 0 },
        { x: '78%', y: '15%', size: 3, color: '#F0974E', delay: 1.2 },
        { x: '65%', y: '70%', size: 5, color: '#596AE0', delay: 0.6 },
        { x: '25%', y: '75%', size: 3, color: '#a855f7', delay: 1.8 },
        { x: '88%', y: '45%', size: 4, color: '#00c87d', delay: 0.3 },
        { x: '42%', y: '85%', size: 3, color: '#91C46B', delay: 2.1 },
        { x: '55%', y: '25%', size: 3, color: '#F0974E', delay: 1.5 },
        { x: '8%', y: '55%', size: 4, color: '#596AE0', delay: 0.9 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Top-edge color bleed */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 5%, #91C46B 25%, #F0974E 50%, #596AE0 75%, transparent 95%)', opacity: 0.3 }} />
    </div>
  )
}

/* ── Dashboard mockup ── */
const DashboardMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="w-full"
  >
    <div className="relative rounded-2xl p-5 shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl"
      style={{ background: 'rgba(5,10,25,0.75)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Multi-color glow */}
      <div className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(145,196,107,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(89,106,224,0.08) 0%, transparent 50%)' }} />

      {/* Window bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-display text-[0.7rem] font-semibold text-text-muted ml-2">AI Platform · Live</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse2" />
          <span className="text-brand-green font-display text-[0.6rem] font-semibold">LIVE</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { val: '247', label: 'Models', note: '↑12 today', c: 'text-brand-green', bg: 'rgba(145,196,107,0.06)', bc: 'rgba(145,196,107,0.15)' },
          { val: '98.4%', label: 'Accuracy', note: '↑0.3%', c: 'text-brand-orange', bg: 'rgba(240,151,78,0.06)', bc: 'rgba(240,151,78,0.15)' },
          { val: '99.9%', label: 'Uptime', note: 'SLA Met', c: 'text-[#596AE0]', bg: 'rgba(89,106,224,0.06)', bc: 'rgba(89,106,224,0.15)' },
        ].map(k => (
          <div key={k.label} className="rounded-xl p-3 text-center"
            style={{ background: k.bg, border: `1px solid ${k.bc}` }}>
            <div className={`font-display text-xl font-black leading-none ${k.c}`}>{k.val}</div>
            <div className="text-[0.58rem] text-text-muted mt-1">{k.label}</div>
            <div className={`text-[0.55rem] mt-0.5 ${k.c} opacity-70`}>{k.note}</div>
          </div>
        ))}
      </div>

      {/* Chart with colorful bars */}
      <div className="rounded-xl px-3 pt-3 pb-2 mb-3 h-[72px] flex items-end gap-1"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { h: 30, c: 'rgba(89,106,224,0.4)' },
          { h: 48, c: 'rgba(89,106,224,0.5)' },
          { h: 38, c: 'rgba(168,85,247,0.5)' },
          { h: 65, c: 'rgba(168,85,247,0.6)' },
          { h: 52, c: 'rgba(240,151,78,0.5)' },
          { h: 78, c: 'rgba(240,151,78,0.6)' },
          { h: 60, c: 'rgba(145,196,107,0.5)' },
          { h: 92, c: 'rgba(145,196,107,0.7)' },
          { h: 71, c: 'rgba(0,200,125,0.6)' },
          { h: 100, c: '#91C46B' },
          { h: 83, c: 'rgba(145,196,107,0.8)' },
        ].map((b, i) => (
          <div key={i} style={{ height: `${b.h}%`, background: b.c }} className="flex-1 rounded-sm" />
        ))}
      </div>

      {/* Alert feed */}
      <div className="space-y-1.5">
        {[
          { dot: 'bg-brand-green', label: 'NLP Pipeline · 2.4M requests processed' },
          { dot: 'bg-[#596AE0]', label: 'AI Fabric · 43% ops efficiency gain' },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.68rem] text-text-secondary"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
            {a.label}
          </div>
        ))}
      </div>

      {/* Float badges */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="rounded-xl p-3 text-center"
          style={{ background: 'rgba(145,196,107,0.08)', border: '1px solid rgba(145,196,107,0.2)' }}>
          <div className="font-display text-lg font-black text-brand-green">10,247</div>
          <div className="text-[0.58rem] text-text-muted mt-0.5">Man-hours saved</div>
        </div>
        <div className="rounded-xl p-3 text-center"
          style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
          <div className="font-display text-lg font-black text-[#a855f7]">6 wks</div>
          <div className="text-[0.58rem] text-text-muted mt-0.5">vs 6 months</div>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Abstract colorful background */}
      <AbstractBg />

      {/* Main content */}
      <div className="relative flex-1 flex items-center pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-[1fr_460px] lg:grid-cols-[1fr_520px] gap-14 lg:gap-20 items-center">
            {/* Left – headline */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="kicker inline-flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-orange" />
                  Enterprise AI Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black leading-[0.92] mb-7 tracking-tight"
                style={{ fontSize: 'clamp(3.8rem, 7.5vw, 7rem)' }}
              >
                Deploy AI<br />
                in{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #91C46B 0%, #F0974E 35%, #596AE0 70%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>6 Weeks.</span>
                <br />
                <span className="text-text-muted" style={{ fontSize: '55%', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                  Not 6 months.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-text-secondary text-lg leading-relaxed max-w-[440px] mb-9"
              >
                Radiant delivers enterprise-grade AI solutions built for scalability, compliance, and measurable impact — from day one.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <a href="#solutions" className="btn-primary text-sm relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Enterprise <ArrowRight size={15} />
                  </span>
                </a>
                <a href="#contact" className="btn-ghost text-sm">Book a Demo</a>
              </motion.div>

              {/* Trust line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {[
                    { init: 'LM', bg: 'rgba(145,196,107,0.15)', bc: 'rgba(145,196,107,0.3)', c: '#91C46B' },
                    { init: 'B', bg: 'rgba(240,151,78,0.15)', bc: 'rgba(240,151,78,0.3)', c: '#F0974E' },
                    { init: 'V', bg: 'rgba(89,106,224,0.15)', bc: 'rgba(89,106,224,0.3)', c: '#596AE0' },
                    { init: 'WF', bg: 'rgba(168,85,247,0.15)', bc: 'rgba(168,85,247,0.3)', c: '#a855f7' },
                  ].map((a, i) => (
                    <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-[0.55rem]"
                      style={{ background: a.bg, border: `2px solid ${a.bc}`, color: a.c }}>
                      {a.init}
                    </div>
                  ))}
                </div>
                <span className="text-text-muted text-xs">Trusted by Lockheed Martin, Boeing, Verizon & more</span>
              </motion.div>
            </div>

            {/* Right – dashboard */}
            <DashboardMockup />
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

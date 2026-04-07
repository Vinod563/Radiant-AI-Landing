import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const heroMetrics = [
  { val: '94.2', label: 'CSAT Score',       color: 'text-brand-green' },
  { val: '+41%', label: 'Resolution Rate',  color: 'text-brand-orange' },
  { val: '2.1s', label: 'Avg Response',     color: 'text-brand-green' },
  { val: '+18',  label: 'NPS Improvement',  color: 'text-brand-orange' },
  { val: '3.4×', label: 'Avg ROI',          color: 'text-brand-purple' },
]

const LiveDashboard = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="relative bg-brand-secondary/70 border border-brand-green/15 rounded-2xl p-5 shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm">
      <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.08) 0%, transparent 60%)' }} />

      {/* Window bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-display text-[0.7rem] font-semibold text-text-muted ml-2">ICX AI · Live</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse2" />
          <span className="text-brand-green font-display text-[0.6rem] font-semibold">LIVE</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { val: '94.2', label: 'CSAT', c: 'text-brand-green' },
          { val: '+41%', label: 'Resolution', c: 'text-brand-green' },
          { val: '2.1s', label: 'Response', c: 'text-brand-orange' },
        ].map(k => (
          <div key={k.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
            <div className={`font-display text-xl font-black leading-none ${k.c}`}>{k.val}</div>
            <div className="text-[0.58rem] text-text-muted mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-3 pt-3 pb-2 mb-3 h-[72px] flex items-end gap-1">
        {[35, 55, 42, 70, 52, 88, 65, 100].map((h, i) => (
          <div key={i} style={{ height: `${h}%` }}
            className={`flex-1 rounded-sm ${i >= 6 ? 'bg-brand-green' : i >= 4 ? 'bg-brand-green/40' : 'bg-brand-green/18'}`} />
        ))}
      </div>

      {/* Alerts */}
      <div className="space-y-1.5">
        {[
          { dot: 'bg-brand-green',  text: 'NPS improved +18 pts this quarter' },
          { dot: 'bg-brand-orange', text: 'Root-cause: checkout friction detected' },
          { dot: 'bg-brand-purple', text: 'Workflow automation: 1,240 tickets resolved' },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[0.68rem] text-text-secondary">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
            {a.text}
          </div>
        ))}
      </div>

      {/* Metric badges */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-brand-green/10 border border-brand-green/25 rounded-xl p-3 text-center">
          <div className="font-display text-lg font-black text-brand-green">66%</div>
          <div className="text-[0.58rem] text-text-muted mt-0.5">CSAT improvement</div>
        </div>
        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-3 text-center">
          <div className="font-display text-lg font-black text-brand-orange">3.4×</div>
          <div className="text-[0.58rem] text-text-muted mt-0.5">Average ROI</div>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function ICXHero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(145,196,107,0.07) 0%, transparent 65%)', transform: 'translate(-50%,-30%)' }} />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(240,151,78,0.06) 0%, transparent 65%)', transform: 'translate(30%,0)' }} />

      {/* Main content */}
      <div className="flex-1 flex items-center pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-text-muted font-display mb-10"
          >
            <a href="/" className="hover:text-brand-green transition-colors no-underline">Home</a>
            <span className="opacity-40">/</span>
            <span>AI Solutions</span>
            <span className="opacity-40">/</span>
            <span className="text-brand-green">ICX AI</span>
          </motion.nav>

          <div className="grid md:grid-cols-[1fr_460px] lg:grid-cols-[1fr_520px] gap-14 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/[0.06] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse2" />
                  <span className="text-brand-green font-display text-[0.68rem] font-semibold tracking-widest uppercase">Enterprise Solution</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black leading-[0.92] mb-4 tracking-tight"
                style={{ fontSize: 'clamp(3.8rem, 7.5vw, 7rem)' }}
              >
                One Platform.<br />
                <span className="grad-text">Total CX</span><br />
                Clarity.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-text-secondary text-lg leading-relaxed max-w-[440px] mb-9"
              >
                ICX AI unifies every customer signal into one AI-driven intelligence layer — giving your teams the predictive power to act before issues become crises.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#contact" className="btn-primary text-sm">Book a Demo <ArrowRight size={15} /></a>
                <a href="#platform" className="btn-ghost text-sm">Learn More</a>
              </motion.div>
            </div>

            {/* Right */}
            <LiveDashboard />
          </div>
        </div>
      </div>

      {/* Bottom metric strip */}
      <div className="border-t border-white/[0.07] bg-brand-secondary/30 backdrop-blur-sm">
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

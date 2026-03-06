import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, BarChart3, Layers, Brain, ShieldAlert, Rocket, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const solutions = [
  {
    num: '01',
    title: 'Enterprise ICX',
    desc: 'Unify every CX signal into one predictive platform with real-time insights. Predict customer behavior, optimize journeys, and drive measurable outcomes across every touchpoint.',
    gradient: 'linear-gradient(160deg, #0a1a0e 0%, #1a3a22 40%, #4a8a3a 80%, #91C46B 100%)',
    icon: BarChart3,
    href: '/icx-solution',
    screenshot: '/screenshots/enterprise-icx.png',
  },
  {
    num: '02',
    title: 'CX Workbench',
    desc: 'Coordinate every team and workflow from a single orchestration canvas. Streamline collaboration, automate handoffs, and maintain full visibility across your CX operations.',
    gradient: 'linear-gradient(160deg, #1a0c00 0%, #4a2200 40%, #8a4a10 80%, #F0974E 100%)',
    icon: Layers,
    href: '#',
    screenshot: '/screenshots/cx-workbench.png',
  },
  {
    num: '03',
    title: 'AI Fabric',
    desc: 'Enterprise AI operating layer connecting people, processes, and systems. A unified intelligence mesh that scales across departments and adapts to your organization.',
    gradient: 'linear-gradient(160deg, #06082a 0%, #0e1458 40%, #2a3aa0 80%, #596AE0 100%)',
    icon: Brain,
    href: '#',
    screenshot: '/screenshots/ai-fabric.png',
  },
  {
    num: '04',
    title: 'Anomaly Detection',
    desc: 'Real-time monitoring and fraud detection that flags threats before impact. Protect revenue streams and maintain trust with AI-powered pattern recognition.',
    gradient: 'linear-gradient(160deg, #1a0400 0%, #4a1000 40%, #8a2a10 80%, #F05030 100%)',
    icon: ShieldAlert,
    href: '#',
    screenshot: '/screenshots/anomaly-detection.png',
  },
  {
    num: '05',
    title: 'Rapid AI',
    desc: 'Proof-of-concept to production in 6 weeks with pre-built templates. Accelerate your AI journey with battle-tested frameworks and rapid deployment pipelines.',
    gradient: 'linear-gradient(160deg, #001a10 0%, #004028 40%, #008050 80%, #00c87d 100%)',
    icon: Rocket,
    href: '#',
    screenshot: null,
  },
  {
    num: '06',
    title: 'DocuFlow',
    desc: '99.2% extraction accuracy. Contracts, invoices, reports — automated. Transform unstructured documents into actionable data with intelligent processing.',
    gradient: 'linear-gradient(160deg, #0a0020 0%, #1a0048 40%, #4010a0 80%, #a855f7 100%)',
    icon: FileText,
    href: '#',
    screenshot: null,
  },
]

export default function Solutions() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="solutions" className="bg-mag-black">
      {/* Section header — full viewport */}
      <div className="min-h-screen flex items-center bg-brand-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="label">Built on Radiant</span>
            <h2 className="font-heading font-extrabold text-display text-white mb-6">
              Six AI Solutions.<br />
              <span className="text-brand-green">One Platform.</span>
            </h2>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-xl">
              Each purpose-built for a specific enterprise challenge — sharing one secure, modular AI foundation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-screen solution cards */}
      {solutions.map((s) => (
        <SolutionSlide key={s.num} s={s} />
      ))}
    </section>
  )
}

function SolutionSlide({ s }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const Icon = s.icon

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: s.gradient }}
    >
      {/* Ambient wave decoration */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M-100 700 Q400 300 800 550 Q1200 800 1600 400 Q1800 250 2020 350"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="2"
        />
        <path
          d="M-100 800 Q500 400 900 650 Q1300 900 1700 500 Q1900 350 2100 450"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 w-full relative z-10 py-20 lg:py-0">
        <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-[5fr_7fr]">
          {/* Text side — always left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Number badge */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/50 font-mono text-sm tracking-widest">{s.num}</span>
              <div className="h-px w-12 bg-white/20" />
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
              <Icon size={28} className="text-white" />
            </div>

            {/* Title */}
            <h3 className="font-heading font-extrabold text-title text-white mb-6">
              {s.title}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
              {s.desc}
            </p>

            {/* CTA */}
            {s.href !== '#' ? (
              <Link
                to={s.href}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                  bg-white text-mag-black font-semibold text-base no-underline
                  hover:bg-brand-green hover:text-white transition-all duration-300 group"
              >
                View Solution
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                border border-white/20 text-white/50 text-sm font-medium uppercase tracking-widest">
                Coming Soon
              </span>
            )}
          </motion.div>

          {/* Screenshot / Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:scale-110 lg:origin-center"
          >
            {s.screenshot ? (
              <div className="relative group">
                {/* Glow behind screenshot */}
                <div
                  className="absolute -inset-6 rounded-3xl opacity-50 blur-[60px]"
                  style={{ background: s.gradient }}
                />
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10
                  shadow-[0_40px_100px_rgba(0,0,0,0.6)] group-hover:border-white/20 transition-colors duration-500">
                  <img
                    src={s.screenshot}
                    alt={`${s.title} platform screenshot`}
                    className="absolute inset-0 w-full h-full object-cover object-left-top block"
                    loading="lazy"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              </div>
            ) : (
              /* Fallback visual for solutions without screenshots */
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10
                shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0" style={{ background: s.gradient }} />
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 500"
                  preserveAspectRatio="xMidYMid slice"
                  fill="none"
                >
                  <path
                    d="M-50 340 Q200 140 400 280 Q600 420 850 200"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                  />
                  <path
                    d="M-50 400 Q250 200 450 340 Q650 480 900 260"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Icon size={44} className="text-white/80" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

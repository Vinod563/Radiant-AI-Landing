import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, BarChart3, Layers, Brain, ShieldAlert, Rocket, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const solutions = [
  {
    num: '01', title: 'Enterprise ICX',
    label: 'CX Intelligence',
    accent: '#91C46B',
    bg: '#032d14',
    gradient: 'linear-gradient(180deg, #010F1E 0%, #021a0c 15%, #032d14 35%, #065c22 55%, #39d353 75%, #065c22 90%, #010F1E 100%)',
    screenshotGradient: 'linear-gradient(145deg, #021a0c 0%, #043d18 50%, #0a6b2a 100%)',
    screenshot: '/screenshots/enterprise-icx.png',
    desc: 'AI-powered CX insight-to-ROI platform that unifies data to proactively eliminate experience friction — turning customer signals into measurable business outcomes.',
    tags: ['Enterprise', 'CX', 'Insight-to-ROI'],
    href: '/icx-solution', featured: true,
    icon: BarChart3,
    details: [
      'Unified data platform across all CX touchpoints',
      'Proactive friction detection & elimination',
      'Insight-to-ROI pipeline with measurable outcomes',
      'Real-time experience monitoring & alerting',
    ],
  },
  {
    num: '02', title: 'CX Workbench',
    label: 'Journey Intelligence',
    accent: '#F0974E',
    bg: '#2d1200',
    gradient: 'linear-gradient(180deg, #010F1E 0%, #0f0800 15%, #2d1200 35%, #6b2d00 55%, #f0974e 75%, #6b2d00 90%, #010F1E 100%)',
    screenshotGradient: 'linear-gradient(145deg, #1a0a00 0%, #3d1e00 50%, #7a3800 100%)',
    screenshot: '/screenshots/cx-workbench.png',
    desc: 'AI-powered workflow tool that accelerates manual tagging of customer interactions on digital channels using Figma screen analysis and business rules — enabling teams to visualize customer journeys and understand experience details.',
    tags: ['Workflow', 'Figma Analysis', 'Journey Mapping'],
    href: '#',
    icon: Layers,
    details: [
      'AI-accelerated interaction tagging on digital channels',
      'Figma screen analysis with business rule engine',
      'Customer journey visualization & mapping',
      'Experience detail extraction & pattern recognition',
    ],
  },
  {
    num: '03', title: 'AI Billing Workbench',
    label: 'Billing Intelligence',
    accent: '#596AE0',
    bg: '#080d2e',
    gradient: 'linear-gradient(180deg, #010F1E 0%, #030818 15%, #080d2e 35%, #131a5c 55%, #596ae0 75%, #131a5c 90%, #010F1E 100%)',
    screenshotGradient: 'linear-gradient(145deg, #050818 0%, #0c1040 50%, #1a2270 100%)',
    screenshot: '/screenshots/ai-fabric.png',
    desc: 'AI-powered platform that detects billing anomalies, groups them into patterns, and guides teams to resolve issues before they impact customers — protecting revenue and trust at scale.',
    tags: ['Billing', 'Anomaly Detection', 'Resolution'],
    href: '#',
    icon: ShieldAlert,
    details: [
      'Real-time billing anomaly detection engine',
      'Intelligent pattern grouping & classification',
      'Guided resolution workflows for support teams',
      'Proactive issue resolution before customer impact',
    ],
  },
  {
    num: '04', title: 'Magic Globe',
    label: 'Launch Intelligence',
    accent: '#F05030',
    bg: '#2d0800',
    gradient: 'linear-gradient(180deg, #010F1E 0%, #0f0400 15%, #2d0800 35%, #5c1400 55%, #f05030 75%, #5c1400 90%, #010F1E 100%)',
    screenshotGradient: 'linear-gradient(145deg, #180400 0%, #3d0e00 50%, #6b1a00 100%)',
    screenshot: '/screenshots/anomaly-detection.png',
    desc: 'AI-powered platform that integrates sales, returns, quality, and customer data to predict device launch risk, identify root causes, and provide go/no-go recommendations before and after launch.',
    tags: ['Launch Risk', 'Predictive', 'Go/No-Go'],
    href: '#',
    icon: Rocket,
    details: [
      'Integrated sales, returns, quality & customer data',
      'Device launch risk prediction & scoring',
      'AI-driven root cause identification',
      'Go/no-go recommendations pre & post launch',
    ],
  },
  {
    num: '05', title: 'BI Fabric',
    label: 'Analytics Platform',
    accent: '#00c87d',
    bg: '#00261a',
    gradient: 'linear-gradient(180deg, #010F1E 0%, #000f0a 15%, #00261a 35%, #004d2e 55%, #00c87d 75%, #004d2e 90%, #010F1E 100%)',
    screenshotGradient: 'linear-gradient(145deg, #001208 0%, #003020 50%, #005838 100%)',
    desc: 'Centralized analytics and reporting solution that connects data sources into a governed environment — enabling faster, data-driven decision-making across the enterprise.',
    tags: ['Analytics', 'BI', 'Data Governance'],
    href: '#',
    icon: Brain,
    details: [
      'Centralized data source connectivity & unification',
      'Governed analytics environment with access controls',
      'Self-service reporting & dashboard builder',
      'Faster data-driven decision-making at every level',
    ],
  },
  {
    num: '06', title: 'Automarc',
    label: 'Document Intelligence',
    accent: '#a855f7',
    bg: '#100030',
    gradient: 'linear-gradient(180deg, #010F1E 0%, #060014 15%, #100030 35%, #220060 55%, #7030d0 75%, #220060 90%, #010F1E 100%)',
    screenshotGradient: 'linear-gradient(145deg, #080014 0%, #160038 50%, #2a0068 100%)',
    desc: 'AI-powered document workflow automation that extracts, classifies, and processes content to reduce manual effort and improve accuracy — formerly DocuFlow, now purpose-built for technical writing at scale.',
    tags: ['Documents', 'Automation', 'Technical Writing'],
    href: '#',
    icon: FileText,
    details: [
      'AI-powered content extraction & classification',
      'Automated document processing workflows',
      'Technical writing acceleration & consistency',
      'Reduced manual effort with improved accuracy',
    ],
  },
]

/* ─────────────────────────────────────────────
   Floating Screenshot — real image or generated mockup
   ───────────────────────────────────────────── */
function FloatingScreenshot({ solution, isHovered }) {
  const Icon = solution.icon
  const hasRealScreenshot = !!solution.screenshot

  return (
    <motion.div
      className="relative"
      style={{ perspective: '1400px' }}
      animate={{ y: isHovered ? -16 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      {/* Ground shadow — elliptical glow beneath */}
      <motion.div
        className="absolute -bottom-8 left-[6%] right-[6%] h-20 rounded-[50%] z-0"
        style={{
          background: `radial-gradient(ellipse, ${solution.accent}20 0%, transparent 70%)`,
          filter: 'blur(24px)',
        }}
        animate={{
          scaleX: isHovered ? 0.82 : 0.95,
          opacity: isHovered ? 0.4 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />

      {/* Main panel */}
      <motion.div
        className="relative rounded-2xl lg:rounded-3xl overflow-hidden z-10"
        style={{
          aspectRatio: hasRealScreenshot ? '16/9' : '16/10',
          background: hasRealScreenshot ? '#0a0a0a' : solution.screenshotGradient,
          boxShadow: `
            0 60px 120px rgba(0,0,0,0.6),
            0 30px 60px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.08),
            0 0 80px ${solution.accent}0a
          `,
        }}
        animate={{
          rotateX: isHovered ? -1.5 : 1,
          rotateY: isHovered ? 1 : 0,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        {/* ── Real screenshot with light/dark mode toggle ── */}
        {hasRealScreenshot && (
          <>
            {/* Light mode (default) */}
            <img
              src={solution.screenshot}
              alt={solution.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out"
              style={{ opacity: isHovered ? 0 : 1 }}
            />
            {/* Dark mode (on hover) — CSS filter simulated */}
            <img
              src={solution.screenshot}
              alt={`${solution.title} dark mode`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out"
              style={{
                opacity: isHovered ? 1 : 0,
                filter: 'invert(0.88) hue-rotate(180deg) contrast(1.05) brightness(0.95)',
              }}
            />
            {/* Accent tint overlay for dark mode */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                background: `linear-gradient(135deg, ${solution.accent}12 0%, transparent 60%)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
            {/* Light mode subtle tint */}
            <div className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-opacity duration-700"
              style={{ background: solution.accent, opacity: isHovered ? 0 : 0.1 }} />
          </>
        )}

        {/* ── Generated mockup fallback ── */}
        {!hasRealScreenshot && (
          <>
            {/* Wave decoration */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500"
              preserveAspectRatio="xMidYMid slice" fill="none">
              <motion.path d="M-60 340 Q200 120 420 280 Q640 440 880 180"
                stroke="white" strokeWidth="2" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.12 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
              <motion.path d="M-60 420 Q240 200 440 360 Q640 520 880 260"
                stroke="white" strokeWidth="1.2" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.08 }}
                viewport={{ once: true }}
                transition={{ duration: 2.8, delay: 0.3, ease: 'easeInOut' }}
              />
              <ellipse cx="680" cy="90" rx="200" ry="120" fill="rgba(255,255,255,0.03)" />
            </svg>

            {/* Dashboard UI */}
            <div className="absolute inset-0 p-5 sm:p-7 lg:p-9 flex flex-col justify-between">
              {/* Browser chrome */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                </div>
                <div className="flex-1 h-6 rounded-full mx-3"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full flex items-center px-4">
                    <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      radiant.ai/{solution.title.toLowerCase().replace(/\s/g, '-')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 mt-5 flex gap-4">
                <div className="hidden md:flex w-14 flex-col gap-3 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i}
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: i === 0 ? `${solution.accent}25` : 'rgba(255,255,255,0.03)' }}
                      animate={isHovered ? { x: [0, 3, 0], opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 1.8, delay: i * 0.12, repeat: Infinity }}
                    >
                      <div className="w-3.5 h-3.5 rounded-sm"
                        style={{ background: i === 0 ? solution.accent : 'rgba(255,255,255,0.1)' }} />
                    </motion.div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex gap-3">
                    {[
                      { label: 'Active', value: '2.4K', change: '+12%' },
                      { label: 'Score', value: '94.2', change: '+3.1' },
                      { label: 'Alerts', value: '7', change: '-28%' },
                    ].map((stat, i) => (
                      <motion.div key={i} className="flex-1 rounded-xl p-3"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
                        animate={isHovered ? { y: [0, -2, 0] } : {}}
                        transition={{ duration: 2.5, delay: i * 0.25, repeat: Infinity }}
                      >
                        <div className="text-[8px] font-mono mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{stat.label}</div>
                        <div className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.value}</div>
                        <div className="text-[8px] font-mono mt-0.5" style={{ color: solution.accent }}>{stat.change}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex-1 rounded-xl relative overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="absolute bottom-0 inset-x-0 flex items-end justify-around px-4 pb-3 pt-8 gap-1">
                      {[65, 45, 80, 55, 90, 70, 85, 60, 95, 40, 75, 88].map((h, i) => (
                        <motion.div key={i}
                          className="flex-1 rounded-t-sm min-w-[4px]"
                          style={{ background: `${solution.accent}${i % 3 === 0 ? '55' : '25'}` }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <motion.polyline
                        points="5,60 15,40 25,50 35,25 45,35 55,15 65,20 75,30 85,10 95,18"
                        fill="none" stroke={solution.accent} strokeWidth="1.5" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.4 }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between mt-3 px-1">
                <div className="flex items-center gap-2">
                  <motion.div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: solution.accent }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Live • {solution.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon size={11} style={{ color: `${solution.accent}70` }} />
                  <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    Radiant AI
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Shimmer on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${solution.accent}0c 50%, transparent 60%)`,
          }}
          animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />

        {/* Top highlight edge */}
        <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${solution.accent}25, transparent)` }} />

        {/* Bottom vignette */}
        <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }} />
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Full-Width Solution Block
   ───────────────────────────────────────────── */
function SolutionBlock({ s }) {
  const [hovered, setHovered] = useState(false)
  const blockRef = useRef(null)
  const inView = useInView(blockRef, { once: true, margin: '-100px' })
  const Icon = s.icon

  return (
    <motion.div
      ref={blockRef}
      className="relative w-full"
      style={{ minHeight: '100vh' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full-bleed gradient background */}
      <div className="absolute inset-0" style={{ background: s.gradient }}>
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        {/* Giant editorial number in background */}
        <motion.div
          className="absolute select-none pointer-events-none font-display font-black"
          style={{
            fontSize: 'clamp(20rem, 35vw, 40rem)',
            lineHeight: 0.8,
            right: '-5%',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255,255,255,0.015)',
            letterSpacing: '-0.05em',
          }}
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {s.num}
        </motion.div>

      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-6 lg:px-8 py-24 lg:py-32"
        style={{ minHeight: '100vh' }}>

        <div className="max-w-7xl mx-auto w-full">

          {/* Top row: label + number + tags */}
          <motion.div
            className="flex items-center gap-4 mb-8 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: `${s.accent}12`,
                border: `1px solid ${s.accent}30`,
              }}
              animate={hovered ? { scale: 1.1, rotate: 4 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon size={20} style={{ color: s.accent }} />
            </motion.div>
            <span className="font-display font-black text-4xl leading-none select-none"
              style={{ color: s.accent, opacity: 0.3 }}>
              {s.num}
            </span>
            <div className="h-px flex-1" style={{ background: `${s.accent}18` }} />
            <span className="text-[0.65rem] font-display font-semibold uppercase tracking-[0.18em]"
              style={{ color: s.accent }}>
              {s.label}
            </span>
            {s.featured && (
              <span className="text-[0.6rem] font-semibold px-3 py-1 rounded-full"
                style={{ background: `${s.accent}15`, color: s.accent, border: `1px solid ${s.accent}30` }}>
                Featured
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="font-display font-black text-white leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            {s.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-text-secondary leading-relaxed mb-8 max-w-2xl"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
          >
            {s.desc}
          </motion.p>

          {/* Tags + CTA row */}
          <motion.div
            className="flex items-center gap-3 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {s.tags.map(t => (
              <motion.span key={t}
                className="text-[0.65rem] font-display font-semibold uppercase tracking-wide px-3.5 py-1.5 rounded-full"
                style={{
                  background: `${s.accent}0c`,
                  color: `${s.accent}cc`,
                  border: `1px solid ${s.accent}18`,
                }}
                whileHover={{ scale: 1.08, background: `${s.accent}1a` }}
              >
                {t}
              </motion.span>
            ))}
            <div className="flex-1" />
            <Link to={s.href !== '#' ? s.href : '#'} className="btn-primary group/link">
              <span>View Solution</span>
              <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
            </Link>
          </motion.div>

          {/* ── THE FLOATING SCREENSHOT ── */}
          <motion.div
            className="w-full max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingScreenshot solution={s} isHovered={hovered} />
          </motion.div>


        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main Solutions Section
   ───────────────────────────────────────────── */
export default function Solutions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="solutions" className="relative overflow-hidden">

      {/* Section header */}
      <div className="bg-brand-dark py-28 lg:py-36 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="kicker" style={{ justifyContent: 'center' }}>Solutions</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
              Six AI Solutions.<br />
              <span className="grad-text">One Unified Platform.</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Each solution is purpose-built for a specific enterprise challenge — yet they all share one secure, modular AI foundation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-width solution blocks stacked */}
      {solutions.map(s => (
        <SolutionBlock key={s.num} s={s} />
      ))}

    </section>
  )
}

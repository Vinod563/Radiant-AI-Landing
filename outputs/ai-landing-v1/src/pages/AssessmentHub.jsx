import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Brain, Sparkles, CheckCircle2, BarChart3, Users, Target, TrendingUp, Shield } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'

// ── Assessment definitions ──────────────────────────────────────────────────

const ASSESSMENTS = [
  {
    key: 'ai',
    route: '/assessment/ai',
    accent: '#91C46B',
    secondaryAccent: '#C7DD75',
    icon: Brain,
    eyebrow: 'AI Adoption Assessment',
    title: 'How AI-ready is your organization?',
    subtitle: 'For executives, technical leaders, and business leads navigating enterprise AI transformation.',
    desc: 'A role-adaptive diagnostic across the four dimensions that determine whether AI delivers value or stays in pilot mode.',
    duration: '10–15 min',
    meta: ['Role-adaptive', '5 stages', '12–16 questions'],
    dimensions: [
      { icon: Target, label: 'Strategy & Leadership', desc: 'Written strategy, executive accountability, investment alignment' },
      { icon: BarChart3, label: 'Data & Technology', desc: 'Data readiness, cloud infrastructure, GenAI governance' },
      { icon: Shield, label: 'People & Governance', desc: 'AI literacy, policy, responsible AI, talent depth' },
      { icon: TrendingUp, label: 'Adoption & Value', desc: 'Production use cases, ROI measurement, scaling capability' },
    ],
    youGet: [
      'Your stage across 5 named maturity levels (Assess → Train → Adopt → Govern → Scale)',
      'Scores across all four dimensions with gap analysis',
      'A positioning view showing where your org sits vs. AI leaders',
      'Stage-specific guidance on what leaders do differently',
      "A gated full report with findings, recommended next steps, and Radiant's read",
    ],
    forWho: ['C-Suite / VP / Director', 'CTO / Data / Engineering leads', 'Ops / Finance / HR / Sales leads', 'External Advisors & Consultants'],
    sampleStage: { index: 3, name: 'Adopt', color: '#91C46B' },
  },
  {
    key: 'cx',
    route: '/assessment/cx',
    accent: '#596AE0',
    secondaryAccent: '#7C8FEB',
    icon: Sparkles,
    eyebrow: 'CX Maturity Assessment',
    title: 'How mature is your customer experience?',
    subtitle: 'For CX, product, and operations leaders who need a clear read on where their CX org stands.',
    desc: 'A 9-question diagnostic across three dimensions that separate CX programs that scale from those that stay fragmented.',
    duration: '3–5 min',
    meta: ['3 dimensions', '9 questions', 'Instant result'],
    dimensions: [
      { icon: Target, label: 'Vision & Strategy', desc: 'CX purpose, strategic alignment, business outcome connection' },
      { icon: BarChart3, label: 'Governance & Metrics', desc: 'Leadership accountability, measurement cadence, feedback loops' },
      { icon: Users, label: 'Culture & Structure', desc: 'Employee empowerment, customer empathy, cross-functional teamwork' },
    ],
    youGet: [
      'Your CX maturity level: Foundational, Developing, or Advanced',
      'Per-dimension scores revealing your strongest and weakest areas',
      'A gated full report with dimension-level blurbs and recommended solution',
      "Radiant's Experience AI recommendation tailored to your level",
      'Relevant Radiant case studies matched to your context',
    ],
    forWho: ['Chief Experience Officers', 'Head of Customer Success / CX', 'Product & Operations Leaders', 'Digital Transformation leads'],
    sampleStage: { index: 2, name: 'Developing', color: '#596AE0' },
  },
]

// ── Component ───────────────────────────────────────────────────────────────

export default function AssessmentHub() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <main className="pt-32 pb-28 lg:pt-40 lg:pb-36 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.06) 0%, transparent 55%)' }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <motion.span
              className="kicker justify-center"
              initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
              Free Assessments
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-white leading-[0.95] tracking-tight mt-4 mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
              Know exactly <span className="grad-text">where you stand.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-text-secondary text-lg leading-relaxed">
              Two self-serve diagnostics built for enterprise leaders. No signup. Get a clear read on your
              maturity, your biggest gaps, and the specific moves that produce results fastest.
            </motion.p>

            {/* Distinction callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-full text-xs text-text-muted"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ color: '#91C46B' }}>● AI Adoption</span>
              <span className="text-white/20">|</span>
              <span style={{ color: '#596AE0' }}>● CX Maturity</span>
              <span className="text-white/20">|</span>
              <span>Two different questions. One platform.</span>
            </motion.div>
          </div>

          {/* Assessment cards */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {ASSESSMENTS.map((a, i) => (
              <AssessmentCard key={a.key} assessment={a} delay={0.15 + i * 0.1} />
            ))}
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-12 text-center">
            <p className="text-text-muted text-sm">
              Not sure which to take?{' '}
              <Link to="/chat?q=Which assessment should I take - AI Adoption or CX Maturity?"
                className="text-brand-green hover:underline font-medium no-underline">
                Ask us →
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ── AssessmentCard ──────────────────────────────────────────────────────────

function AssessmentCard({ assessment: a, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = a.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-3xl overflow-hidden relative group"
      style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${a.accent}20` }}>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${a.accent}0e 0%, transparent 65%)` }} />

      {/* Card header */}
      <div className="p-8 lg:p-10 pb-6 relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `${a.accent}18`, border: `1px solid ${a.accent}33` }}>
            <Icon size={26} style={{ color: a.accent }} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={12} />
            <span>{a.duration}</span>
          </div>
        </div>

        <div className="text-[11px] font-display font-bold uppercase tracking-widest mb-2" style={{ color: a.accent }}>
          {a.eyebrow}
        </div>
        <h2 className="font-display font-black text-white text-2xl lg:text-3xl leading-tight tracking-tight mb-3">
          {a.title}
        </h2>
        <p className="text-text-muted text-sm leading-relaxed mb-5">{a.subtitle}</p>

        {/* Meta tags */}
        <div className="flex flex-wrap gap-1.5">
          {a.meta.map(m => (
            <span key={m} className="text-[10px] font-display font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${a.accent}12`, color: a.accent, border: `1px solid ${a.accent}25` }}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-8 lg:mx-10" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* Dimensions */}
      <div className="px-8 lg:px-10 py-5 relative z-10">
        <div className="text-[10px] font-display font-bold uppercase tracking-widest text-text-muted mb-3">
          What we measure
        </div>
        <div className="space-y-2.5">
          {a.dimensions.map(d => {
            const DIcon = d.icon
            return (
              <div key={d.label} className="flex items-start gap-2.5">
                <DIcon size={13} className="mt-0.5 flex-shrink-0" style={{ color: a.accent, opacity: 0.7 }} />
                <div>
                  <span className="text-white text-xs font-semibold">{d.label}</span>
                  <span className="text-text-muted text-xs"> — {d.desc}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-8 lg:mx-10" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* What you get */}
      <div className="px-8 lg:px-10 py-5 relative z-10">
        <div className="text-[10px] font-display font-bold uppercase tracking-widest text-text-muted mb-3">
          What you get
        </div>
        <div className="space-y-2">
          {a.youGet.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: a.accent }} />
              <span className="text-text-secondary text-xs leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Who it's for */}
      <div className="px-8 lg:px-10 py-4 relative z-10">
        <div className="text-[10px] font-display font-bold uppercase tracking-widest text-text-muted mb-2.5">
          Who it's for
        </div>
        <div className="flex flex-wrap gap-1.5">
          {a.forWho.map(w => (
            <span key={w} className="text-[10px] text-text-muted px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-8 lg:px-10 py-6 mt-auto relative z-10">
        <Link to={`${a.route}?start=1`}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-200 no-underline hover:-translate-y-0.5 active:translate-y-0"
          style={{ background: `${a.accent}18`, border: `1px solid ${a.accent}40`, color: a.accent }}>
          Start the {a.key === 'ai' ? 'AI Adoption' : 'CX Maturity'} Assessment
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

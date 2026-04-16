import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, Users, Zap, ChevronRight } from 'lucide-react'
import { useSiteContentContext } from '../../context/SiteContentContext'

const stages = [
  { num: '01', title: 'Discover', color: '#91C46B', bg: 'rgba(145,196,107,0.08)', border: 'rgba(145,196,107,0.25)', items: [{ text: 'Situation', bold: 'S' }, { text: 'Complication', bold: 'C' }, { text: 'Question', bold: 'Q' }], note: 'SCQ Framing' },
  { num: '02', title: 'Structure', color: '#F0974E', bg: 'rgba(240,151,78,0.08)', border: 'rgba(240,151,78,0.25)', items: [{ text: 'Domain Knowledge Base' }, { text: 'Scope' }], note: 'Boundaries Set' },
  { num: '03', title: 'Validate', color: '#596AE0', bg: 'rgba(89,106,224,0.08)', border: 'rgba(89,106,224,0.25)', items: [{ text: 'Proof-of-Value Module' }, { text: 'Stress Tests' }, { text: 'Environment' }], note: 'Accuracy Compounds' },
  { num: '04', title: 'Deploy', color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)', items: [{ text: 'Knowledge Hub' }, { text: 'Semantic Graph' }, { text: 'KAG' }], note: 'Context-Aware AI' },
]

export default function WhatIsRadiantAI() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { content } = useSiteContentContext()
  const wir = content.whatIsRadiant || {}
  const teamItems = wir.teamCard?.items || [
    'Structured problem framing before any solution design begins',
    'Shared knowledge base aligned to your actual environment',
    'Field-tested map so every module after runs faster',
  ]
  const agentItems = wir.agentCard?.items || [
    'Scoped vocabulary and domain rules so outputs are accurate from run one',
    'Scope boundaries that prevent well-intentioned errors downstream',
    'Validated context that compounds accuracy at scale',
  ]
  const outcome = wir.outcome || {}

  return (
    <section id="differentiator" className="py-32 bg-brand-dark relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(145,196,107,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="text-brand-green font-body text-sm font-semibold tracking-widest uppercase mb-5">
            {wir.kicker || 'Why Radiant Digital'}
          </p>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
            {(wir.headline || 'Every AI firm brings models.\nOnly Radiant Digital grounds them with the Precision Context Engine.').split('\n')[0]}<br />
            <span className="grad-text">{(wir.headline || 'Every AI firm brings models.\nOnly Radiant Digital grounds them with the Precision Context Engine.').split('\n')[1]}</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto">
            {wir.body || 'Before deployment begins, Radiant Digital structures everything your AI agents and your teams need to move fast and get it right.'}
          </p>
        </motion.div>

        {/* ═══════ PCE DIAGRAM ═══════ */}
        <div className="max-w-5xl mx-auto">

          {/* SECTION 1: Context Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-2xl p-6 lg:p-8 pt-10 lg:pt-12"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(145,196,107,0.15)' }}
          >
            {/* Section label — centered on top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <span className="px-4 sm:px-6 py-2 text-[9px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.2em] uppercase rounded-full whitespace-nowrap"
                style={{
                  color: '#91C46B',
                  border: '1px solid rgba(145,196,107,0.4)',
                  background: 'linear-gradient(135deg, rgba(145,196,107,0.12), rgba(10,22,40,0.9))',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 20px rgba(145,196,107,0.08)',
                }}>
                Context Engineering
              </span>
            </div>

            {/* 4 Stage Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stages.map((s, i) => (
                <div key={s.num} className="relative group">
                  {/* Card */}
                  <div className="relative rounded-xl h-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}>

                    {/* Top gradient bar */}
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${s.color}80, ${s.color}20)` }} />

                    <div className="p-5 lg:p-6">
                      <span className="text-[11px] font-extrabold tracking-widest block mb-1.5 opacity-40" style={{ color: s.color }}>{s.num}</span>
                      <h3 className="text-xl font-extrabold mb-4" style={{ color: s.color }}>{s.title}</h3>
                      <div className="space-y-1.5">
                        {s.items.map((item, idx) => (
                          <div key={idx} className="flex items-baseline gap-2">
                            <span className="text-white/30 text-[8px] mt-[3px]">●</span>
                            <p className="text-white/60 text-sm leading-snug">
                              {item.bold ? (
                                <><span className="font-bold text-white/90" style={{ color: s.color }}>{item.bold}</span>{item.text.slice(item.bold.length)}</>
                              ) : item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-white/60 text-xs italic mt-4">{s.note}</p>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.color}15 0%, transparent 70%)` }} />
                  </div>

                  {/* Arrow between cards */}
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full"
                      style={{ background: 'rgba(10,22,40,0.9)', border: `1px solid ${stages[i + 1].color}40` }}>
                      <ChevronRight size={14} style={{ color: stages[i + 1].color }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ═══════ CONNECTOR: Section 1 → 2 ═══════ */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(145,196,107,0.3), rgba(240,151,78,0.3))' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(240,151,78,0.4)', boxShadow: '0 0 8px rgba(240,151,78,0.3)' }} />
              <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(240,151,78,0.3), rgba(240,151,78,0.15))' }} />
            </div>
          </div>

          {/* SECTION 2: Forward Deployment — FULL WIDTH */}
          </div>{/* close max-w-5xl temporarily */}
          </div>{/* close max-w-7xl temporarily */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative w-full"
            style={{ background: 'linear-gradient(180deg, rgba(240,151,78,0.03) 0%, rgba(255,255,255,0.02) 50%, rgba(145,196,107,0.02) 100%)' }}
          >
            {/* Top border line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(240,151,78,0.2) 30%, rgba(240,151,78,0.3) 50%, rgba(240,151,78,0.2) 70%, transparent 95%)' }} />
            {/* Bottom border line */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(145,196,107,0.15) 30%, rgba(145,196,107,0.25) 50%, rgba(145,196,107,0.15) 70%, transparent 95%)' }} />

            {/* Section label — centered on the top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <span className="px-4 sm:px-6 py-2 text-[9px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.2em] uppercase rounded-full whitespace-nowrap"
                style={{
                  color: '#F0974E',
                  border: '1px solid rgba(240,151,78,0.4)',
                  background: 'linear-gradient(135deg, rgba(240,151,78,0.12), rgba(10,22,40,0.9))',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 20px rgba(240,151,78,0.08)',
                }}>
                Forward Deployment
              </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-12 lg:pb-20">

              {/* Two cards side by side — illustration + title + bullets combined */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

                {/* ── Card 1: Delivery Team ── */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(145,196,107,0.04)', border: '1px solid rgba(145,196,107,0.15)' }}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img src="/images/delivery-team-photo.jpg" alt="Delivery team collaborating on enterprise transformation with laptops" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,14,26,0.95) 0%, rgba(8,14,26,0.3) 50%, transparent 100%)' }} />
                    <div className="absolute bottom-4 left-6 right-6 z-10">
                      <h3 className="text-[#34d399] text-xl font-extrabold drop-shadow-lg">Your Delivery Team</h3>
                    </div>
                  </div>
                  {/* Bullets */}
                  <div className="px-6 pt-4 pb-6 space-y-2.5">
                    {teamItems.map((item, i) => (
                      <div key={i} className="flex gap-3 px-4 py-3.5 rounded-xl"
                        style={{ background: 'rgba(145,196,107,0.04)', border: '1px solid rgba(145,196,107,0.1)' }}>
                        <div className="w-1 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(52,211,153,0.5)' }} />
                        <p className="text-white/70 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Card 2: AI Agents ── */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(89,106,224,0.04)', border: '1px solid rgba(89,106,224,0.15)' }}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img src="/images/ai-agents-photo.jpg" alt="Artificial intelligence neural network powering enterprise AI agents" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,14,26,0.95) 0%, rgba(8,14,26,0.3) 50%, transparent 100%)' }} />
                    <div className="absolute bottom-4 left-6 right-6 z-10">
                      <h3 className="text-[#818cf8] text-xl font-extrabold drop-shadow-lg">Your AI Agents</h3>
                    </div>
                  </div>
                  {/* Bullets */}
                  <div className="px-6 pt-4 pb-6 space-y-2.5">
                    {agentItems.map((item, i) => (
                      <div key={i} className="flex gap-3 px-4 py-3.5 rounded-xl"
                        style={{ background: 'rgba(89,106,224,0.04)', border: '1px solid rgba(89,106,224,0.1)' }}>
                        <div className="w-1 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(129,140,248,0.5)' }} />
                        <p className="text-white/70 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Re-open containers for remaining content */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">

          {/* ═══════ CONNECTOR: Section 2 → Outcome ═══════ */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(240,151,78,0.2), rgba(145,196,107,0.3))' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(145,196,107,0.5)', boxShadow: '0 0 12px rgba(145,196,107,0.4)' }} />
              <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(145,196,107,0.3), rgba(145,196,107,0.15))' }} />
            </div>
          </div>

          {/* SECTION 3: Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="relative text-center py-10 px-8 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(145,196,107,0.08), rgba(89,106,224,0.05), rgba(145,196,107,0.08))',
              border: '1px solid rgba(145,196,107,0.25)',
              boxShadow: '0 0 40px rgba(145,196,107,0.06), inset 0 1px 0 rgba(145,196,107,0.1)',
            }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.08) 0%, transparent 60%)' }} />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(145,196,107,0.15)', border: '1px solid rgba(145,196,107,0.3)' }}>
                  <Zap size={18} className="text-[#91C46B]" />
                </div>
                <h3 className="text-brand-green text-xl font-extrabold">
                  {outcome.title || 'Supercharged Enterprise Transformation'}
                </h3>
              </div>
              <p className="text-white/65 text-sm">
                {outcome.body || 'AI agents and delivery teams aligned from day one.'}
              </p>
              <p className="text-white/70 text-xs mt-1">
                {outcome.subBody || 'Fastest path from context to production. Every time.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, Users, Zap, ChevronRight } from 'lucide-react'

const stages = [
  { num: '01', title: 'Extract', color: '#91C46B', bg: 'rgba(145,196,107,0.08)', border: 'rgba(145,196,107,0.25)', items: ['Situation', 'Complication', 'Question'], note: 'SCQ framing' },
  { num: '02', title: 'Structure', color: '#F0974E', bg: 'rgba(240,151,78,0.08)', border: 'rgba(240,151,78,0.25)', items: ['Domain', 'knowledge base', 'Scope'], note: 'boundaries set' },
  { num: '03', title: 'Validate', color: '#596AE0', bg: 'rgba(89,106,224,0.08)', border: 'rgba(89,106,224,0.25)', items: ['Pilot module', 'stress-tests', 'the environment'], note: 'Accuracy compounds' },
  { num: '04', title: 'Deploy', color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)', items: ['Knowledge Hub', 'Semantic Graph', 'KAG'], note: 'Context-Aware AI' },
]

const agentItems = [
  'Scoped vocabulary and domain rules so outputs are accurate from run one',
  'Scope boundaries that prevent well-intentioned errors downstream',
  'Validated context that compounds accuracy at scale',
]

const teamItems = [
  'Structured problem framing before any solution design begins',
  'Shared knowledge base aligned to your actual environment',
  'Pilot-validated map so every module after runs faster',
]

export default function WhatIsRadiantAI() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
            Why Radiant Digital
          </p>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
            Every AI firm brings models.<br />
            <span className="grad-text">Only Radiant Digital brings the Precision Context Engine.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto">
            Before deployment begins, Radiant Digital structures everything your AI agents and your teams need to move fast and get it right.
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
              <span className="px-6 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full"
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
                      <h4 className="text-xl font-extrabold mb-4" style={{ color: s.color }}>{s.title}</h4>
                      <div className="space-y-1.5">
                        {s.items.map((item) => (
                          <p key={item} className="text-white/60 text-sm leading-snug">{item}</p>
                        ))}
                      </div>
                      <p className="text-white/30 text-xs italic mt-4">{s.note}</p>
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
              <span className="px-6 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full"
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

                {/* ── Card 1: AI Agents ── */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(89,106,224,0.04)', border: '1px solid rgba(89,106,224,0.15)' }}>
                  {/* Illustration area */}
                  <div className="flex justify-center pt-8 pb-4 relative">
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(89,106,224,0.08) 0%, transparent 70%)' }} />
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40 relative z-10">
                      <defs>
                        <linearGradient id="cBod" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#596AE0" />
                        </linearGradient>
                        <linearGradient id="cBodDk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4338ca" />
                          <stop offset="100%" stopColor="#312e81" />
                        </linearGradient>
                        <linearGradient id="cHead" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#a5b4fc" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                        <linearGradient id="cScr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0f172a" />
                          <stop offset="100%" stopColor="#020617" />
                        </linearGradient>
                        <linearGradient id="cGl" x1="0.5" y1="0" x2="0.5" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#596AE0" />
                        </linearGradient>
                        <filter id="cSh">
                          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#4338ca" floodOpacity="0.35" />
                        </filter>
                      </defs>
                      <g filter="url(#cSh)">
                        {/* Antenna */}
                        <rect x="96" y="14" width="6" height="16" rx="3" fill="url(#cHead)" />
                        <circle cx="99" cy="10" r="7" fill="url(#cHead)" />
                        <circle cx="99" cy="10" r="3.5" fill="#22d3ee">
                          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        {/* Head */}
                        <path d="M58 36 L99 28 L140 36 L99 44 Z" fill="#c7d2fe" />
                        <rect x="58" y="36" width="41" height="42" rx="10" fill="url(#cHead)" />
                        <path d="M99 36 L140 36 L140 72 L99 78 Z" fill="url(#cBod)" />
                        {/* Face */}
                        <rect x="65" y="42" width="28" height="28" rx="6" fill="url(#cScr)" />
                        <rect x="70" y="50" width="7" height="8" rx="3.5" fill="#22d3ee">
                          <animate attributeName="height" values="8;2;8" dur="3s" repeatCount="indefinite" />
                          <animate attributeName="y" values="50;53;50" dur="3s" repeatCount="indefinite" />
                        </rect>
                        <rect x="82" y="50" width="7" height="8" rx="3.5" fill="#22d3ee">
                          <animate attributeName="height" values="8;2;8" dur="3s" repeatCount="indefinite" />
                          <animate attributeName="y" values="50;53;50" dur="3s" repeatCount="indefinite" />
                        </rect>
                        <path d="M73 62 Q79 67 85 62" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
                        {/* Body */}
                        <path d="M46 88 L99 80 L152 88 L99 96 Z" fill="#c7d2fe" />
                        <rect x="46" y="88" width="53" height="64" rx="12" fill="url(#cBod)" />
                        <path d="M99 88 L152 88 L152 146 L99 152 Z" fill="url(#cBodDk)" />
                        {/* Core */}
                        <circle cx="72" cy="118" r="14" fill="#0f172a" />
                        <circle cx="72" cy="118" r="10" fill="url(#cScr)" />
                        <circle cx="72" cy="118" r="6" fill="url(#cGl)" opacity="0.6">
                          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="72" cy="118" r="3" fill="white" opacity="0.8" />
                        {/* Arms */}
                        <rect x="22" y="92" width="20" height="40" rx="10" fill="url(#cHead)" />
                        <circle cx="32" cy="136" r="9" fill="url(#cBod)" />
                        <rect x="156" y="90" width="18" height="38" rx="9" fill="url(#cBodDk)" />
                        <circle cx="165" cy="132" r="8" fill="#4338ca" />
                      </g>
                      {/* Floating task card */}
                      <rect x="138" y="34" width="42" height="24" rx="6" fill="#1e293b" stroke="rgba(34,211,238,0.3)" strokeWidth="1">
                        <animate attributeName="y" values="34;28;34" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <rect x="144" y="40" width="16" height="2" rx="1" fill="#22d3ee" opacity="0.5">
                        <animate attributeName="y" values="40;34;40" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <rect x="144" y="45" width="28" height="2" rx="1" fill="rgba(255,255,255,0.15)">
                        <animate attributeName="y" values="45;39;45" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <rect x="144" y="50" width="20" height="2" rx="1" fill="rgba(255,255,255,0.1)">
                        <animate attributeName="y" values="50;44;50" dur="3s" repeatCount="indefinite" />
                      </rect>
                      {/* Checkmark card */}
                      <rect x="10" y="48" width="36" height="22" rx="6" fill="#1e293b" stroke="rgba(145,196,107,0.3)" strokeWidth="1">
                        <animate attributeName="y" values="48;42;48" dur="3.5s" repeatCount="indefinite" />
                      </rect>
                      <circle cx="22" cy="59" r="4" fill="rgba(145,196,107,0.3)">
                        <animate attributeName="cy" values="59;53;59" dur="3.5s" repeatCount="indefinite" />
                      </circle>
                      <path d="M20 59 L22 61 L26 57" stroke="#91C46B" strokeWidth="1.2" strokeLinecap="round" fill="none">
                        <animate attributeName="transform" values="translate(0,0);translate(0,-6);translate(0,0)" dur="3.5s" repeatCount="indefinite" />
                      </path>
                      {/* Orbs */}
                      <circle cx="165" cy="72" r="5" fill="#f59e0b" opacity="0.6">
                        <animate attributeName="cy" values="72;66;72" dur="2.8s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="28" cy="152" r="3.5" fill="#f472b6" opacity="0.4">
                        <animate attributeName="cy" values="152;147;152" dur="3.2s" repeatCount="indefinite" />
                      </circle>
                      {/* Sparkle */}
                      <path d="M140 20 L141.5 16 L143 20 L147 21.5 L143 23 L141.5 27 L140 23 L136 21.5 Z" fill="#fbbf24" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                      </path>
                      {/* Shadow */}
                      <ellipse cx="99" cy="172" rx="45" ry="6" fill="rgba(99,102,241,0.12)" />
                    </svg>
                  </div>
                  {/* Title */}
                  <div className="px-6 pb-2 text-center">
                    <h3 className="text-[#818cf8] text-xl font-extrabold">Your AI Agents</h3>
                  </div>
                  {/* Bullets */}
                  <div className="px-6 pb-6 space-y-2.5">
                    {agentItems.map((item, i) => (
                      <div key={i} className="flex gap-3 px-4 py-3.5 rounded-xl"
                        style={{ background: 'rgba(89,106,224,0.04)', border: '1px solid rgba(89,106,224,0.1)' }}>
                        <div className="w-1 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(129,140,248,0.5)' }} />
                        <p className="text-white/70 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Card 2: Delivery Team ── */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(145,196,107,0.04)', border: '1px solid rgba(145,196,107,0.15)' }}>
                  {/* Illustration area */}
                  <div className="flex justify-center pt-8 pb-4 relative">
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(52,211,153,0.06) 0%, transparent 70%)' }} />
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40 relative z-10">
                      <defs>
                        <linearGradient id="tSk1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFD5B8" /><stop offset="100%" stopColor="#F0B896" />
                        </linearGradient>
                        <linearGradient id="tSk2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C69C7B" /><stop offset="100%" stopColor="#A67B5B" />
                        </linearGradient>
                        <linearGradient id="tSk3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8D5524" /><stop offset="100%" stopColor="#6D3A1A" />
                        </linearGradient>
                        <linearGradient id="tS1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#6ee7b7" /><stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                        <linearGradient id="tS1d" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" /><stop offset="100%" stopColor="#047857" />
                        </linearGradient>
                        <linearGradient id="tS2" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#93c5fd" /><stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <linearGradient id="tS2d" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                        <linearGradient id="tS3" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <linearGradient id="tS3d" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d97706" /><stop offset="100%" stopColor="#b45309" />
                        </linearGradient>
                        <filter id="tSh">
                          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#059669" floodOpacity="0.2" />
                        </filter>
                      </defs>
                      <g filter="url(#tSh)">
                        {/* Person 2 (left, behind, blue) */}
                        <path d="M22 126 Q22 100 48 92 Q74 100 74 126 L74 155 L22 155 Z" fill="url(#tS2)" />
                        <path d="M74 126 Q74 102 80 106 L80 155 L74 155 Z" fill="url(#tS2d)" />
                        <circle cx="48" cy="76" r="16" fill="url(#tSk2)" />
                        <path d="M32 70 Q32 56 48 54 Q64 56 64 70 Q62 62 48 60 Q34 62 32 70Z" fill="#292524" />
                        <rect x="38" y="74" width="8" height="6" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                        <rect x="50" y="74" width="8" height="6" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                        <line x1="46" y1="77" x2="50" y2="77" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                        <circle cx="42" cy="77" r="1.2" fill="#1e293b" />
                        <circle cx="54" cy="77" r="1.2" fill="#1e293b" />
                        <path d="M42 84 Q48 88 54 84" stroke="#8B7355" strokeWidth="1" fill="none" strokeLinecap="round" />
                        {/* Person 3 (right, behind, amber) */}
                        <path d="M126 126 Q126 100 152 92 Q178 100 178 126 L178 155 L126 155 Z" fill="url(#tS3)" />
                        <path d="M118 155 L126 155 L126 126 Q126 112 120 108 Z" fill="url(#tS3d)" />
                        <circle cx="152" cy="76" r="16" fill="url(#tSk3)" />
                        <path d="M136 68 Q136 52 152 50 Q168 52 168 68" fill="#1c1917" />
                        <circle cx="152" cy="76" r="16" fill="url(#tSk3)" />
                        <path d="M136 68 Q136 54 152 52 Q168 54 168 68 Q166 60 152 58 Q138 60 136 68Z" fill="#1c1917" />
                        <circle cx="147" cy="78" r="1.4" fill="#1a1a1a" />
                        <circle cx="157" cy="78" r="1.4" fill="#1a1a1a" />
                        <circle cx="147.3" cy="77.6" r="0.5" fill="white" />
                        <circle cx="157.3" cy="77.6" r="0.5" fill="white" />
                        <path d="M147 84 Q152 88 157 84" stroke="#5a3a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
                        {/* Person 1 (center, front, green — lead) */}
                        <path d="M66 140 Q66 110 100 100 Q134 110 134 140 L134 170 L66 170 Z" fill="url(#tS1)" />
                        <path d="M134 140 Q134 112 142 116 L142 170 L134 170 Z" fill="url(#tS1d)" />
                        <rect x="90" y="126" width="20" height="14" rx="3" fill="rgba(255,255,255,0.2)" />
                        <rect x="93" y="130" width="14" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
                        <rect x="93" y="134" width="9" height="2" rx="1" fill="rgba(255,255,255,0.25)" />
                        <circle cx="100" cy="80" r="22" fill="url(#tSk1)" />
                        <path d="M78 74 Q78 54 100 52 Q122 54 122 74 Q120 64 100 62 Q80 64 78 74 Z" fill="#78350f" />
                        <circle cx="93" cy="82" r="2" fill="#2d2d2d" />
                        <circle cx="107" cy="82" r="2" fill="#2d2d2d" />
                        <circle cx="93.5" cy="81.5" r="0.8" fill="white" />
                        <circle cx="107.5" cy="81.5" r="0.8" fill="white" />
                        <path d="M93 92 Q100 97 107 92" stroke="#D4A882" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </g>
                      {/* Chat bubble */}
                      <rect x="10" y="28" width="42" height="26" rx="8" fill="#1e293b" stroke="rgba(110,231,183,0.3)" strokeWidth="1">
                        <animate attributeName="y" values="28;22;28" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <rect x="16" y="36" width="18" height="2" rx="1" fill="#34d399" opacity="0.5">
                        <animate attributeName="y" values="36;30;36" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <rect x="16" y="41" width="28" height="2" rx="1" fill="rgba(255,255,255,0.15)">
                        <animate attributeName="y" values="41;35;41" dur="3s" repeatCount="indefinite" />
                      </rect>
                      {/* Task bubble */}
                      <rect x="148" y="22" width="40" height="24" rx="8" fill="#1e293b" stroke="rgba(251,191,36,0.3)" strokeWidth="1">
                        <animate attributeName="y" values="22;16;22" dur="3.5s" repeatCount="indefinite" />
                      </rect>
                      <circle cx="160" cy="34" r="4" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1">
                        <animate attributeName="cy" values="34;28;34" dur="3.5s" repeatCount="indefinite" />
                      </circle>
                      <path d="M158 34 L160 36 L164 32" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" fill="none">
                        <animate attributeName="transform" values="translate(0,0);translate(0,-6);translate(0,0)" dur="3.5s" repeatCount="indefinite" />
                      </path>
                      {/* Orbs */}
                      <circle cx="36" cy="12" r="4" fill="#34d399" opacity="0.5">
                        <animate attributeName="cy" values="12;7;12" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="172" cy="60" r="3" fill="#818cf8" opacity="0.4">
                        <animate attributeName="cy" values="60;55;60" dur="2.6s" repeatCount="indefinite" />
                      </circle>
                      {/* Sparkle */}
                      <path d="M68 38 L69.5 34 L71 38 L75 39.5 L71 41 L69.5 45 L68 41 L64 39.5 Z" fill="#fbbf24" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
                      </path>
                      {/* Shadow */}
                      <ellipse cx="100" cy="180" rx="50" ry="6" fill="rgba(52,211,153,0.1)" />
                    </svg>
                  </div>
                  {/* Title */}
                  <div className="px-6 pb-2 text-center">
                    <h3 className="text-[#34d399] text-xl font-extrabold">Your Delivery Team</h3>
                  </div>
                  {/* Bullets */}
                  <div className="px-6 pb-6 space-y-2.5">
                    {teamItems.map((item, i) => (
                      <div key={i} className="flex gap-3 px-4 py-3.5 rounded-xl"
                        style={{ background: 'rgba(145,196,107,0.04)', border: '1px solid rgba(145,196,107,0.1)' }}>
                        <div className="w-1 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(52,211,153,0.5)' }} />
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
                <h4 className="text-[#91C46B] text-xl font-extrabold">
                  Supercharged Enterprise Transformation
                </h4>
              </div>
              <p className="text-white/65 text-sm">
                AI agents and delivery teams aligned from day one.
              </p>
              <p className="text-white/45 text-xs mt-1">
                Fastest path from context to production. Every time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

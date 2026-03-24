import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Send,
  ArrowLeft,
  Sparkles,
  Layers,
  PenTool,
  Receipt,
  Globe,
  BarChart3,
  Zap,
  Bot,
  Brain,
  Search,
  Database,
  Cpu,
  Users,
  TrendingUp,
  ArrowRight,
  Quote,
  ChevronRight,
  CheckCircle2,
  Building2,
  Landmark,
  GraduationCap,
  HeartPulse,
  Radio,
  Fuel,
  Shield,
  Banknote,
  Award,
  Briefcase,
  Target,
} from 'lucide-react'
import { findAnswer, suggestions } from '../data/knowledgeBase.js'
import RadiantLogo from '../components/shared/RadiantLogo'

const iconMap = {
  Layers, PenTool, Receipt, Globe, BarChart3, Zap, Bot, Brain,
  Search, Database, Cpu, Users, TrendingUp,
  Building2, Landmark, GraduationCap, HeartPulse, Radio, Fuel, Shield, Banknote,
  Award, Briefcase, Target,
}

export default function Chat() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const autoSubmitted = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Auto-submit query from URL param (e.g., /chat?q=Show+me+case+studies)
  useEffect(() => {
    const q = searchParams.get('q')
    if (q && !autoSubmitted.current) {
      autoSubmitted.current = true
      setTimeout(() => handleSubmit(q), 400)
    }
  }, [searchParams])

  const handleSubmit = (query) => {
    const q = typeof query === 'string' ? query : input
    if (!q.trim()) return

    const userMsg = { role: 'user', content: q.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const answer = findAnswer(q)
      const botMsg = { role: 'assistant', cards: answer.cards, id: answer.id, followUp: answer.followUp }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const hasMessages = messages.length > 0

  return (
    <div className="min-h-screen bg-[#010F1E] flex flex-col relative">
      {/* Full-page gradient background — layered radial gradients covering entire viewport */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 15% 85%, rgba(145,196,107,0.2) 0%, rgba(45,212,191,0.1) 40%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 85% 80%, rgba(89,106,224,0.22) 0%, rgba(168,85,247,0.12) 40%, transparent 70%)',
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(89,106,224,0.1) 0%, rgba(145,196,107,0.05) 50%, transparent 80%)',
            'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(145,196,107,0.1) 0%, rgba(89,106,224,0.05) 50%, transparent 75%)',
            'radial-gradient(ellipse 60% 50% at 80% 15%, rgba(240,151,78,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)',
            'radial-gradient(ellipse 90% 40% at 50% 100%, rgba(89,106,224,0.18) 0%, rgba(168,85,247,0.1) 40%, transparent 75%)',
          ].join(', '),
        }}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]"
        style={{ background: 'rgba(1,15,30,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-text-secondary hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            <span className="font-display font-semibold">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <RadiantLogo height={20} />
            <span className="text-[0.55rem] font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(145,196,107,0.15)', color: '#91C46B', border: '1px solid rgba(145,196,107,0.3)' }}>
              Beta
            </span>
          </div>
          <div className="w-20 flex justify-end">
            {messages.length > 0 && (
              <button
                onClick={() => { setMessages([]); autoSubmitted.current = false }}
                className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors text-xs font-display font-semibold px-3 py-1.5 rounded-lg hover:bg-white/[0.05]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col">
          <AnimatePresence mode="popLayout">
            {!hasMessages && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col items-center justify-center pb-6 text-center relative overflow-visible"
              >
                {/* Animated glowing orb */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative mx-auto mt-8 mb-6"
                  style={{ width: '120px', height: '120px' }}
                >
                  {/* Large ambient glow spread */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: '-80px',
                      background: 'radial-gradient(circle, rgba(145,196,107,0.25) 0%, rgba(89,106,224,0.15) 30%, rgba(240,151,78,0.08) 50%, transparent 70%)',
                      filter: 'blur(50px)',
                    }}
                  />

                  {/* Pulsing wide glow */}
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: '-50px',
                      background: 'radial-gradient(circle, rgba(145,196,107,0.22) 0%, rgba(89,106,224,0.12) 40%, transparent 70%)',
                      filter: 'blur(35px)',
                    }}
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.08, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Rotating conic ring — more vivid */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      inset: '-10px',
                      background: 'conic-gradient(from 0deg, rgba(145,196,107,0.4), rgba(89,106,224,0.35), rgba(240,151,78,0.3), rgba(168,85,247,0.25), rgba(145,196,107,0.4))',
                      filter: 'blur(18px)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Outer bright ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '2px solid rgba(145,196,107,0.25)',
                      boxShadow: '0 0 40px rgba(145,196,107,0.2), 0 0 80px rgba(145,196,107,0.1), inset 0 0 40px rgba(145,196,107,0.08)',
                    }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Inner ring */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      inset: '15px',
                      border: '1.5px solid rgba(89,106,224,0.2)',
                      boxShadow: '0 0 25px rgba(89,106,224,0.12), inset 0 0 20px rgba(89,106,224,0.06)',
                    }}
                    animate={{ scale: [1.04, 1, 1.04], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  />

                  {/* Glowing core */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      inset: '25%',
                      background: 'radial-gradient(circle at 40% 40%, rgba(145,196,107,0.7) 0%, rgba(89,106,224,0.45) 45%, rgba(240,151,78,0.2) 75%, transparent 100%)',
                      boxShadow: '0 0 80px rgba(145,196,107,0.45), 0 0 160px rgba(89,106,224,0.2), 0 0 40px rgba(240,151,78,0.15)',
                      filter: 'blur(1px)',
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Bright white-green center */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      inset: '38%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(145,196,107,0.8) 40%, rgba(89,106,224,0.3) 70%, transparent 100%)',
                      boxShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(145,196,107,0.4)',
                    }}
                    animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Floating particle dots */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${3 + i % 3}px`,
                        height: `${3 + i % 3}px`,
                        background: ['#91C46B', '#596AE0', '#F0974E', '#2DD4BF', '#a855f7', '#91C46B'][i],
                        boxShadow: `0 0 12px ${['#91C46B', '#596AE0', '#F0974E', '#2DD4BF', '#a855f7', '#91C46B'][i]}80`,
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, Math.cos((i * 60 * Math.PI) / 180) * 65, 0],
                        y: [0, Math.sin((i * 60 * Math.PI) / 180) * 65, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 2.5 + i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Headline with gradient accent */}
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display font-black text-white mb-4 tracking-tight relative z-10"
                  style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)' }}
                >
                  What problem are you trying to solve?
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-text-secondary text-lg max-w-md mx-auto mb-10 leading-relaxed relative z-10"
                >
                  Tell us what you're working on. We'll tell you what we've already built for it.
                </motion.p>

                {/* Suggestion cards with icons & richer styling */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto relative z-10">
                  {suggestions.map((s, i) => {
                    const colors = ['#91C46B', '#596AE0', '#F0974E', '#a855f7', '#2DD4BF', '#e05990', '#596AE0', '#91C46B']
                    const icons = [Sparkles, Layers, BarChart3, Globe, Cpu, TrendingUp, Shield, ArrowRight]
                    const c = colors[i % colors.length]
                    const SugIcon = icons[i % icons.length]
                    return (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSubmit(s)}
                        className="text-left p-5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                        }}
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at 50% 0%, ${c}14 0%, transparent 70%)` }} />
                        {/* Hover border color */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ border: `1px solid ${c}30` }} />

                        {/* Icon */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative z-10 transition-all duration-300 group-hover:scale-110"
                          style={{ background: `${c}10`, border: `1px solid ${c}20` }}>
                          <SugIcon size={18} style={{ color: c }} />
                        </div>

                        <span className="text-white/75 text-sm font-semibold leading-snug relative z-10 group-hover:text-white transition-colors block mb-2">
                          {s}
                        </span>

                        <div className="flex items-center gap-1.5 relative z-10">
                          <span className="text-[11px] font-medium transition-colors duration-300 group-hover:translate-x-0.5"
                            style={{ color: `${c}80` }}>
                            Explore
                          </span>
                          <ChevronRight size={12} className="transition-all duration-300 group-hover:translate-x-1"
                            style={{ color: `${c}60` }} />
                        </div>

                        {/* Bottom accent line on hover */}
                        <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `linear-gradient(90deg, transparent, ${c}35, transparent)` }} />
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`py-8 ${i === 0 ? 'pt-12' : ''}`}
              >
                {msg.role === 'user' ? (
                  <UserBubble content={msg.content} />
                ) : (
                  <AssistantCards cards={msg.cards} onSubmit={handleSubmit} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(145,196,107,0.1)', border: '1px solid rgba(145,196,107,0.15)' }}>
                    <Sparkles size={16} className="text-brand-green" />
                  </div>
                  <div className="flex gap-1.5 px-5 py-4 rounded-2xl mt-1"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {[0, 1, 2].map((d) => (
                      <motion.div
                        key={d}
                        className="w-2.5 h-2.5 rounded-full bg-brand-green/50"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hasMessages && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="pb-8 ml-14"
              >
                <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-4">Continue exploring</p>
                <div className="flex flex-wrap gap-2.5">
                  {(messages.filter(m => m.role === 'assistant').slice(-1)[0]?.followUp || suggestions.slice(0, 4))
                    .filter((s) => !messages.some((m) => m.role === 'user' && m.content === s))
                    .slice(0, 4)
                    .map((s, i) => (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        onClick={() => handleSubmit(s)}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          color: 'rgba(240,244,248,0.6)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(145,196,107,0.3)'
                          e.currentTarget.style.background = 'rgba(145,196,107,0.05)'
                          e.currentTarget.style.color = '#91C46B'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                          e.currentTarget.style.color = 'rgba(240,244,248,0.6)'
                        }}
                      >
                        {s}
                      </motion.button>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} className="h-44" />
        </div>
      </main>

      {/* Input bar */}
      <div className="sticky bottom-0 z-50">
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-6">
          <div
            className="flex items-center gap-4 rounded-2xl px-6 py-4 transition-all duration-300 focus-within:border-[rgba(145,196,107,0.3)] focus-within:shadow-[0_0_40px_rgba(145,196,107,0.06)]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Sparkles size={16} className="text-brand-green/40 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What problem are you trying to solve?"
              className="flex-1 bg-transparent text-white text-[15px] placeholder:text-white/25 outline-none font-body"
            />
            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-20"
              style={{
                background: input.trim() ? '#91C46B' : 'rgba(255,255,255,0.05)',
              }}
            >
              <Send size={16} className={input.trim() ? 'text-[#010F1E]' : 'text-white/30'} />
            </button>
          </div>
          <p className="text-center text-text-muted text-[0.6rem] mt-3 opacity-40">
            Powered by Radiant AI knowledge base
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── User Message Bubble ── */
function UserBubble({ content }) {
  return (
    <div className="flex justify-end mb-2">
      <div
        className="max-w-[65%] px-6 py-4 rounded-2xl rounded-br-md text-[15px] text-white font-medium leading-relaxed"
        style={{ background: 'rgba(145,196,107,0.1)', border: '1px solid rgba(145,196,107,0.12)' }}
      >
        {content}
      </div>
    </div>
  )
}

/* ── Assistant Card Renderer ── */
function AssistantCards({ cards, onSubmit }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
        style={{ background: 'rgba(145,196,107,0.1)', border: '1px solid rgba(145,196,107,0.15)' }}>
        <Sparkles size={16} className="text-brand-green" />
      </div>
      <div className="flex-1 space-y-6 min-w-0">
        {cards.map((card, i) => (
          <CardRenderer key={i} card={card} index={i} onSubmit={onSubmit} />
        ))}
      </div>
    </div>
  )
}

/* ── Card Router ── */
function CardRenderer({ card, index, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.18 }}
    >
      {card.type === 'hero' && <HeroCard card={card} />}
      {card.type === 'metrics' && <MetricsCard card={card} />}
      {card.type === 'text' && <TextCard card={card} />}
      {card.type === 'grid' && <GridCard card={card} />}
      {card.type === 'list' && <ListCard card={card} onItemClick={onSubmit} />}
      {card.type === 'case-study' && <CaseStudyCard card={card} />}
      {card.type === 'partners' && <PartnersCard card={card} />}
      {card.type === 'cta' && <CTACard card={card} />}
      {card.type === 'solutions' && <SolutionsCard card={card} />}
      {card.type === 'platforms' && <PlatformsCard card={card} />}
      {card.type === 'industries' && <IndustriesCard card={card} />}
      {card.type === 'pce-diagram' && <PCEDiagramCard />}
      {card.type === 'screenshot' && <ScreenshotCard card={card} />}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   HERO CARD — Matches Hero.jsx with gradient bg,
   rainbow accent line, large editorial type
   ═══════════════════════════════════════════════ */
function HeroCard({ card }) {
  return (
    <div className="rounded-[20px] overflow-hidden relative"
      style={{ background: 'rgba(1,15,30,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Rainbow top line like hero metric strip */}
      <div className="h-1"
        style={{ background: 'linear-gradient(90deg, #91C46B 0%, #F0974E 30%, #596AE0 60%, #a855f7 100%)' }} />

      {/* Background orbs like hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
          style={{ background: `radial-gradient(circle, ${card.accent}12 0%, transparent 65%)`, filter: 'blur(40px)' }} />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(89,106,224,0.08) 0%, transparent 65%)', filter: 'blur(35px)' }} />
      </div>

      {/* Editorial bg letter */}
      <div className="absolute -right-6 -top-6 font-display font-black text-[14rem] leading-none text-white/[0.015] pointer-events-none select-none">
        R
      </div>

      <div className="relative z-10 p-10 lg:p-14">
        <div className="w-2 h-12 rounded-full mb-7"
          style={{ background: `linear-gradient(180deg, ${card.accent}, ${card.accent}40)` }} />
        <h3 className="font-display font-black tracking-tight text-white mb-5 leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
          {card.title}
        </h3>
        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
          {card.subtitle}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   METRICS CARD — Matches SocialProof.jsx stats strip
   with pull-stat gradient text, icons, editorial bg
   ═══════════════════════════════════════════════ */
function MetricsCard({ card }) {
  const statIcons = [Award, Briefcase, TrendingUp, Cpu]
  return (
    <div className="rounded-[20px] overflow-hidden relative"
      style={{ background: '#051A30', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Background decoration like SocialProof */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #91C46B 0%, transparent 70%)' }} />
      </div>
      {/* Large bg text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-display font-black text-white/[0.015] select-none pointer-events-none"
        style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}>
        TRUSTED
      </div>

      <div className="relative z-10 p-8 lg:p-10">
        <div className="kicker justify-center mb-8" style={{ justifyContent: 'center' }}>{card.title}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {card.items.map((item, i) => {
            const SIcon = statIcons[i % statIcons.length]
            return (
              <div key={item.label} className="text-center py-6">
                <SIcon className="w-5 h-5 mx-auto mb-3" style={{ color: '#91C46B', opacity: 0.7 }} />
                <div className="font-display font-black leading-none mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    background: 'linear-gradient(135deg, #91C46B 0%, #F0974E 70%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {item.value}
                </div>
                <div className="text-text-muted text-xs font-semibold tracking-wide uppercase">{item.label}</div>
              </div>
            )
          })}
        </div>
        {/* Trust line like SocialProof */}
        <div className="divider mt-8 mb-4" />
        <p className="text-center text-text-muted text-xs">
          CMMC compliant · 20+ Years in Business · 50+ Enterprise Clients
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PCE DIAGRAM CARD — Inline SVG of the Precision
   Context Engine pipeline for chat responses
   ═══════════════════════════════════════════════ */
function PCEDiagramCard() {
  return (
    <div className="rounded-[20px] overflow-hidden p-6 lg:p-8"
      style={{ background: 'rgba(1,15,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <svg width="100%" viewBox="0 0 680 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Section 1: Context Engineering */}
        <rect x="28" y="26" width="624" height="162" rx="10"
          stroke="rgba(145,196,107,0.3)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <rect x="250" y="15" width="180" height="24" rx="12"
          stroke="rgba(145,196,107,0.5)" strokeWidth="1" fill="#0a1628" />
        <text x="340" y="31" textAnchor="middle"
          fill="#91C46B" fontSize="10" fontWeight="700" letterSpacing="1.5"
          fontFamily="-apple-system, sans-serif">CONTEXT ENGINEERING</text>

        {/* Stage cards */}
        <rect x="40" y="44" width="140" height="132" rx="8" fill="rgba(145,196,107,0.06)" stroke="rgba(145,196,107,0.15)" strokeWidth="1" />
        <text x="52" y="66" fill="rgba(145,196,107,0.35)" fontSize="10" fontWeight="800" fontFamily="-apple-system, sans-serif">01</text>
        <text x="52" y="86" fill="#91C46B" fontSize="14" fontWeight="800" fontFamily="-apple-system, sans-serif">Extract</text>
        <text x="52" y="106" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Situation</text>
        <text x="52" y="120" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Complication</text>
        <text x="52" y="134" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Question</text>
        <text x="52" y="148" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="-apple-system, sans-serif" fontStyle="italic">SCQ framing</text>

        <line x1="180" y1="108" x2="198" y2="108" stroke="rgba(145,196,107,0.4)" strokeWidth="1.5" />
        <polygon points="196,104 204,108 196,112" fill="rgba(145,196,107,0.4)" />

        <rect x="200" y="44" width="140" height="132" rx="8" fill="rgba(240,151,78,0.06)" stroke="rgba(240,151,78,0.15)" strokeWidth="1" />
        <text x="212" y="66" fill="rgba(240,151,78,0.35)" fontSize="10" fontWeight="800" fontFamily="-apple-system, sans-serif">02</text>
        <text x="212" y="86" fill="#F0974E" fontSize="14" fontWeight="800" fontFamily="-apple-system, sans-serif">Structure</text>
        <text x="212" y="106" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Domain</text>
        <text x="212" y="120" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">knowledge base</text>
        <text x="212" y="134" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Scope</text>
        <text x="212" y="148" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="-apple-system, sans-serif" fontStyle="italic">boundaries set</text>

        <line x1="340" y1="108" x2="358" y2="108" stroke="rgba(240,151,78,0.4)" strokeWidth="1.5" />
        <polygon points="356,104 364,108 356,112" fill="rgba(240,151,78,0.4)" />

        <rect x="360" y="44" width="140" height="132" rx="8" fill="rgba(89,106,224,0.06)" stroke="rgba(89,106,224,0.15)" strokeWidth="1" />
        <text x="372" y="66" fill="rgba(89,106,224,0.35)" fontSize="10" fontWeight="800" fontFamily="-apple-system, sans-serif">03</text>
        <text x="372" y="86" fill="#596AE0" fontSize="14" fontWeight="800" fontFamily="-apple-system, sans-serif">Validate</text>
        <text x="372" y="106" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Pilot module</text>
        <text x="372" y="120" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">stress-tests</text>
        <text x="372" y="134" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">the environment</text>
        <text x="372" y="148" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="-apple-system, sans-serif" fontStyle="italic">Accuracy compounds</text>

        <line x1="500" y1="108" x2="518" y2="108" stroke="rgba(89,106,224,0.4)" strokeWidth="1.5" />
        <polygon points="516,104 524,108 516,112" fill="rgba(89,106,224,0.4)" />

        <rect x="520" y="44" width="120" height="132" rx="8" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.15)" strokeWidth="1" />
        <text x="532" y="66" fill="rgba(168,85,247,0.35)" fontSize="10" fontWeight="800" fontFamily="-apple-system, sans-serif">04</text>
        <text x="532" y="86" fill="#a855f7" fontSize="14" fontWeight="800" fontFamily="-apple-system, sans-serif">Deploy</text>
        <text x="532" y="106" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Knowledge Hub</text>
        <text x="532" y="120" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Semantic Graph</text>
        <text x="532" y="134" fill="rgba(255,255,255,0.5)" fontSize="10.5" fontFamily="-apple-system, sans-serif">KAG</text>
        <text x="532" y="148" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="-apple-system, sans-serif" fontStyle="italic">Context-Aware AI</text>

        {/* Fork lines */}
        <line x1="340" y1="188" x2="340" y2="218" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="166" y1="218" x2="514" y2="218" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="166" y1="218" x2="166" y2="234" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="514" y1="218" x2="514" y2="234" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <circle cx="340" cy="188" r="3" fill="rgba(255,255,255,0.2)" />

        {/* Section 2: Forward Deployment */}
        <rect x="28" y="234" width="624" height="228" rx="10"
          stroke="rgba(240,151,78,0.3)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <rect x="248" y="223" width="184" height="24" rx="12"
          stroke="rgba(240,151,78,0.5)" strokeWidth="1" fill="#0a1628" />
        <text x="340" y="239" textAnchor="middle"
          fill="#F0974E" fontSize="10" fontWeight="700" letterSpacing="1.5"
          fontFamily="-apple-system, sans-serif">FORWARD DEPLOYMENT</text>

        {/* Left: AI agents */}
        <rect x="44" y="252" width="270" height="30" rx="6" fill="rgba(89,106,224,0.1)" stroke="rgba(89,106,224,0.2)" strokeWidth="1" />
        <text x="179" y="272" textAnchor="middle" fill="#596AE0" fontSize="12" fontWeight="700" fontFamily="-apple-system, sans-serif">Your AI agents</text>

        <rect x="44" y="292" width="270" height="46" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="56" y="311" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Scoped vocabulary and domain rules so</text>
        <text x="56" y="325" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">outputs are accurate from run one</text>

        <rect x="44" y="346" width="270" height="46" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="56" y="365" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Scope boundaries that prevent</text>
        <text x="56" y="379" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">well-intentioned errors downstream</text>

        <rect x="44" y="400" width="270" height="46" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="56" y="419" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Validated context that compounds</text>
        <text x="56" y="433" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">accuracy at scale</text>

        {/* Right: Delivery team */}
        <rect x="366" y="252" width="270" height="30" rx="6" fill="rgba(145,196,107,0.1)" stroke="rgba(145,196,107,0.2)" strokeWidth="1" />
        <text x="501" y="272" textAnchor="middle" fill="#91C46B" fontSize="12" fontWeight="700" fontFamily="-apple-system, sans-serif">Your delivery team</text>

        <rect x="366" y="292" width="270" height="46" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="378" y="311" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Structured problem framing before</text>
        <text x="378" y="325" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">any solution design begins</text>

        <rect x="366" y="346" width="270" height="46" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="378" y="365" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Shared knowledge base aligned to</text>
        <text x="378" y="379" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">your actual environment</text>

        <rect x="366" y="400" width="270" height="46" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="378" y="419" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Pilot-validated map so every module</text>
        <text x="378" y="433" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="-apple-system, sans-serif">after runs faster</text>

        {/* Converge lines */}
        <line x1="179" y1="462" x2="179" y2="490" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="501" y1="462" x2="501" y2="490" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="179" y1="490" x2="501" y2="490" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="340" y1="490" x2="340" y2="506" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <circle cx="340" cy="506" r="3" fill="rgba(255,255,255,0.2)" />

        {/* Section 3: Outcome bar */}
        <rect x="60" y="508" width="560" height="76" rx="10"
          fill="rgba(145,196,107,0.08)" stroke="rgba(145,196,107,0.25)" strokeWidth="1.5" />
        <text x="340" y="536" textAnchor="middle" fill="#91C46B" fontSize="15" fontWeight="800" fontFamily="-apple-system, sans-serif">Supercharged Enterprise Transformation</text>
        <text x="340" y="556" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily="-apple-system, sans-serif">AI agents and delivery teams aligned from day one.</text>
        <text x="340" y="572" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10.5" fontFamily="-apple-system, sans-serif">Fastest path from context to production. Every time.</text>
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SCREENSHOT CARD — Solution screenshot with
   light/dark mode hover effect
   ═══════════════════════════════════════════════ */
function ScreenshotCard({ card }) {
  return (
    <div className="rounded-[20px] overflow-hidden relative"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      {card.label && (
        <div className="px-6 pt-5 pb-3" style={{ background: 'rgba(1,15,30,0.6)' }}>
          <span className="text-[0.6rem] font-display font-bold uppercase tracking-widest"
            style={{ color: card.accent || '#91C46B' }}>
            {card.label}
          </span>
        </div>
      )}
      <div className="relative group cursor-pointer">
        <img
          src={card.src}
          alt={card.alt || 'Solution screenshot'}
          className="w-full h-auto object-cover transition-all duration-700"
        />
        {/* Dark mode overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <img
            src={card.src}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'invert(0.88) hue-rotate(180deg) contrast(1.05) brightness(0.95)' }}
          />
        </div>
        {/* Accent tint on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${card.accent || '#91C46B'}12 0%, transparent 60%)` }} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TEXT CARD — Editorial pull-quote style with
   accent bar, large body text
   ═══════════════════════════════════════════════ */
function TextCard({ card }) {
  return (
    <div className="mag-card p-10 lg:p-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 100%, ${card.accent}08 0%, transparent 60%)` }} />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 5%, ${card.accent}30 50%, transparent 95%)` }} />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-1.5 h-12 rounded-full" style={{ background: card.accent }} />
          <h3 className="font-display font-black text-xl lg:text-2xl text-white tracking-tight">{card.title}</h3>
        </div>
        <p className="text-text-secondary text-base lg:text-lg leading-[1.9] max-w-2xl">
          {card.body}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   GRID CARD — Matches WhyRadiant.jsx with icon boxes,
   hover glow, bottom accent line
   ═══════════════════════════════════════════════ */
function GridCard({ card }) {
  return (
    <div className="space-y-5">
      {/* Header like WhyRadiant */}
      <div className="text-center py-6">
        <p className="text-brand-green font-body text-xs font-semibold tracking-widest uppercase mb-4">
          Why Radiant Digital
        </p>
        <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-3 tracking-tight">
          {card.title}
        </h3>
        {card.subtitle && (
          <p className="text-text-secondary text-base max-w-lg mx-auto">{card.subtitle}</p>
        )}
      </div>

      {/* Pillar cards — matching WhyRadiant grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {card.items.map((item) => {
          const Icon = iconMap[item.icon] || Layers
          return (
            <div
              key={item.name}
              className="group relative rounded-2xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.accent}10 0%, transparent 70%)` }} />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${item.accent}15`, border: `1.5px solid ${item.accent}30` }}>
                  <Icon size={26} style={{ color: item.accent }} />
                </div>
                <h4 className="font-display font-bold text-white text-lg leading-snug mb-3">{item.name}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}40, transparent)` }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   LIST CARD — Matches Services section with
   accent dots, metric badges, hover lift
   ═══════════════════════════════════════════════ */
function ListCard({ card, onItemClick }) {
  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${card.accent}06 0%, transparent 50%)` }} />
        <div className="relative z-10">
          <span className="kicker mb-4">{card.title.includes('Pillar') ? 'Services' : 'Overview'}</span>
          <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-2 tracking-tight">{card.title}</h3>
          {card.subtitle && <p className="text-text-secondary text-base leading-relaxed">{card.subtitle}</p>}
        </div>
      </div>

      {/* Items as individual clickable cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {card.items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${onItemClick ? 'cursor-pointer' : ''}`}
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${item.accent}15` }}
            onClick={() => onItemClick && onItemClick(`Tell me about the ${item.name} case study`)}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.accent}0c 0%, transparent 70%)` }} />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                  style={{ background: item.accent, boxShadow: `0 0 16px ${item.accent}35` }} />
                <span className="font-display font-semibold text-white text-[15px]">{item.name}</span>
              </div>
              <span className="text-sm font-bold font-display tracking-tight ml-4 whitespace-nowrap" style={{ color: item.accent }}>
                {item.metric}
              </span>
            </div>

            {/* Click hint on hover */}
            {onItemClick && (
              <div className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight size={14} className="text-white/30" />
              </div>
            )}

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${item.accent}30, transparent)` }} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   CASE STUDY CARD — Matches CaseStudy.jsx with
   client badge, editorial metrics, colorful orb
   background, pull quote, rainbow stripe
   ═══════════════════════════════════════════════ */
function CaseStudyCard({ card }) {
  return (
    <div className="rounded-[20px] overflow-hidden relative"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>

      {/* Rainbow accent stripe like CaseStudy */}
      <div className="h-1.5"
        style={{ background: 'linear-gradient(90deg, #91C46B 15%, #F0974E 35%, #596AE0 55%, #a855f7 75%, #2DD4BF 95%)' }} />

      {/* Colorful orb background like CaseStudy video section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-[10%] w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(145,196,107,0.1) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="absolute top-[20%] right-[5%] w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(240,151,78,0.08) 0%, transparent 65%)', filter: 'blur(45px)' }} />
        <div className="absolute -bottom-10 left-[35%] w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(89,106,224,0.08) 0%, transparent 65%)', filter: 'blur(45px)' }} />
      </div>

      <div className="p-10 lg:p-12 relative z-10">
        {/* Client info badge like CaseStudy */}
        <div className="flex items-center gap-4 p-5 rounded-2xl mb-8"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-xl flex-shrink-0"
            style={{ background: card.accent, color: '#010F1E' }}>T</div>
          <div>
            <div className="font-display font-bold text-white text-base">{card.client || 'Leading Telecom Enterprise'}</div>
            <div className="text-text-muted text-sm">{card.clientDetail || 'Fortune 500 · Telecommunications'}</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: `${card.accent}12`, border: `1px solid ${card.accent}25` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.accent }} />
            <span className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: card.accent }}>Case Study</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="font-display font-black text-white mb-4 tracking-tight leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          {card.title}
        </h3>
        <p className="text-text-secondary text-base mb-10 max-w-2xl leading-relaxed">{card.subtitle}</p>

        {/* Metrics — large editorial tiles like CaseStudy */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {card.metrics.map((m, i) => {
            const metricColors = ['grad-text', 'text-brand-green', 'grad-text', 'text-brand-orange']
            return (
              <div key={m.label} className="mag-card p-6 lg:p-8 text-center">
                <div className={`font-display font-black leading-none mb-3 ${metricColors[i % metricColors.length]}`}
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
                  {m.value}
                </div>
                <div className="text-text-muted text-xs leading-snug">{m.label}</div>
              </div>
            )
          })}
        </div>

        {/* Pull quote like CaseStudy */}
        {card.quote && (
          <div className="relative pl-6 border-l-2" style={{ borderColor: `${card.accent}40` }}>
            <Quote size={20} className="absolute -top-1 -left-2.5" style={{ color: card.accent }} />
            <p className="text-white/85 text-base lg:text-lg italic font-light leading-relaxed">
              &ldquo;{card.quote}&rdquo;
            </p>
            <span className="text-text-muted text-xs mt-3 block">— {card.quoteAuthor || 'Operations Director, Fortune 500 Telecom'}</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PARTNERS CARD — Matches SocialProof logo style
   with marquee-like grid and trust badges
   ═══════════════════════════════════════════════ */
function PartnersCard({ card }) {
  return (
    <div className="rounded-[20px] overflow-hidden relative"
      style={{ background: '#051A30', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #596AE0 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 p-8 lg:p-10">
        <div className="kicker justify-center mb-6" style={{ justifyContent: 'center' }}>Technology Partners</div>
        <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-10 tracking-tight text-center">{card.title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {card.items.map((p) => (
            <div key={p.name}
              className="rounded-2xl p-6 lg:p-7 text-center transition-all duration-300 hover:-translate-y-1 group relative"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(89,106,224,0.08) 0%, transparent 60%)' }} />
              <div className="font-display font-bold text-white text-lg mb-2 relative z-10">{p.name}</div>
              <div className="text-text-muted text-xs relative z-10">{p.role}</div>
            </div>
          ))}
        </div>
        {/* Trust line */}
        <div className="divider mt-8 mb-4" />
        <p className="text-center text-text-muted text-xs">
          Enterprise-grade infrastructure powering mission-critical AI deployments
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   CTA CARD — Matches CTA.jsx with maturity scale
   bars, benefits grid, primary action button
   ═══════════════════════════════════════════════ */
function CTACard({ card }) {
  const levels = [
    { label: 'Reactive', color: '#F05030' },
    { label: 'Emerging', color: '#F0974E' },
    { label: 'Defined', color: '#596AE0' },
    { label: 'Optimized', color: '#91C46B' },
    { label: 'Leading', color: '#00c87d' },
  ]
  const benefits = [
    { icon: BarChart3, text: 'Benchmark against leaders' },
    { icon: Target, text: 'Identify CX gaps' },
    { icon: TrendingUp, text: 'Get AI roadmap' },
    { icon: Shield, text: 'Score in minutes' },
  ]

  return (
    <div className="rounded-[20px] overflow-hidden relative"
      style={{ background: 'rgba(1,15,30,0.9)', border: '1px solid rgba(145,196,107,0.12)' }}>
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(145,196,107,0.08) 0%, transparent 60%)' }} />
      </div>
      <div className="absolute left-0 right-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(145,196,107,0.3) 50%, transparent 90%)' }} />

      <div className="relative z-10 p-10 lg:p-12 text-center">
        <span className="kicker justify-center mb-6" style={{ justifyContent: 'center' }}>CX Maturity Assessment</span>
        <h3 className="font-display font-black text-white tracking-tight mb-4 leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          {card.title}
        </h3>
        <p className="text-text-secondary text-base lg:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          {card.body}
        </p>

        {/* Maturity scale bars like CTA.jsx */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-end justify-between gap-2 mb-3">
            {levels.map((l, i) => (
              <div key={l.label} className="flex-1 flex flex-col items-center">
                <motion.div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${24 + i * 12}px`,
                    background: `linear-gradient(180deg, ${l.color} 0%, ${l.color}40 100%)`,
                    boxShadow: `0 0 16px ${l.color}20`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-2">
            {levels.map(l => (
              <div key={l.label} className="flex-1 text-center">
                <div className="text-[0.6rem] font-display font-semibold" style={{ color: l.color }}>{l.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits grid like CTA.jsx */}
        <div className="grid grid-cols-4 gap-3 mb-10 max-w-md mx-auto">
          {benefits.map(b => (
            <div key={b.text} className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(145,196,107,0.08)', border: '1px solid rgba(145,196,107,0.15)' }}>
                <b.icon size={16} className="text-brand-green" />
              </div>
              <span className="text-text-secondary text-[10px] leading-snug">{b.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {card.actions.map((action, i) => (
            <a
              key={action.label}
              href={action.href}
              className={i === 0
                ? 'btn-primary text-sm !px-10 !py-4 shadow-[0_0_60px_rgba(145,196,107,0.25)]'
                : 'btn-ghost text-sm !px-8 !py-4'}
            >
              {action.label} <ArrowRight size={15} />
            </a>
          ))}
        </div>

        <p className="text-text-muted text-xs mt-4 opacity-60">
          Free · No signup required · Results in under 5 minutes
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SOLUTIONS CARD — Matches Solutions.jsx with
   full-bleed gradient, editorial numbers, screenshots
   ═══════════════════════════════════════════════ */
function SolutionsCard({ card }) {
  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.06) 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <span className="kicker mb-4">Solutions</span>
          <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-3 tracking-tight leading-snug">
            {card.title}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed max-w-xl">{card.subtitle}</p>
        </div>
      </div>

      {/* Individual solution blocks */}
      {card.items.map((s, i) => (
        <motion.div
          key={s.num}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
          className="rounded-[20px] overflow-hidden relative"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Gradient bg */}
          <div className="absolute inset-0" style={{ background: s.gradient }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

          {/* Giant editorial number */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none"
            style={{ fontSize: 'clamp(10rem, 20vw, 18rem)', lineHeight: 0.8, color: 'rgba(255,255,255,0.02)', letterSpacing: '-0.05em' }}>
            {s.num}
          </div>

          <div className="relative z-10 p-8 lg:p-10">
            {/* Label + tags */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}>
                <span className="font-display font-black text-xs" style={{ color: s.accent }}>{s.num}</span>
              </div>
              <span className="text-[0.6rem] font-display font-semibold uppercase tracking-[0.18em]"
                style={{ color: s.accent }}>{s.label}</span>
              <div className="h-px flex-1" style={{ background: `${s.accent}18` }} />
              {s.tags.map(t => (
                <span key={t} className="text-[0.6rem] font-display font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full"
                  style={{ background: `${s.accent}10`, color: `${s.accent}cc`, border: `1px solid ${s.accent}20` }}>
                  {t}
                </span>
              ))}
            </div>

            <h4 className="font-display font-black text-white leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              {s.title}
            </h4>
            <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-2xl">{s.desc}</p>

            {s.details && (
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {s.details.map((d) => (
                  <div key={d} className="flex items-start gap-3 py-2">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: s.accent }} />
                    <span className="text-text-secondary text-sm leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Screenshot */}
            <div className="rounded-2xl overflow-hidden relative"
              style={{
                aspectRatio: '16/9',
                background: s.screenshot ? '#0a0a0a' : s.gradient,
                boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px ${s.accent}08`,
              }}>
              {s.screenshot ? (
                <>
                  <img src={s.screenshot} alt={s.title} className="absolute inset-0 w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 pointer-events-none mix-blend-soft-light" style={{ background: s.accent, opacity: 0.08 }} />
                </>
              ) : (
                <SolutionMockup s={s} />
              )}
              <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${s.accent}30, transparent)` }} />
              <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* Generated mockup for solutions without real screenshots */
function SolutionMockup({ s }) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M-60 300 Q200 120 420 250 Q640 380 880 160" stroke="white" strokeWidth="2" fill="none" opacity="0.1" />
        <path d="M-60 380 Q240 180 440 320 Q640 460 880 240" stroke="white" strokeWidth="1.2" fill="none" opacity="0.06" />
        <ellipse cx="650" cy="100" rx="180" ry="100" fill="rgba(255,255,255,0.025)" />
      </svg>
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <div className="flex-1 h-5 rounded-full mx-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="h-full rounded-full flex items-center px-3">
              <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
                radiant.ai/{s.title.toLowerCase().replace(/\s/g, '-')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4 flex-1 items-end pb-2">
          {[65, 45, 80, 55, 90, 70, 85, 60, 95, 40].map((h, idx) => (
            <div key={idx} className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, background: `${s.accent}${idx % 3 === 0 ? '55' : '22'}` }} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
          <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>Live · {s.label}</span>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   PLATFORMS CARD — Matches Platform.jsx with
   colorful gradient banners, wave SVGs, hex badges
   ═══════════════════════════════════════════════ */
function PlatformsCard({ card }) {
  return (
    <div className="space-y-5">
      <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(89,106,224,0.06) 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <span className="kicker mb-4">Platforms</span>
          <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-3 tracking-tight leading-snug">
            {card.title}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed max-w-xl">{card.subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {card.items.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(1, 15, 30, 0.75)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            }}
          >
            {/* Colorful abstract gradient banner */}
            <div className="relative h-44 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0" style={{ background: p.gradient }} />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 176" preserveAspectRatio="xMidYMid slice" fill="none" opacity="0.35">
                <path d="M-50 120 Q175 50 350 110 Q525 170 750 65" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
                <path d="M-50 145 Q200 75 380 130 Q560 185 750 90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
                <path d="M-50 85 Q150 25 330 90 Q510 155 750 40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
              </svg>
            </div>

            <div className="p-7 flex flex-col flex-1">
              {/* Hex badge */}
              <div className="-mt-14 mb-4">
                <div className="relative inline-flex items-center justify-center w-12 h-12 flex-shrink-0"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(145,196,107,0.35))' }}>
                  <svg viewBox="0 0 52 60" className="absolute inset-0 w-full h-full" fill="none">
                    <path d="M26 2L50 16V44L26 58L2 44V16L26 2Z" fill="#0d2a17" stroke="rgba(145,196,107,0.5)" strokeWidth="1.5" />
                  </svg>
                  <span className="relative font-display font-black text-sm text-brand-green z-10 leading-none">{p.num}</span>
                </div>
              </div>

              <h4 className="font-display font-black text-xl lg:text-2xl text-white mb-3 leading-tight">{p.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">{p.desc}</p>

              <div className="grid grid-cols-2 gap-x-6 mt-auto">
                {p.features.map(f => (
                  <div key={f} className="py-2.5 border-b border-white/[0.08]">
                    <span className="text-sm font-medium text-text-secondary">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   INDUSTRIES CARD — Matches MarketCarousel.jsx
   flip cards with gradient, icon, cutout image
   ═══════════════════════════════════════════════ */
function IndustriesCard({ card }) {
  return (
    <div className="space-y-5">
      <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.06) 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <span className="kicker mb-4">Industries We Serve</span>
          <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-3 tracking-tight leading-snug">
            {card.title}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed max-w-xl">{card.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {card.items.map((m, i) => {
          const Icon = iconMap[m.icon] || Globe
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="ind-flip-card cursor-pointer"
              style={{ height: '420px' }}
            >
              <div className="ind-flip-inner">
                {/* FRONT */}
                <div className="ind-flip-front">
                  <div className="w-full h-full flex flex-col rounded-3xl overflow-hidden"
                    style={{ background: `linear-gradient(160deg, ${m.gradientFrom} 0%, ${m.gradientTo} 100%)` }}>
                    <div className="relative z-10 p-5 lg:p-6">
                      <h4 className="font-display font-bold text-white text-base lg:text-lg leading-snug mb-4 max-w-[200px] drop-shadow-sm">
                        {m.title}
                      </h4>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md"
                        style={{ background: `${m.accent}25`, border: `1.5px solid ${m.accent}50`, boxShadow: `0 4px 16px ${m.accent}15` }}>
                        <Icon size={24} style={{ color: m.accent }} />
                      </div>
                    </div>
                    <div className="flex-1 relative mt-auto">
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0" style={{ clipPath: 'ellipse(85% 100% at 50% 100%)' }}>
                          <img src={m.image} alt={m.title} className="w-full h-full object-cover object-top" loading="lazy" />
                          <div className="absolute top-0 left-0 right-0 h-20"
                            style={{ background: `linear-gradient(to bottom, ${m.gradientTo}cc, transparent)` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="ind-flip-back">
                  <div className="w-full h-full flex flex-col p-5 lg:p-6 rounded-3xl overflow-hidden"
                    style={{ background: `linear-gradient(160deg, ${m.gradientFrom} 0%, ${m.gradientFrom}ee 40%, ${m.gradientTo}88 100%)` }}>
                    <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-15 pointer-events-none"
                      style={{ background: m.accent }} />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                      style={{ background: m.accent }} />

                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: `${m.accent}30`, border: `1.5px solid ${m.accent}50` }}>
                        <Icon size={18} style={{ color: m.accent }} />
                      </div>
                      <h4 className="font-display font-bold text-white text-sm lg:text-base leading-snug mb-2">{m.title}</h4>
                      <p className="text-white/75 text-xs leading-relaxed mb-4">{m.desc}</p>
                    </div>

                    <div className="relative z-10 grid grid-cols-3 gap-1.5 mb-4">
                      {m.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-lg p-2 text-center"
                          style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${m.accent}30` }}>
                          <div className="font-display font-bold text-lg leading-none mb-0.5" style={{ color: m.accent }}>
                            {metric.value}
                          </div>
                          <div className="text-white/50 text-[8px] uppercase tracking-wider font-medium leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1" />

                    <div className="relative z-10 px-3 py-2.5 rounded-lg"
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="text-[8px] uppercase tracking-[0.2em] text-white/45 mb-0.5 font-semibold">Key Clients</div>
                      <div className="text-white text-xs font-medium">{m.clients}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <style>{`
        .ind-flip-card { perspective: 1000px; }
        .ind-flip-inner {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .ind-flip-card:hover .ind-flip-inner { transform: rotateY(180deg); }
        .ind-flip-card:hover { transform: scale(1.04); z-index: 10; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .ind-flip-front, .ind-flip-back {
          position: absolute; inset: 0;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
          border-radius: 1.5rem; overflow: hidden;
        }
        .ind-flip-back { transform: rotateY(180deg); }
      `}</style>
    </div>
  )
}

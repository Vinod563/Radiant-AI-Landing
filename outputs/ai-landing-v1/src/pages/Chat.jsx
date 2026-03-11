import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
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
} from 'lucide-react'
import { findAnswer, suggestions } from '../data/knowledgeBase.js'

const iconMap = {
  Layers, PenTool, Receipt, Globe, BarChart3, Zap, Bot, Brain,
  Search, Database, Cpu, Users, TrendingUp,
}

export default function Chat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (query) => {
    const q = typeof query === 'string' ? query : input
    if (!q.trim()) return

    const userMsg = { role: 'user', content: q.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const answer = findAnswer(q)
      const botMsg = { role: 'assistant', cards: answer.cards, id: answer.id }
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
    <div className="min-h-screen bg-[#010F1E] flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]"
        style={{ background: 'rgba(1,15,30,0.85)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-text-secondary hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            <span className="font-display font-semibold">Back</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(145,196,107,0.12)', border: '1px solid rgba(145,196,107,0.2)' }}>
              <Sparkles size={15} className="text-brand-green" />
            </div>
            <span className="font-display font-bold text-sm text-white">Radiant AI</span>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatePresence mode="popLayout">
            {!hasMessages && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pt-[12vh] pb-10 text-center"
              >
                {/* Animated icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-2xl mx-auto mb-10 flex items-center justify-center relative"
                  style={{ background: 'rgba(145,196,107,0.08)', border: '1px solid rgba(145,196,107,0.12)' }}
                >
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(145,196,107,0.15) 0%, transparent 70%)' }} />
                  <Sparkles size={32} className="text-brand-green relative z-10" />
                </motion.div>

                <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-5 tracking-tight">
                  How can I help?
                </h1>
                <p className="text-text-secondary text-lg max-w-lg mx-auto mb-14 leading-relaxed">
                  Explore Radiant Digital — our AI solutions, industries, case studies, platform, and more.
                </p>

                {/* Suggestion grid — card-based */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                  {suggestions.map((s, i) => {
                    const colors = ['#91C46B', '#596AE0', '#F0974E', '#a855f7', '#2DD4BF', '#e05990', '#596AE0', '#91C46B']
                    const c = colors[i % colors.length]
                    return (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSubmit(s)}
                        className="text-left p-5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,0.025)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at 50% 0%, ${c}12 0%, transparent 70%)` }} />
                        <div className="w-2 h-2 rounded-full mb-3 relative z-10" style={{ background: c }} />
                        <span className="text-white/80 text-sm font-medium leading-snug relative z-10 group-hover:text-white transition-colors block">
                          {s}
                        </span>
                        <ChevronRight size={14} className="mt-3 text-white/20 group-hover:text-white/50 transition-colors relative z-10" />
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Chat messages */}
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
                  <AssistantCards cards={msg.cards} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
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

          {/* Follow-up suggestions */}
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
                  {suggestions
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

      {/* Input bar — fixed at bottom */}
      <div className="sticky bottom-0 z-50"
        style={{ background: 'linear-gradient(180deg, rgba(1,15,30,0) 0%, rgba(1,15,30,0.95) 30%, rgba(1,15,30,1) 50%)' }}>
        <div className="max-w-5xl mx-auto px-6 pt-4 pb-6">
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
              placeholder="Ask anything about Radiant Digital..."
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
function AssistantCards({ cards }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
        style={{ background: 'rgba(145,196,107,0.1)', border: '1px solid rgba(145,196,107,0.15)' }}>
        <Sparkles size={16} className="text-brand-green" />
      </div>
      <div className="flex-1 space-y-5 min-w-0">
        {cards.map((card, i) => (
          <CardRenderer key={i} card={card} index={i} />
        ))}
      </div>
    </div>
  )
}

/* ── Card Router ── */
function CardRenderer({ card, index }) {
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
      {card.type === 'list' && <ListCard card={card} />}
      {card.type === 'case-study' && <CaseStudyCard card={card} />}
      {card.type === 'partners' && <PartnersCard card={card} />}
      {card.type === 'cta' && <CTACard card={card} />}
    </motion.div>
  )
}

/* ── HERO CARD — Large editorial style like mag-card ── */
function HeroCard({ card }) {
  return (
    <div className="mag-card p-10 lg:p-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${card.accent}10 0%, transparent 60%)` }} />
      {/* Editorial bg letter */}
      <div className="absolute -right-4 -top-4 font-display font-black text-[12rem] leading-none text-white/[0.02] pointer-events-none select-none">
        R
      </div>
      <div className="relative z-10">
        <div className="w-1.5 h-10 rounded-full mb-6" style={{ background: card.accent }} />
        <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-4 tracking-tight leading-snug">
          {card.title}
        </h3>
        <p className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-xl">
          {card.subtitle}
        </p>
      </div>
    </div>
  )
}

/* ── METRICS CARD — Large stat tiles like CaseStudy ── */
function MetricsCard({ card }) {
  return (
    <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 80% 0%, ${card.accent}08 0%, transparent 60%)` }} />
      <h4 className="font-display font-semibold text-xs text-white/40 uppercase tracking-[0.2em] mb-8 relative z-10">
        {card.title}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
        {card.items.map((item) => (
          <div key={item.label}
            className="rounded-2xl p-6 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${card.accent}15` }}
          >
            <div className="font-display font-black text-3xl lg:text-4xl leading-none mb-2" style={{ color: card.accent }}>
              {item.value}
            </div>
            <div className="text-text-muted text-xs font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── TEXT CARD — Pull-quote editorial style ── */
function TextCard({ card }) {
  return (
    <div className="mag-card p-10 lg:p-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 100%, ${card.accent}08 0%, transparent 60%)` }} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-10 rounded-full" style={{ background: card.accent }} />
          <h3 className="font-display font-bold text-xl lg:text-2xl text-white tracking-tight">{card.title}</h3>
        </div>
        <p className="text-text-secondary text-base lg:text-lg leading-[1.9] max-w-2xl">
          {card.body}
        </p>
      </div>
    </div>
  )
}

/* ── GRID CARD — Solution-style cards with icons ── */
function GridCard({ card }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.accent}08 0%, transparent 50%)` }} />
        <div className="relative z-10">
          <h3 className="font-display font-black text-xl lg:text-2xl text-white mb-2 tracking-tight">{card.title}</h3>
          {card.subtitle && <p className="text-text-secondary text-base">{card.subtitle}</p>}
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {card.items.map((item) => {
          const Icon = iconMap[item.icon] || Layers
          return (
            <motion.div
              key={item.name}
              whileHover={{ y: -4 }}
              className="mag-card p-7 relative overflow-hidden group"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 0%, ${item.accent}12 0%, transparent 60%)` }} />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${item.accent}12`, border: `1.5px solid ${item.accent}25` }}
                >
                  <Icon size={20} style={{ color: item.accent }} />
                </div>
                <h4 className="font-display font-bold text-white text-base mb-2">{item.name}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ── LIST CARD — Industry/service rows with metrics ── */
function ListCard({ card }) {
  return (
    <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${card.accent}06 0%, transparent 50%)` }} />
      <div className="relative z-10">
        <h3 className="font-display font-black text-xl lg:text-2xl text-white mb-2 tracking-tight">{card.title}</h3>
        {card.subtitle && <p className="text-text-secondary text-base mb-8">{card.subtitle}</p>}
        <div className="space-y-3">
          {card.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-center justify-between py-4 px-5 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: `1px solid ${item.accent}12`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                  style={{ background: item.accent, boxShadow: `0 0 12px ${item.accent}30` }} />
                <span className="font-display font-semibold text-white text-[15px]">{item.name}</span>
              </div>
              <span className="text-sm font-bold font-display tracking-tight" style={{ color: item.accent }}>
                {item.metric}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── CASE STUDY CARD — Full editorial treatment ── */
function CaseStudyCard({ card }) {
  return (
    <div className="rounded-[20px] overflow-hidden relative"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>

      {/* Rainbow accent stripe */}
      <div className="h-1.5"
        style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}60, transparent)` }} />

      <div className="p-10 lg:p-12">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 20% 10%, ${card.accent}08 0%, transparent 50%)` }} />

        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 relative z-10"
          style={{ background: `${card.accent}12`, border: `1px solid ${card.accent}20` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.accent }} />
          <span className="text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: card.accent }}>
            Case Study
          </span>
        </div>

        <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-3 tracking-tight relative z-10">
          {card.title}
        </h3>
        <p className="text-text-secondary text-base mb-10 relative z-10 max-w-xl">{card.subtitle}</p>

        {/* Metrics — large editorial grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
          {card.metrics.map((m) => (
            <div key={m.label}
              className="rounded-2xl p-6 text-center"
              style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${card.accent}18` }}
            >
              <div className="font-display font-black text-3xl lg:text-4xl leading-none mb-2" style={{ color: card.accent }}>
                {m.value}
              </div>
              <div className="text-text-muted text-xs font-medium">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        {card.quote && (
          <div className="relative z-10 pl-6 border-l-2 py-2" style={{ borderColor: `${card.accent}40` }}>
            <Quote size={18} className="mb-2 opacity-40" style={{ color: card.accent }} />
            <p className="text-white/80 text-base lg:text-lg italic leading-relaxed font-light">
              &ldquo;{card.quote}&rdquo;
            </p>
            <span className="text-text-muted text-xs mt-3 block">— Operations Director, Fortune 500 Telecom</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── PARTNERS CARD — Clean grid ── */
function PartnersCard({ card }) {
  return (
    <div className="mag-card p-8 lg:p-10 relative overflow-hidden">
      <h3 className="font-display font-black text-xl lg:text-2xl text-white mb-8 tracking-tight">{card.title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {card.items.map((p) => (
          <div key={p.name}
            className="rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="font-display font-bold text-white text-base mb-1.5">{p.name}</div>
            <div className="text-text-muted text-xs">{p.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── CTA CARD — Full-width action card ── */
function CTACard({ card }) {
  return (
    <div className="rounded-[20px] p-10 lg:p-12 text-center relative overflow-hidden"
      style={{ background: 'rgba(145,196,107,0.04)', border: '1px solid rgba(145,196,107,0.12)' }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(145,196,107,0.08) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(89,106,224,0.05) 0%, transparent 60%)' }} />

      <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-4 tracking-tight relative z-10">
        {card.title}
      </h3>
      <p className="text-text-secondary text-base lg:text-lg mb-8 max-w-md mx-auto relative z-10 leading-relaxed">
        {card.body}
      </p>
      <div className="flex flex-wrap justify-center gap-4 relative z-10">
        {card.actions.map((action, i) => (
          <a
            key={action.label}
            href={action.href}
            className={i === 0 ? 'btn-primary text-sm !px-8 !py-4' : 'btn-ghost text-sm !px-8 !py-4'}
          >
            {action.label} <ArrowRight size={15} />
          </a>
        ))}
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin, MessageSquare, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteContentContext } from '../../context/SiteContentContext'

const contactReasonIcons = [MessageSquare, Sparkles]
const contactReasonAccents = ['#91C46B', '#596AE0']

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { content } = useSiteContentContext()
  const ctaData = content.cta || {}
  const contactData = content.contact || {}
  const contactReasons = [
    { icon: MessageSquare, text: 'Discuss your AI transformation goals', accent: '#91C46B' },
    { icon: Sparkles,      text: 'Get a tailored solution recommendation', accent: '#596AE0' },
  ]

  return (
    <section id="contact" className="py-28 lg:py-36 bg-brand-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(145,196,107,0.08) 0%, transparent 60%)' }} />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Copy */}
          <motion.div ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="kicker">{ctaData.kicker || "Let's Talk"}</span>
            <h2 className="font-display font-black leading-[0.92] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>
              {(ctaData.headline || 'Ready to transform\nyour enterprise with AI?').split('\n')[0]}<br />
              <span className="grad-text">{(ctaData.headline || 'Ready to transform\nyour enterprise with AI?').split('\n')[1]}</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-lg">
              {ctaData.body || 'Whether you are exploring AI for the first time or scaling existing deployments, our team is ready to help you build the right roadmap and deliver measurable outcomes.'}
            </p>

            {/* Reasons */}
            <div className="space-y-4 mb-10">
              {contactReasons.map(r => (
                <div key={r.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${r.accent}12`, border: `1px solid ${r.accent}25` }}>
                    <r.icon size={18} style={{ color: r.accent }} />
                  </div>
                  <span className="text-text-secondary text-base">{r.text}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-6 text-sm text-text-muted">
              <a href={`mailto:${contactData.email || 'hello@radiant.digital'}`} className="flex items-center gap-2 hover:text-brand-green transition-colors">
                <Mail size={14} /> {contactData.email || 'hello@radiant.digital'}
              </a>
              <a href={`tel:${(contactData.phone || '301.306.5102').replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-brand-green transition-colors">
                <Phone size={14} /> {contactData.phone || '301.306.5102'}
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> {contactData.address || 'Vienna, VA'}
              </span>
            </div>
          </motion.div>

          {/* Right — CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-3xl p-8 sm:p-10 lg:p-12 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(145,196,107,0.15)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
              }}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(145,196,107,0.06) 0%, transparent 60%)' }} />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'rgba(145,196,107,0.1)', border: '1px solid rgba(145,196,107,0.25)' }}>
                  <MessageSquare size={28} className="text-brand-green" />
                </div>

                <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-3 tracking-tight">
                  {ctaData.cardHeadline || 'Connect with Us'}
                </h3>
                <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-sm mx-auto">
                  {ctaData.cardBody || 'Reach out to our team directly. Share your goals and challenges, and we will get back to you with a tailored plan.'}
                </p>

                {/* Primary CTA — opens chat contact form */}
                <Link
                  to="/chat?q=I%27d%20rather%20talk%20to%20a%20real%20person."
                  className="btn-primary text-base !px-10 !py-5 shadow-[0_0_60px_rgba(145,196,107,0.25)] w-full sm:w-auto justify-center"
                >
                  Let's Talk <ArrowRight size={17} />
                </Link>

                <p className="text-text-muted text-xs mt-5">
                  {ctaData.responseNote || 'Our team typically responds within one business day'}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════
   AI READINESS WIDGET — Saved for future use.
   To restore, swap the default export back to this component.
   ═══════════════════════════════════════════════════════ */
export { AIReadinessWidget }

const readinessLevels = [
  { label: 'Reactive', desc: 'Manual processes, siloed data', color: '#F05030' },
  { label: 'Emerging', desc: 'Basic analytics, some automation', color: '#F0974E' },
  { label: 'Defined', desc: 'Unified data, journey mapping', color: '#596AE0' },
  { label: 'Optimized', desc: 'AI-driven, proactive CX', color: '#91C46B' },
  { label: 'Leading', desc: 'Agentic AI, outcome-linked', color: '#00c87d' },
]

const readinessBenefits = [
  { icon: 'BarChart3', text: 'Benchmark against industry leaders' },
  { icon: 'Target', text: 'Identify your biggest CX gaps' },
  { icon: 'TrendingUp', text: 'Get a prioritized AI roadmap' },
  { icon: 'Shield', text: 'Receive your score in minutes' },
]

function AIReadinessWidget() {
  return {
    levels: readinessLevels,
    benefits: readinessBenefits,
    headline: 'Where does your enterprise stand on AI readiness?',
    subtext: 'Five minutes. No signup. A prioritized roadmap that tells you where you are, where the gaps are, and which AI deployments would produce the fastest results.',
    cta: 'Take the Assessment',
    note: 'Free · No signup required · Results in under 5 minutes',
  }
}

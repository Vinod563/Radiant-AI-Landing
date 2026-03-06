import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { KeyRound, ClipboardList, ScrollText, ShieldCheck } from 'lucide-react'

const items = [
  { num:'01', icon: KeyRound,     color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Role-Based Access Control', desc: 'Granular permissions engine with SSO integration, multi-tenant isolation, and audit-ready access logging across every user action and data access event.', badges: ['SSO', 'MFA', 'RBAC'] },
  { num:'02', icon: ClipboardList,color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Compliance Standards',       desc: 'Meets the most stringent enterprise and regulatory compliance requirements — ensuring your CX data is handled to the highest legal and ethical standards.',  badges: ['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001'] },
  { num:'03', icon: ScrollText,   color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', title: 'Full Auditability',          desc: 'Complete audit trails for every data access, model decision, and workflow execution — giving compliance teams the transparency and traceability they require.', badges: ['Audit Logs', 'AI Explainability'] },
  { num:'04', icon: ShieldCheck,  color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Data Protection Framework',  desc: 'End-to-end encryption at rest and in transit, data residency controls, anonymization pipelines, and zero-trust network architecture throughout.',            badges: ['AES-256', 'Zero-Trust', 'DLP'] },
]

export default function ICXSecurity() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="kicker">Trust &amp; Compliance</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Enterprise-Grade Security —<br />
            <span className="grad-text">Built In,</span><br />
            Not Bolted On.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Engineered for the security and compliance requirements of the world's most regulated industries — defense, finance, healthcare, and telecom.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`mag-card p-7 border ${item.border} flex flex-col`}
              >
                <div className={`font-display font-black text-4xl leading-none mb-5 opacity-15 ${item.color}`}>{item.num}</div>
                <div className={`w-10 h-10 rounded-2xl ${item.bg} flex items-center justify-center mb-4`}>
                  <Icon size={17} className={item.color} />
                </div>
                <h3 className="font-display font-bold text-base text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.badges.map(b => (
                    <span key={b} className="text-[0.65rem] font-display font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-text-muted">{b}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

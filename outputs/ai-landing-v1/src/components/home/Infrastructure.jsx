import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SiGooglecloud, SiNvidia, SiOpenai, SiAnthropic } from 'react-icons/si'
import { FaAws, FaMicrosoft } from 'react-icons/fa'

const partners = [
  { name: 'AWS',             note: 'Cloud Infrastructure', icon: FaAws },
  { name: 'Google Cloud',    note: 'AI & ML Platform',     icon: SiGooglecloud },
  { name: 'Microsoft Azure', note: 'Enterprise Cloud',     icon: FaMicrosoft },
  { name: 'NVIDIA',          note: 'GPU Acceleration',     icon: SiNvidia },
  { name: 'OpenAI',          note: 'Foundation Models',    icon: SiOpenai },
  { name: 'Anthropic',       note: 'Safety-First AI',      icon: SiAnthropic },
]

export default function Infrastructure() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="infrastructure" className="py-24 bg-brand-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="hr-label">Powered by world-class infrastructure</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="mag-card p-5 flex flex-col items-center group cursor-default"
            >
              <div className="h-10 flex items-center justify-center mb-3">
                <p.icon className="w-8 h-8 text-white/50 group-hover:text-white/90 transition-colors duration-400" />
              </div>
              <div className="font-display font-bold text-sm text-text-secondary group-hover:text-text-primary transition-colors mb-1">{p.name}</div>
              <div className="text-[0.6rem] text-text-muted">{p.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

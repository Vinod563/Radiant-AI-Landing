import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Briefcase, TrendingUp, Cpu } from 'lucide-react'

const clients = [
  { name: 'Lockheed Martin', sector: 'Defense & Aerospace' },
  { name: 'Boeing', sector: 'Aviation & Defense' },
  { name: 'Verizon', sector: 'Telecommunications' },
  { name: 'Wells Fargo', sector: 'Financial Services' },
  { name: 'HHS', sector: 'Federal Health' },
  { name: 'USDA', sector: 'Federal Government' },
  { name: 'Deloitte', sector: 'Consulting & Advisory' },
  { name: 'Accenture', sector: 'Technology Services' },
]

const stats = [
  { value: '18+', label: 'Years of Delivery', icon: Award },
  { value: '50+', label: 'Enterprise Clients', icon: Briefcase },
  { value: '$2B+', label: 'Programs Supported', icon: TrendingUp },
  { value: '6', label: 'Industries Served', icon: Cpu },
]

const industries = [
  'Defense & Intelligence',
  'Federal Civilian',
  'Financial Services',
  'Healthcare & Life Sciences',
  'Telecommunications',
  'Energy & Utilities',
]

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 lg:py-40 bg-brand-deep relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <span className="label" style={{ justifyContent: 'center', display: 'flex' }}>Trusted Partners</span>
          <h2 className="font-heading font-extrabold text-display text-white mb-4">
            The World's Most Demanding<br />
            Enterprises <span className="text-brand-green">Choose Radiant.</span>
          </h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            From defense agencies to Fortune 500 companies, the world's most security-conscious
            organizations trust Radiant to deliver mission-critical solutions.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 mb-20 rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08]"
        >
          {stats.map((s, i) => (
            <div key={s.label}
              className={`flex flex-col items-center text-center py-10 ${
                i < stats.length - 1 ? 'border-r border-white/[0.08]' : ''
              }`}
            >
              <s.icon className="w-5 h-5 mb-3 text-brand-green" />
              <div className="stat-number text-white mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {s.value}
              </div>
              <div className="text-white/50 text-xs font-semibold tracking-wide uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Client marquee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16 overflow-hidden"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #1A1714, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #1A1714, transparent)' }} />

          <div className="flex w-max marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <div key={`${c.name}-${i}`}
                className="flex-shrink-0 mx-4 bg-white/[0.03] rounded-xl px-8 py-6 border border-white/[0.08]
                  hover:border-brand-green/40 transition-colors duration-300"
                style={{ width: '280px' }}
              >
                <div className="font-sans font-semibold text-white text-sm mb-1">{c.name}</div>
                <div className="text-white/50 text-xs">{c.sector}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="hr-label mb-8">Industries We Serve</div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.06 }}
                className="tag"
              >
                {ind}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-10"
        >
          <div className="divider mb-10" />
          <p className="text-center text-white/50 text-sm leading-relaxed max-w-xl mx-auto">
            Clearance-ready teams &bull; FedRAMP aligned &bull; CMMC compliant &bull; SOC 2 certified
          </p>
        </motion.div>
      </div>
    </section>
  )
}

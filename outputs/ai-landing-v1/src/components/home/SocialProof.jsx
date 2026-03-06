import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, TrendingUp, Cpu, Briefcase } from 'lucide-react'

const clients = [
  { name: 'Lockheed Martin', sector: 'Defense & Aerospace', accent: '#596AE0',
    logo: 'https://logo.clearbit.com/lockheedmartin.com' },
  { name: 'Boeing', sector: 'Aviation & Defense', accent: '#F0974E',
    logo: 'https://logo.clearbit.com/boeing.com' },
  { name: 'Verizon', sector: 'Telecommunications', accent: '#91C46B',
    logo: 'https://logo.clearbit.com/verizon.com' },
  { name: 'Wells Fargo', sector: 'Financial Services', accent: '#596AE0',
    logo: 'https://logo.clearbit.com/wellsfargo.com' },
  { name: 'HHS', sector: 'Federal Health', accent: '#F0974E',
    logo: 'https://logo.clearbit.com/hhs.gov' },
  { name: 'USDA', sector: 'Federal Government', accent: '#91C46B',
    logo: 'https://logo.clearbit.com/usda.gov' },
  { name: 'Deloitte', sector: 'Consulting & Advisory', accent: '#91C46B',
    logo: 'https://logo.clearbit.com/deloitte.com' },
  { name: 'Accenture', sector: 'Technology Services', accent: '#596AE0',
    logo: 'https://logo.clearbit.com/accenture.com' },
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
    <section className="relative py-32 overflow-hidden" style={{ background: '#051A30' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #91C46B 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #596AE0 0%, transparent 70%)' }} />
      </div>

      {/* Large background text */}
      <div className="editorial-bg-num top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        style={{ fontSize: 'clamp(6rem, 14vw, 14rem)' }}>
        TRUSTED
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <div className="kicker justify-center">Trusted Customer</div>
          <h2 className="font-display font-black leading-[0.92] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
            The World's Most Demanding<br />
            Enterprises{' '}
            <span className="grad-text">Choose Radiant.</span>
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            From defense agencies to Fortune 500 companies, the world's most security-conscious
            organizations trust Radiant to deliver mission-critical digital solutions.
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 mb-20 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {stats.map((s) => (
            <div key={s.label} className="metric-strip-item py-8 md:py-10">
              <s.icon className="w-5 h-5 mb-3" style={{ color: '#91C46B', opacity: 0.7 }} />
              <div className="pull-stat mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {s.value}
              </div>
              <div className="text-text-muted text-xs font-semibold tracking-wide uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Auto-sliding client marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative mb-16 overflow-hidden"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #051A30, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #051A30, transparent)' }} />

          {/* Marquee track — duplicated for seamless loop */}
          <div className="flex w-max marquee-track hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="mag-card group relative flex-shrink-0 mx-3"
                style={{ width: '310px' }}
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, ${c.accent}, transparent)`,
                    opacity: 0.5,
                  }} />

                <div className="relative z-10 p-6">
                  {/* Logo area */}
                  <div className="h-16 flex items-center mb-5">
                    <img
                      src={c.logo}
                      alt={`${c.name} logo`}
                      className="max-h-12 max-w-[180px] object-contain brightness-0 invert opacity-70
                        group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-4"
                    style={{ background: `linear-gradient(90deg, ${c.accent}30, transparent)` }} />

                  {/* Info row */}
                  <div>
                    <div className="font-display font-semibold text-sm text-text-primary leading-tight">
                      {c.name}
                    </div>
                    <div className="text-text-muted text-xs mt-0.5">{c.sector}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Industries served ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <div className="hr-label mb-8">Industries We Serve</div>

          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.65 + i * 0.06 }}
                className="tag"
              >
                {ind}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom trust line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 pt-10"
        >
          <div className="divider mb-10" />
          <p className="text-center text-text-muted text-sm leading-relaxed max-w-xl mx-auto">
            Clearance-ready teams &bull; FedRAMP aligned &bull; CMMC compliant &bull; SOC 2 certified
          </p>
        </motion.div>
      </div>
    </section>
  )
}

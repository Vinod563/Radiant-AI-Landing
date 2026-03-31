import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, TrendingUp, DollarSign, Briefcase } from 'lucide-react'

/* Client logos sourced from Radiant Digital website */
const clientLogos = [
  '/logos/client-21.svg',
  '/logos/client-22.svg',
  '/logos/client-25.svg',
  '/logos/client-26.svg',
  '/logos/client-28.svg',
  '/logos/client-29.svg',
  '/logos/client-24.svg',
  '/logos/client-31.svg',
  '/logos/client-35.svg',
  '/logos/client-36.svg',
  '/logos/client-37.svg',
  '/logos/client-39.svg',
  '/logos/client-23.svg',
  '/logos/client-30-1.svg',
  '/logos/client-38.svg',
  '/logos/client-11-1-1.svg',
  '/logos/client-27-1.svg',
  '/logos/client-32-1.svg',
  '/logos/client-33-1.svg',
  '/logos/client-new-logo.svg',
]

const stats = [
  { value: '20+', label: 'Years of Transformation', icon: Award },
  { value: '50+', label: 'Enterprise Clients', icon: Briefcase },
  { value: '$2B+', label: 'Programs Powered', icon: TrendingUp },
  { value: '40%', label: 'Avg Cost Reduction', icon: DollarSign },
]


export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="social-proof" className="relative py-32 overflow-hidden bg-brand-secondary">
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
          <div className="kicker justify-center">Customers</div>
          <h2 className="font-display font-black leading-[0.92] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
            50+ Enterprises.<br />
            $2B+ in Programs.{' '}
            <span className="grad-text">Real Results.</span>
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            The proof is in who keeps coming back. Fortune 500s and federal agencies choose Radiant Digital because we tie every engagement to measurable business impact, not billable hours.
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
              <s.icon className="w-5 h-5 mb-3 text-brand-green opacity-70" aria-hidden="true" />
              <h3 className="pull-stat mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {s.value}
              </h3>
              <div className="text-text-muted text-xs font-semibold tracking-wide uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Auto-sliding client logo marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative mb-16 overflow-hidden"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--color-brand-secondary, #051A30), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--color-brand-secondary, #051A30), transparent)' }} />

          {/* Marquee track — duplicated for seamless loop */}
          <div className="flex w-max marquee-track hover:[animation-play-state:paused]">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={`logo-${i}`}
                className="flex-shrink-0 mx-5 flex items-center justify-center h-28"
                style={{ width: '216px' }}
              >
                <img
                  src={logo}
                  alt={`Client partner logo ${i + 1}`}
                  className="max-h-20 max-w-[196px] w-full object-contain brightness-0 invert opacity-60
                    hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom trust line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-10"
        >
          <div className="divider mb-10" />
          <p className="text-center text-text-muted text-sm leading-relaxed max-w-xl mx-auto">
            CMMC compliant
          </p>
        </motion.div>
      </div>
    </section>
  )
}

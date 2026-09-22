import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { leadership } from '../../data/siteContent.js'

const COLS = 5

export default function Leadership() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="leadership" className="relative py-32 overflow-hidden bg-brand-secondary">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[700px] h-[700px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #596AE0 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #91C46B 0%, transparent 70%)' }} />
      </div>

      {/* Large background text */}
      <div className="editorial-bg-num top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        style={{ fontSize: 'clamp(6rem, 14vw, 14rem)' }}>
        LEADERS
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <div className="kicker justify-center">{leadership.kicker}</div>
          <h2 className="font-display font-black leading-[0.92] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
            {leadership.headline.split('\n').map((line, i, arr) =>
              i === arr.length - 1
                ? <span key={i} className="grad-text">{line}</span>
                : <span key={i}>{line}<br /></span>
            )}
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            {leadership.body}
          </p>
        </motion.div>

        {/* ── Portrait grid ── */}
        {/* 2 and 5 are the only counts that divide 10 evenly — no orphan row
            at any breakpoint, and the portraits never get cramped */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
          {leadership.people.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                // Ripple across each row, then down to the next
                delay: 0.12 + (i % COLS) * 0.07 + Math.floor(i / COLS) * 0.12,
              }}
              className="portrait-card"
            >
              <div className="portrait-frame">
                <img
                  src={person.photo}
                  alt={`${person.name}, ${person.role}`}
                  width={512}
                  height={512}
                  loading="lazy"
                  decoding="async"
                  className="portrait-img"
                />
                <div className="portrait-duotone" aria-hidden="true" />
                <div className="portrait-scrim" aria-hidden="true" />
                <div className="portrait-sheen" aria-hidden="true" />
              </div>

              <div className="portrait-meta">
                <h3 className="portrait-name font-display font-bold text-text-primary leading-snug text-[13px] lg:text-sm">
                  {person.name}
                </h3>
                <span className="portrait-rule" aria-hidden="true" />
                <p className="portrait-role text-[11px] leading-snug">
                  {person.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

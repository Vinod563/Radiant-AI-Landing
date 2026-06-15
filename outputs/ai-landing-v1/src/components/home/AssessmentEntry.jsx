import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { entryContent, readinessLevels, readinessBenefits, assessments } from '../../data/assessmentContent.js'

export default function AssessmentEntry() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="assessment" className="py-28 lg:py-36 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(89,106,224,0.07) 0%, transparent 55%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy + maturity scale */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="kicker">{entryContent.eyebrow}</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
              {entryContent.headline}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-9 max-w-lg">{entryContent.subtext}</p>

            {/* Maturity scale */}
            <div className="flex items-end gap-2 mb-7">
              {readinessLevels.map((lvl, i) => (
                <motion.div key={lvl.label} className="flex-1 text-center"
                  initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}>
                  <div className="rounded-t-md mb-2" style={{ height: `${24 + i * 14}px`, background: lvl.color, opacity: 0.85 }} />
                  <div className="text-[10px] font-display font-bold text-white leading-tight">{lvl.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {readinessBenefits.map(b => (
                <div key={b.text} className="flex items-center gap-2.5">
                  <b.icon size={15} className="text-brand-green flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{b.text}</span>
                </div>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-6">{entryContent.note}</p>
          </motion.div>

          {/* Right — two assessment cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4">
            {assessments.map(a => (
              <Link key={a.key} to={a.route}
                className="group block rounded-2xl p-6 lg:p-7 no-underline relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${a.accent}26` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 0%, ${a.accent}12 0%, transparent 65%)` }} />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${a.accent}18`, border: `1px solid ${a.accent}33` }}>
                    <a.icon size={22} style={{ color: a.accent }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-display font-bold uppercase tracking-widest mb-1.5" style={{ color: a.accent }}>{a.eyebrow}</div>
                    <h3 className="font-display font-bold text-white text-lg leading-snug mb-1.5">{a.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">{a.desc}</p>
                    <span className="inline-flex items-center gap-1.5 font-display font-semibold text-sm" style={{ color: a.accent }}>
                      {a.duration} · Start <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

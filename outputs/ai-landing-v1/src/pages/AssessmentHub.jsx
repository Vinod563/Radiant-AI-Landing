import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import { assessments } from '../data/assessmentContent.js'

export default function AssessmentHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <main className="pt-32 pb-28 lg:pt-40 lg:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.08) 0%, transparent 55%)' }} />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
            <motion.span className="kicker justify-center" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
              Free Assessments
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-white leading-[0.95] tracking-tight mt-4 mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
              Find out where <span className="grad-text">you stand</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-text-secondary text-lg leading-relaxed">
              Two short, self-serve diagnostics. No signup. Get a clear read on your maturity,
              your biggest gaps, and the next move that produces the fastest results.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {assessments.map((a, i) => (
              <motion.div key={a.key}
                initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}>
                <Link to={a.route} className="group block h-full rounded-3xl p-8 lg:p-10 relative overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${a.accent}26` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${a.accent}12 0%, transparent 65%)` }} />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${a.accent}18`, border: `1px solid ${a.accent}33` }}>
                      <a.icon size={26} style={{ color: a.accent }} />
                    </div>
                    <div className="text-[11px] font-display font-bold uppercase tracking-widest mb-3" style={{ color: a.accent }}>
                      {a.eyebrow}
                    </div>
                    <h2 className="font-display font-black text-white text-2xl leading-tight tracking-tight mb-3">{a.title}</h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">{a.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-7">
                      {a.meta.map(m => (
                        <span key={m} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: `${a.accent}12`, color: a.accent, border: `1px solid ${a.accent}25` }}>{m}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-text-muted text-xs"><Clock size={13} /> {a.duration}</span>
                      <span className="flex items-center gap-1.5 font-display font-semibold text-sm" style={{ color: a.accent }}>
                        Start <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

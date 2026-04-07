import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Quote } from 'lucide-react'

export default function ICXSocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-5" ref={ref}>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mag-card p-8 border border-white/[0.08] flex flex-col"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-green to-transparent rounded-t-2xl" style={{ position: 'relative', height: '2px', background: 'linear-gradient(90deg, #91C46B, transparent)', marginBottom: '24px', borderRadius: '2px' }} />
            <Quote size={28} className="text-brand-green/40 mb-4" />
            <p className="text-text-secondary text-[0.95rem] leading-relaxed italic flex-1 mb-6">
              "ICX AI gave us a single source of truth across every customer touchpoint. We went from reactive firefighting to predicting issues before customers even notice them."
            </p>
            <div>
              <div className="font-display font-bold text-sm text-text-primary">VP of Customer Experience</div>
              <div className="text-text-muted text-xs mt-0.5">Global Telecom Enterprise</div>
            </div>
          </motion.div>

          {/* Feature card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mag-card p-8 border border-brand-orange/20 flex flex-col"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-5">
              <Brain size={20} className="text-brand-orange" />
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary mb-3">
              The Only Platform That Closes the Loop
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed flex-1">
              ICX AI is the only CX platform that unifies omnichannel signals, applies predictive AI, and automates resolution workflows — all in one enterprise-grade intelligence layer.
            </p>
          </motion.div>

          {/* Metric card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mag-card p-8 border border-brand-green/20 flex flex-col justify-between"
          >
            <div>
              <div className="pull-stat mb-3">66%</div>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                Increase in customer satisfaction scores within <strong className="text-text-primary">90 days</strong> of deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="tag">41% Faster Resolution</span>
              <span className="tag">20% Cost Reduction</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

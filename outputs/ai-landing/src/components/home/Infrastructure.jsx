import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const partners = [
  { name: 'AWS', note: 'Cloud Infrastructure' },
  { name: 'Google Cloud', note: 'AI & ML Platform' },
  { name: 'Microsoft Azure', note: 'Enterprise Cloud' },
  { name: 'NVIDIA', note: 'GPU Acceleration' },
  { name: 'OpenAI', note: 'Foundation Models' },
  { name: 'Anthropic', note: 'Safety-First AI' },
]

export default function Infrastructure() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-mag-black relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="hr-label">Powered by world-class infrastructure</div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white/[0.03] rounded-xl p-6 text-center border border-white/[0.08]
                hover:border-brand-green/40 hover:-translate-y-1 transition-all duration-300
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            >
              <div className="font-sans font-semibold text-sm text-white mb-1.5">
                {p.name}
              </div>
              <div className="text-xs text-white/50">{p.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

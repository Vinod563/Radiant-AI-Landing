import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const pillars = [
  {
    number: '01',
    title: 'Workforce Transformation',
    description: 'Empower your people with the skills, tools, and culture to thrive in an AI-driven landscape.',
    outcomes: ['AI readiness programs', 'Culture change management', 'Continuous upskilling'],
    accent: '#91C46B',
  },
  {
    number: '02',
    title: 'Customer Transformation',
    description: 'Reimagine every touchpoint with intelligent, personalized experiences that build lasting loyalty.',
    outcomes: ['Journey mapping', 'Omnichannel CX', '20% CSAT increase'],
    accent: '#6173DE',
  },
  {
    number: '03',
    title: 'Application Transformation',
    description: 'Modernize legacy systems into cloud-native, API-first platforms that scale with your ambitions.',
    outcomes: ['Legacy modernization', 'Cloud migration', '60% performance gain'],
    accent: '#F0974E',
  },
  {
    number: '04',
    title: 'IT & Data Transformation',
    description: 'Build a unified data foundation powered by AI to unlock real-time insights and smarter decisions.',
    outcomes: ['Data engineering', 'AI/ML platforms', '35% cost savings'],
    accent: '#C7DD75',
  },
];

const TransformationFramework = () => {
  return (
    <section className="py-[80px] md:py-[120px] bg-gradient-to-br from-[#021620] via-teal-navy to-[#0a2d40] relative overflow-hidden">
      <div className="ai-grid" style={{ opacity: 0.45 }} />
      <div className="ai-orb w-[500px] h-[500px] bg-brand-green/8 top-[5%] right-[-5%]" />
      <div className="ai-orb w-[350px] h-[350px] bg-accent-blue/6 bottom-[5%] left-[-5%]" style={{ animationDelay: '3s' }} />
      <div className="hidden lg:block">
        {[20, 50, 80].map((left, i) => (
          <div key={i} className="data-stream" style={{ left: `${left}%`, animationDelay: `${i * 1.5}s`, animationDuration: `${5 + i}s` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-16 lg:gap-20 items-start">
          {/* Left sticky header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="lg:sticky lg:top-32"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-brand-lime" />
              <p className="text-brand-lime font-secondary font-bold text-[11px] uppercase tracking-[0.2em]">
                Transformation Framework
              </p>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="font-primary text-[32px] md:text-[42px] font-bold text-white mb-6 leading-[1.12] text-balance"
            >
              Four dimensions of{' '}
              <span className="text-gradient-green">meaningful change</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-white/50 text-[16px] md:text-[17px] leading-relaxed mb-8 max-w-sm"
            >
              Your transformed organization leverages technology to drive impact, empowers the workforce, and brings innovative products to market that build brand capital.
            </motion.p>

            <motion.a
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              href="#"
              className="inline-flex items-center gap-2 text-brand-lime font-secondary font-semibold text-[13px] group hover:gap-3 transition-all duration-200"
            >
              Explore our approach
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>

            {/* Color dots */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="hidden lg:flex items-center gap-3 mt-14 pt-8 border-t border-white/[0.06]">
              <div className="flex -space-x-1.5">
                {pillars.map((p, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full border-2 border-[#09465D]" style={{ background: p.accent }} />
                ))}
              </div>
              <p className="text-white/25 text-[11px] font-secondary">All four pillars integrated</p>
            </motion.div>
          </motion.div>

          {/* Right cards */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.number}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="group"
              >
                <div className="glass-card-dark p-6 md:p-8 rounded-2xl hover:bg-white/[0.07] transition-all duration-300 cursor-pointer relative overflow-hidden">
                  {/* Left accent line */}
                  <div
                    className="absolute left-0 top-0 w-[3px] h-full rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: pillar.accent }}
                  />

                  <div className="flex items-start gap-5">
                    <span
                      className="font-primary text-[32px] font-bold leading-none mt-0.5 shrink-0 transition-colors duration-300 group-hover:opacity-80"
                      style={{ color: `${pillar.accent}50` }}
                    >
                      {pillar.number}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="font-primary text-[17px] md:text-[19px] font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300"
                        style={{}}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-white/40 text-[14px] leading-relaxed mb-4 group-hover:text-white/55 transition-colors duration-300">
                        {pillar.description}
                      </p>

                      {/* Outcomes */}
                      <div className="flex flex-wrap gap-x-5 gap-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {pillar.outcomes.map((o) => (
                          <div key={o} className="flex items-center gap-1.5">
                            <CheckCircle2 size={11} style={{ color: pillar.accent }} />
                            <span className="text-[11px] font-secondary" style={{ color: `${pillar.accent}B0` }}>
                              {o}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformationFramework;

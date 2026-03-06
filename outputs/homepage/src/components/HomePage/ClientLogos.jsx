import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const clientRows = [
  [
    { name: 'Verizon', sector: 'Telecom', initials: 'VZ' },
    { name: 'Navy Federal Credit Union', sector: 'Financial Services', initials: 'NFCU' },
    { name: 'Halliburton', sector: 'Energy', initials: 'HAL' },
    { name: 'EPA', sector: 'Federal Agency', initials: 'EPA' },
    { name: 'USCIS', sector: 'Federal Agency', initials: 'USCIS' },
  ],
  [
    { name: 'NIH', sector: 'Health Research', initials: 'NIH' },
    { name: 'NIH-NCI', sector: 'Cancer Institute', initials: 'NCI' },
    { name: 'MD Anderson', sector: 'Cancer Center', initials: 'MDA' },
    { name: 'Baylor University', sector: 'Higher Education', initials: 'BU' },
    { name: 'Univ. of Texas', sector: 'Higher Education', initials: 'UT' },
  ],
];

const accentColors = [
  'bg-red-50 text-red-700',
  'bg-blue-50 text-blue-700',
  'bg-orange-50 text-orange-700',
  'bg-emerald-50 text-emerald-700',
  'bg-slate-50 text-slate-700',
  'bg-cyan-50 text-cyan-700',
  'bg-teal-50 text-teal-700',
  'bg-violet-50 text-violet-700',
  'bg-amber-50 text-amber-700',
  'bg-indigo-50 text-indigo-700',
];

const ClientLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  let idx = 0;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-cyan/30 via-white to-white" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-green/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-blue/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-green/50" />
            <span className="text-brand-green font-secondary font-bold text-[11px] uppercase tracking-[0.2em]">
              Trusted Partners
            </span>
            <div className="h-px w-8 bg-brand-green/50" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="font-primary text-[28px] md:text-[38px] font-bold text-content-black mb-4 leading-tight"
          >
            Meet the leaders who trust Radiant
            <br className="hidden md:block" />
            {' '}with their transformation journey
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-content-body text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto"
          >
            Fortune 500 enterprises, federal agencies, and state governments rely on us to deliver measurable digital outcomes.
          </motion.p>
        </motion.div>

        {/* Logo rows */}
        <div className="space-y-4 max-w-5xl mx-auto mb-14">
          {clientRows.map((row, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ri * 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
            >
              {row.map((client) => {
                const color = accentColors[idx++ % accentColors.length];
                return (
                  <motion.div
                    key={client.name}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group flex flex-col items-center text-center px-4 py-5 rounded-xl bg-white border border-gray-100/80 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                  >
                    <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-3 text-[10px] font-primary font-bold`}>
                      {client.initials}
                    </div>
                    <h4 className="font-primary font-semibold text-[12px] text-teal-dark leading-tight mb-0.5 group-hover:text-content-black transition-colors duration-300">
                      {client.name}
                    </h4>
                    <span className="text-[10px] font-secondary text-content-muted tracking-wide">
                      {client.sector}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-10 border-t border-border-light/40"
        >
          {[
            { value: '20+', label: 'Enterprise Clients' },
            { value: '15+', label: 'Federal Agencies' },
            { value: '98%', label: 'Client Retention' },
            { value: '3', label: 'Global Regions' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="font-primary font-bold text-[30px] md:text-[34px] text-teal-dark leading-none">{s.value}</span>
              <span className="text-content-secondary font-secondary text-[13px] leading-tight text-left max-w-[80px]">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;

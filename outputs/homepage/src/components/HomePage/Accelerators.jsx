import { motion } from 'framer-motion';
import { Zap, Package, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const accelerators = [
  {
    icon: Zap,
    title: 'CX Accelerator',
    tagline: 'Transform customer experience end-to-end',
    description: 'An integrated framework that unifies research, design, and delivery to create seamless, personalized customer experiences.',
    metrics: [
      { value: '20%', label: 'CSAT increase' },
      { value: '40%', label: 'Faster resolution' },
      { value: '25%', label: 'More conversions' },
    ],
    pillars: ['Purpose', 'Performance', 'People', 'Process', 'Platform'],
    gradient: 'from-violet-500 to-purple-600',
    softBg: 'from-violet-500/8 via-purple-500/4 to-transparent',
    border: 'hover:border-violet-300/40',
    glow: 'hover:shadow-[0_16px_48px_-8px_rgba(139,92,246,0.15)]',
  },
  {
    icon: Package,
    title: 'Product Accelerator',
    tagline: 'Agile product development at warp speed',
    description: 'Your all-in-one framework for Agile Product Development — from ideation to market-ready products using GenAI and low-code.',
    metrics: [
      { value: '40%', label: 'Faster to market' },
      { value: '30%', label: 'Cost reduction' },
      { value: '35%', label: 'Faster prototyping' },
    ],
    pillars: ['GenAI Integration', 'Low-Code', 'Reinvented SDLC'],
    gradient: 'from-blue-500 to-indigo-600',
    softBg: 'from-blue-500/8 via-indigo-500/4 to-transparent',
    border: 'hover:border-blue-300/40',
    glow: 'hover:shadow-[0_16px_48px_-8px_rgba(59,130,246,0.15)]',
  },
  {
    icon: TrendingUp,
    title: 'Sales Accelerator',
    tagline: 'Drive revenue through conversion optimization',
    description: 'Drive sales growth through Conversion Rate Optimization, AI-powered analytics, and continuous pipeline intelligence.',
    metrics: [
      { value: '40%', label: 'Better conversions' },
      { value: '35%', label: 'Digital ROI boost' },
      { value: '50%', label: 'More data-driven' },
    ],
    pillars: ['CRO Strategy', 'A/B Testing', 'Personalization'],
    gradient: 'from-emerald-500 to-green-600',
    softBg: 'from-emerald-500/8 via-green-500/4 to-transparent',
    border: 'hover:border-emerald-300/40',
    glow: 'hover:shadow-[0_16px_48px_-8px_rgba(16,185,129,0.15)]',
  },
];

const Accelerators = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden circuit-border">
      <div className="ai-hex-mesh" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-cyan/40 via-white to-surface-cyan/40" />
      <div className="absolute top-10 left-[8%] w-72 h-72 bg-accent-purple/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-brand-green/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-green" />
            <p className="text-brand-green font-secondary font-bold text-[11px] uppercase tracking-[0.2em]">
              Accelerator Solutions
            </p>
            <div className="h-px w-10 bg-brand-green" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="font-primary text-[32px] md:text-[44px] font-bold text-content-black mb-5 leading-[1.12]"
          >
            Fast-track your{' '}
            <span className="relative inline-block">
              <span className="relative z-10">transformation</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-lime/40 -z-0 rounded-sm" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-content-body text-[16px] md:text-[17px] leading-relaxed"
          >
            Pre-built frameworks that compress timelines, reduce risk, and deliver measurable results from day one.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-3 gap-6"
        >
          {accelerators.map((acc) => {
            const Icon = acc.icon;
            return (
              <motion.div
                key={acc.title}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className={`relative h-full p-8 md:p-9 rounded-2xl bg-white border border-gray-100 ${acc.border} ${acc.glow} transition-all duration-500 overflow-hidden`}>
                  {/* BG gradient blob */}
                  <div className={`absolute top-0 right-0 w-[220px] h-[220px] bg-gradient-to-bl ${acc.softBg} rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${acc.gradient} flex items-center justify-center mb-5 shadow-sm`}>
                      <Icon size={24} className="text-white" strokeWidth={1.8} />
                    </div>

                    {/* Title */}
                    <h3 className="font-primary text-[20px] md:text-[22px] font-semibold text-teal-dark mb-1 group-hover:text-content-black transition-colors duration-300">
                      {acc.title}
                    </h3>
                    <p className="text-brand-green-dark text-[12px] font-secondary font-semibold uppercase tracking-wide mb-4">
                      {acc.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-content-paragraph text-[14px] leading-relaxed mb-6">
                      {acc.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {acc.metrics.map((m) => (
                        <div key={m.label} className="text-center p-3 rounded-xl bg-surface-cyan border border-border-light/40">
                          <div className="font-primary font-bold text-[20px] text-teal-dark leading-none mb-1">{m.value}</div>
                          <div className="text-[10px] font-secondary text-content-muted leading-tight">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Pillars */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {acc.pillars.map((p) => (
                        <div key={p} className="flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-brand-green shrink-0" />
                          <span className="text-[11px] font-secondary text-content-secondary">{p}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-teal-dark font-secondary font-semibold text-[13px] group-hover:text-brand-green-dark transition-colors duration-300">
                      <span>Learn more</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Accelerators;

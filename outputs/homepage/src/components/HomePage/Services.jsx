import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BarChart3, Cloud, Code2, Users, Briefcase, ArrowRight, ChevronRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const services = [
  {
    number: '01',
    icon: Compass,
    title: 'Digital Strategy & Experience',
    description: 'Discover improved customer experience, productivity, and ROI through human-centered design and strategic digital transformation.',
    highlights: ['Enterprise UX', 'CX Research', 'Digital Strategy', 'CRO'],
    metric: '50% increase in engagement',
    accent: '#10B981',
    accentLight: 'bg-emerald-50',
    accentText: 'text-emerald-700',
    accentRing: 'ring-emerald-200/60',
    hoverGlow: 'hover:shadow-[0_8px_40px_-8px_rgba(16,185,129,0.18)]',
    topBar: 'from-emerald-400 to-teal-500',
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'Analytics, Data Science & AI',
    description: 'Envisage a steady stream of insights through transparent, accessible data powered by advanced AI and machine learning.',
    highlights: ['Data Engineering', 'Business Intelligence', 'AI Adoption'],
    metric: '30% increase in efficiency',
    accent: '#6173DE',
    accentLight: 'bg-indigo-50',
    accentText: 'text-indigo-700',
    accentRing: 'ring-indigo-200/60',
    hoverGlow: 'hover:shadow-[0_8px_40px_-8px_rgba(97,115,222,0.18)]',
    topBar: 'from-blue-400 to-indigo-500',
  },
  {
    number: '03',
    icon: Cloud,
    title: 'Cloud Transformation',
    description: 'Scalable, secure, and agile cloud infrastructure that accelerates innovation and reduces operational complexity by up to 45%.',
    highlights: ['Cloud Migration', 'Hybrid Solutions', 'Infrastructure', 'DevOps'],
    metric: '45% reduction in infra costs',
    accent: '#06B6D4',
    accentLight: 'bg-cyan-50',
    accentText: 'text-cyan-700',
    accentRing: 'ring-cyan-200/60',
    hoverGlow: 'hover:shadow-[0_8px_40px_-8px_rgba(6,182,212,0.18)]',
    topBar: 'from-cyan-400 to-sky-500',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Product Development & Integration',
    description: 'Deliver products at the speed of change with modern engineering, API-first architecture, and continuous delivery pipelines.',
    highlights: ['System Modernization', 'RPA', 'Platform Dev', 'API-First'],
    metric: '40% faster deployment',
    accent: '#8B5CF6',
    accentLight: 'bg-violet-50',
    accentText: 'text-violet-700',
    accentRing: 'ring-violet-200/60',
    hoverGlow: 'hover:shadow-[0_8px_40px_-8px_rgba(139,92,246,0.18)]',
    topBar: 'from-violet-400 to-purple-500',
  },
  {
    number: '05',
    icon: Users,
    title: 'Organizational Transformation',
    description: 'Upskill, motivate, and inspire your workforce with change management strategies that drive lasting cultural shifts.',
    highlights: ['Change Management', 'AI Enablement', 'Culture', 'L&D'],
    metric: '35% productivity boost',
    accent: '#F59E0B',
    accentLight: 'bg-amber-50',
    accentText: 'text-amber-700',
    accentRing: 'ring-amber-200/60',
    hoverGlow: 'hover:shadow-[0_8px_40px_-8px_rgba(245,158,11,0.18)]',
    topBar: 'from-amber-400 to-orange-500',
  },
  {
    number: '06',
    icon: Briefcase,
    title: 'Skilled Workforce Solutions',
    description: 'Building a skilled, scalable workforce for present and future growth, locally and globally with flexible delivery models.',
    highlights: ['Talent Matching', 'Onshore/Offshore', 'Full Teams', 'Staff Aug'],
    metric: 'Global delivery in 4 regions',
    accent: '#F43F5E',
    accentLight: 'bg-rose-50',
    accentText: 'text-rose-700',
    accentRing: 'ring-rose-200/60',
    hoverGlow: 'hover:shadow-[0_8px_40px_-8px_rgba(244,63,94,0.18)]',
    topBar: 'from-rose-400 to-pink-500',
  },
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div
        className={`
          relative h-full rounded-2xl bg-white p-7 md:p-8
          border border-gray-100
          shadow-sm ${service.hoverGlow}
          transition-all duration-500 overflow-hidden cursor-pointer
        `}
      >
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.topBar} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />

        {/* Ghost number */}
        <span className="absolute -top-2 -right-2 text-[100px] font-primary font-black text-gray-50 select-none pointer-events-none leading-none">
          {service.number}
        </span>

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              animate={hovered ? { scale: 1.1, rotate: -4 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-13 h-13 w-[52px] h-[52px] rounded-xl flex items-center justify-center"
              style={{ background: `${service.accent}18` }}
            >
              <Icon size={24} strokeWidth={1.6} style={{ color: service.accent }} />
            </motion.div>
            <span className="text-[10px] font-secondary font-bold tracking-[0.2em] text-gray-300">
              {service.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-primary text-[17px] md:text-[19px] font-semibold text-teal-dark mb-3 leading-snug group-hover:text-content-black transition-colors duration-300">
            {service.title}
          </h3>

          {/* Desc */}
          <p className="text-content-paragraph text-[13px] leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {service.highlights.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-secondary font-semibold px-2.5 py-1 rounded-full ring-1 ${service.accentLight} ${service.accentText} ${service.accentRing} tracking-wide`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metric */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2"
              >
                <ChevronRight size={13} style={{ color: service.accent }} />
                <span className="text-[12px] font-secondary font-semibold" style={{ color: service.accent }}>
                  {service.metric}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden circuit-border">
      <div className="ai-hex-mesh" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface-cyan/20 to-white" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-brand-green/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent-blue/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-3xl mb-16"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-green" />
            <p className="text-brand-green font-secondary font-bold text-[11px] uppercase tracking-[0.2em]">
              Six Enablers
            </p>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="font-primary text-[32px] md:text-[44px] font-bold text-content-black mb-5 leading-[1.12] text-balance"
          >
            Comprehensive capabilities for{' '}
            <span className="relative inline-block">
              <span className="relative z-10">every dimension</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-lime/40 -z-0 rounded-sm" />
            </span>{' '}
            of transformation
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-content-body text-[16px] md:text-[17px] leading-relaxed"
          >
            Six integrated service enablers powered by our AI Fabric, delivering measurable outcomes across your entire organization.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-dark text-white font-secondary font-semibold text-[13px] uppercase tracking-wider rounded-full hover:bg-teal-navy transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Explore all capabilities
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

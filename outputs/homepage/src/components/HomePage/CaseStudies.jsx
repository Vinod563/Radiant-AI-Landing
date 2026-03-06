import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, TrendingUp, Globe, Shield, Cpu } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const categories = ['All', 'Customer', 'Workforce', 'Infrastructure', 'Product & Services'];

const caseStudies = [
  {
    id: 1,
    title: 'AI-Powered Virtual Assistant for Hospitality',
    description: 'Deployed an intelligent conversational AI assistant that handles 80% of guest inquiries autonomously, reducing response time by 70%.',
    industry: 'Hospitality',
    category: 'Customer',
    icon: Bot,
    metric: '80%',
    metricLabel: 'Inquiries Automated',
    tags: ['Conversational AI', 'NLP'],
    gradient: 'from-violet-500 to-purple-600',
    bgAccent: 'bg-violet-50',
  },
  {
    id: 2,
    title: 'Telecom Capacity Scaling via Intelligent Automation',
    description: 'Scaled service capacity 5x using intelligent automation and AI-driven network intelligence for a major telecom provider.',
    industry: 'Telecom',
    category: 'Infrastructure',
    icon: TrendingUp,
    metric: '5x',
    metricLabel: 'Capacity Scaled',
    tags: ['Automation', 'Network AI'],
    gradient: 'from-blue-500 to-cyan-600',
    bgAccent: 'bg-blue-50',
  },
  {
    id: 3,
    title: 'World Table Tennis Digital Strategy',
    description: 'Transformed digital fan engagement with a data-driven content strategy that tripled audience reach across global markets.',
    industry: 'Sports & Entertainment',
    category: 'Customer',
    icon: Globe,
    metric: '3x',
    metricLabel: 'Audience Growth',
    tags: ['Digital Strategy', 'CX'],
    gradient: 'from-emerald-500 to-teal-600',
    bgAccent: 'bg-emerald-50',
  },
  {
    id: 4,
    title: 'Florida DEO Reemployment Modernization',
    description: 'Modernized the reemployment assistance platform, reducing processing time by 60% and improving citizen service delivery.',
    industry: 'State Government',
    category: 'Product & Services',
    icon: Shield,
    metric: '60%',
    metricLabel: 'Processing Faster',
    tags: ['System Modernization', 'Gov Tech'],
    gradient: 'from-amber-500 to-orange-600',
    bgAccent: 'bg-amber-50',
  },
  {
    id: 5,
    title: 'Industrial IoT with Accelerated Product Delivery',
    description: 'Deployed a real-time IoT monitoring platform for harsh environments, delivering connected worker safety and operational efficiency.',
    industry: 'Oil & Gas',
    category: 'Product & Services',
    icon: Cpu,
    metric: '40%',
    metricLabel: 'Faster Delivery',
    tags: ['IoT', 'Industrial', 'Tracklynk'],
    gradient: 'from-rose-500 to-pink-600',
    bgAccent: 'bg-rose-50',
  },
  {
    id: 6,
    title: 'Agile Development for Health Management Incentives',
    description: 'Built a mobile application using Agile methodology that increased health management program engagement by 45%.',
    industry: 'Healthcare',
    category: 'Workforce',
    icon: TrendingUp,
    metric: '45%',
    metricLabel: 'Engagement Lift',
    tags: ['Mobile Dev', 'Agile'],
    gradient: 'from-teal-500 to-cyan-600',
    bgAccent: 'bg-teal-50',
  },
];

const CaseStudyCard = ({ cs, index }) => {
  const Icon = cs.icon;
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer"
    >
      <div className="relative h-full bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-400 overflow-hidden">
        {/* Top accent */}
        <div className={`h-[3px] bg-gradient-to-r ${cs.gradient}`} />

        <div className="p-6 md:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 rounded-xl ${cs.bgAccent} flex items-center justify-center`}>
              <Icon size={20} strokeWidth={1.6} className="text-gray-600" />
            </div>
            <div className="text-right">
              <div className={`font-primary font-bold text-[28px] leading-none bg-gradient-to-br ${cs.gradient} bg-clip-text text-transparent`}>
                {cs.metric}
              </div>
              <div className="text-[10px] font-secondary text-content-muted mt-0.5">{cs.metricLabel}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[10px] font-secondary font-semibold px-2.5 py-1 rounded-full bg-surface-cyan text-content-secondary">
              {cs.industry}
            </span>
            {cs.tags.map((t) => (
              <span key={t} className="text-[10px] font-secondary px-2.5 py-1 rounded-full border border-border-light text-content-muted">
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-primary text-[16px] md:text-[17px] font-semibold text-content-black mb-2 leading-snug group-hover:text-teal-dark transition-colors duration-300">
            {cs.title}
          </h3>

          {/* Description */}
          <p className="text-content-paragraph text-[13px] leading-relaxed mb-5">
            {cs.description}
          </p>

          {/* Read more */}
          <div className="flex items-center gap-2 text-[12px] font-secondary font-semibold text-teal-dark opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span>Read case study</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <section id="case-studies" className="py-20 md:py-28 relative overflow-hidden circuit-border">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface-cyan/20 to-white" />
      <div className="ai-hex-mesh" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div className="max-w-2xl">
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-green" />
              <p className="text-brand-green font-secondary font-bold text-[11px] uppercase tracking-[0.2em]">
                Case Studies
              </p>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="font-primary text-[32px] md:text-[44px] font-bold text-content-black leading-[1.12] mb-4"
            >
              Real results from{' '}
              <span className="relative inline-block">
                <span className="relative z-10">real partnerships</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-lime/40 -z-0 rounded-sm" />
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-content-body text-[15px] md:text-[16px] leading-relaxed"
            >
              Explore how we have helped enterprises and government agencies drive measurable transformation through AI-first solutions.
            </motion.p>
          </div>

          <motion.a
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            href="#"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal-dark text-teal-dark font-secondary font-semibold text-[13px] hover:bg-teal-dark hover:text-white transition-all duration-300 whitespace-nowrap group"
          >
            View all case studies
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-teal-dark text-white shadow-sm'
                  : 'bg-white border border-border-light text-content-body hover:border-teal-dark hover:text-teal-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cs, i) => (
              <CaseStudyCard key={cs.id} cs={cs} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center lg:hidden"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-teal-dark text-teal-dark font-secondary font-semibold text-[13px] hover:bg-teal-dark hover:text-white transition-all duration-300 group"
          >
            View all case studies
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;

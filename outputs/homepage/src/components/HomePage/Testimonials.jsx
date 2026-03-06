import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const testimonials = [
  {
    quote: 'Radiant Digital transformed our digital infrastructure with an AI-first approach that delivered measurable ROI within the first quarter. Their team genuinely cares about outcomes.',
    name: 'Sarah Chen',
    title: 'CTO, Fortune 500 Enterprise',
    initials: 'SC',
    sector: 'Technology',
    gradient: 'from-brand-green to-emerald-600',
    stars: 5,
  },
  {
    quote: 'Their deep expertise in federal digital services helped us modernize legacy systems while maintaining full compliance and zero downtime. Exceptional delivery.',
    name: 'Michael Torres',
    title: 'Deputy CIO, Federal Agency',
    initials: 'MT',
    sector: 'Government',
    gradient: 'from-accent-blue to-indigo-600',
    stars: 5,
  },
  {
    quote: 'The CX Accelerator framework compressed our timeline by 60%. We went from concept to production-ready in just 8 weeks. Truly remarkable execution.',
    name: 'Priya Sharma',
    title: 'VP of Product, FinTech',
    initials: 'PS',
    sector: 'Financial Services',
    gradient: 'from-accent-purple to-violet-600',
    stars: 5,
  },
  {
    quote: 'What sets Radiant apart is their AI Fabric approach — AI is embedded throughout the engagement, not bolted on. That is how you achieve real transformation.',
    name: 'David Kim',
    title: 'Chief Digital Officer, Healthcare System',
    initials: 'DK',
    sector: 'Healthcare',
    gradient: 'from-teal-dark to-teal-navy',
    stars: 5,
  },
];

const Testimonials = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((dir) => {
    setCurrent(([prev]) => {
      const next = (prev + dir + testimonials.length) % testimonials.length;
      return [next, dir];
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden circuit-border">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface-cyan/30 to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-green/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-green/50" />
            <p className="text-brand-green font-secondary font-bold text-[11px] uppercase tracking-[0.2em]">Client Voices</p>
            <div className="h-px w-8 bg-brand-green/50" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="font-primary text-[28px] md:text-[42px] font-bold text-content-black leading-tight"
          >
            Customer centric to the core
          </motion.h2>
        </motion.div>

        {/* Main carousel */}
        <div className="relative max-w-3xl mx-auto">
          <Quote size={100} className="absolute -top-4 -left-2 md:-left-8 text-brand-green/[0.06] pointer-events-none" strokeWidth={1} />

          <div className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full text-center px-4 md:px-14"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={14} className="text-brand-green fill-brand-green" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-primary text-[18px] md:text-[22px] leading-relaxed md:leading-[1.65] text-content-dark font-medium mb-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-primary font-bold text-[16px] shadow-md`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-primary font-semibold text-teal-dark text-[15px]">{t.name}</div>
                    <div className="text-content-muted text-[12px] font-secondary">{t.title}</div>
                    <div className="mt-1">
                      <span className="text-[10px] font-secondary font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-surface-cyan text-content-secondary">
                        {t.sector}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => { setIsAutoPlaying(false); paginate(-1); }}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-content-secondary hover:border-teal-dark hover:text-teal-dark hover:bg-surface-cyan transition-all duration-300"
            >
              <ArrowLeft size={15} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setCurrent([i, i > current ? 1 : -1]); }}
                  aria-label={`Go to ${i + 1}`}
                  className={`rounded-full transition-all duration-400 ${
                    i === current ? 'w-7 h-2 bg-teal-dark' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => { setIsAutoPlaying(false); paginate(1); }}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-content-secondary hover:border-teal-dark hover:text-teal-dark hover:bg-surface-cyan transition-all duration-300"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Users, Globe } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const industries = ['Enterprises', 'Federal Agencies', 'State & Local Govts', 'Healthcare Systems', 'Financial Services'];

const floatingCards = [
  {
    icon: TrendingUp,
    label: '50%',
    sub: 'Faster Deployment',
    color: 'from-brand-green/25 to-brand-green/8',
    iconColor: 'text-brand-green',
    delay: 0,
  },
  {
    icon: Users,
    label: '20+',
    sub: 'Enterprise Clients',
    color: 'from-accent-blue/25 to-accent-blue/8',
    iconColor: 'text-blue-300',
    delay: 1.8,
  },
  {
    icon: Globe,
    label: '3',
    sub: 'Global Regions',
    color: 'from-accent-purple/25 to-accent-purple/8',
    iconColor: 'text-violet-300',
    delay: 3.5,
  },
];

const Hero = () => {
  const [industryIdx, setIndustryIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndustryIdx((i) => (i + 1) % industries.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#021620]">
      {/* Deep layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#021620] via-[#093346] to-[#021e2b]" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Animated perspective grid */}
      <div className="ai-grid" />

      {/* Large orbs */}
      <div className="ai-orb w-[700px] h-[700px] bg-brand-green/10 -top-[20%] -right-[15%]" />
      <div className="ai-orb w-[500px] h-[500px] bg-accent-blue/8 bottom-[-10%] -left-[10%]" style={{ animationDelay: '3s' }} />
      <div className="ai-orb w-[300px] h-[300px] bg-accent-purple/6 top-[40%] right-[30%]" style={{ animationDelay: '1.5s' }} />

      {/* Scan line */}
      <div className="ai-scanline" />

      {/* Neural nodes */}
      <div className="ai-nodes hidden lg:block">
        {[
          { top: '18%', left: '72%', delay: '0s' },
          { top: '58%', left: '82%', delay: '2s' },
          { top: '72%', left: '68%', delay: '4s' },
          { top: '28%', left: '88%', delay: '1s' },
          { top: '82%', left: '18%', delay: '3s' },
          { top: '12%', left: '55%', delay: '2.5s' },
        ].map((node, i) => (
          <div
            key={i}
            className="ai-node"
            style={{ top: node.top, left: node.left, animationDelay: node.delay }}
          />
        ))}
      </div>

      {/* Data streams */}
      <div className="hidden lg:block">
        {[12, 28, 68, 84].map((left, i) => (
          <div
            key={i}
            className="data-stream"
            style={{ left: `${left}%`, animationDelay: `${i * 1.2}s`, animationDuration: `${4 + i}s` }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[22%] right-[10%] w-24 h-24 hidden lg:block"
      >
        <div className="w-full h-full rounded-3xl border border-brand-green/15 bg-gradient-to-br from-brand-green/8 to-transparent backdrop-blur-sm" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-[28%] right-[6%] w-14 h-14 hidden lg:block"
      >
        <div className="w-full h-full rounded-full border border-accent-blue/20 bg-gradient-to-br from-accent-blue/10 to-transparent" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card-dark text-brand-lime text-[11px] font-secondary font-bold uppercase tracking-[0.15em] mb-7">
                <Sparkles size={12} className="text-brand-green" />
                AI-First Digital Transformation Partner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-primary text-[42px] md:text-[58px] lg:text-[68px] font-bold text-white leading-[1.04] mb-6 text-balance"
            >
              We&apos;re packed to{' '}
              <span className="text-gradient-green">guide</span> your
              <br className="hidden lg:block" />
              {' '}digital journey
            </motion.h1>

            {/* Dynamic sub-line */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/60 text-[17px] md:text-[19px] leading-relaxed mb-3 max-w-xl"
            >
              Transformation is the journey. Digital enablement is the map.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="flex items-center gap-2 mb-10"
            >
              <span className="text-white/45 text-[15px] font-secondary">Trusted by</span>
              <motion.span
                key={industryIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-brand-lime text-[15px] font-secondary font-semibold"
              >
                {industries[industryIdx]}
              </motion.span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-green text-white font-secondary font-semibold text-[14px] uppercase tracking-wide hover:bg-brand-green-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-brand-green/20 group"
              >
                {"Let's Embark"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 text-white/80 font-secondary font-semibold text-[14px] uppercase tracking-wide hover:border-brand-green/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="pt-8 border-t border-white/[0.08]"
            >
              <p className="text-white/30 text-[10px] font-secondary font-bold uppercase tracking-[0.25em] mb-5">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
                {['Verizon', 'Navy Federal', 'Halliburton', 'NIH', 'EPA', 'USCIS'].map((c) => (
                  <span
                    key={c}
                    className="text-white/25 font-primary font-bold text-[14px] hover:text-brand-lime/50 transition-colors duration-300 cursor-default"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
            className="hidden lg:flex flex-col gap-4"
          >
            {floatingCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5 + card.delay, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
                  className="glass-card-dark rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={card.iconColor} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-white font-primary font-bold text-[22px] leading-none">{card.label}</div>
                    <div className="text-white/45 text-[12px] font-secondary mt-1">{card.sub}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* AI badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
              className="glass-card-dark rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-brand-lime text-[11px] font-secondary font-bold uppercase tracking-wider">AI Fabric Active</span>
              </div>
              <div className="flex gap-1.5">
                {['DSE', 'Data', 'Cloud', 'Product', 'Org', 'Talent'].map((layer, i) => (
                  <motion.div
                    key={layer}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="flex-1 h-1.5 rounded-full bg-brand-green/40"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;

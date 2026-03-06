import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CalendarCheck } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const CTAOption = ({ icon: Icon, title, desc, href, primary }) => (
  <motion.a
    href={href}
    variants={fadeInUp}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -4 }}
    className={`group flex flex-col items-center text-center p-8 md:p-10 rounded-2xl border transition-all duration-400 ${
      primary
        ? 'bg-brand-green border-brand-green/0 hover:border-brand-green/20 hover:shadow-[0_16px_40px_-8px_rgba(145,196,107,0.3)] text-white'
        : 'glass-card-dark border-white/10 hover:border-white/20 hover:bg-white/[0.08] text-white'
    }`}
  >
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${primary ? 'bg-white/20' : 'bg-white/10'}`}>
      <Icon size={24} strokeWidth={1.6} className="text-white" />
    </div>
    <h3 className="font-primary font-semibold text-[20px] mb-2">{title}</h3>
    <p className={`text-[14px] leading-relaxed mb-6 ${primary ? 'text-white/70' : 'text-white/45'}`}>{desc}</p>
    <div className={`inline-flex items-center gap-2 text-[13px] font-secondary font-bold uppercase tracking-wide ${primary ? 'text-white' : 'text-brand-lime'}`}>
      Get started
      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </motion.a>
);

const CTA = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-[#021620] via-[#09465D] to-[#021e2b] relative overflow-hidden">
      <div className="ai-grid" style={{ opacity: 0.4 }} />
      <div className="ai-orb w-[500px] h-[500px] bg-brand-green/12 bottom-[-15%] right-[5%]" />
      <div className="ai-orb w-[400px] h-[400px] bg-accent-blue/8 top-[-10%] left-[5%]" style={{ animationDelay: '2s' }} />
      <div className="ai-scanline" style={{ opacity: 0.4 }} />
      <div className="hidden lg:block">
        {[8, 22, 78, 92].map((left, i) => (
          <div key={i} className="data-stream" style={{ left: `${left}%`, animationDelay: `${i * 1.5}s`, animationDuration: `${5 + i}s` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {/* Label */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-brand-lime/40" />
            <p className="text-brand-lime font-secondary font-bold text-[11px] uppercase tracking-[0.2em]">
              Start Your Journey
            </p>
            <div className="h-px w-10 bg-brand-lime/40" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="font-primary text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-white mb-5 text-balance"
          >
            Ready to Transform Your{' '}
            <span className="text-gradient-green">Digital Future?</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="text-white/50 text-[17px] md:text-[18px] leading-relaxed mb-14 max-w-2xl mx-auto"
          >
            Whether you are modernizing legacy systems, building AI-powered products, or transforming customer experience — we are your partner every step of the way.
          </motion.p>

          {/* Dual CTA cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-12"
          >
            <CTAOption
              icon={MessageCircle}
              title={"Let's Embark"}
              desc="Talk to our team about your transformation goals."
              href="#"
              primary
            />
            <CTAOption
              icon={CalendarCheck}
              title="Book a Discovery Call"
              desc="Schedule a 30-min session with a digital expert."
              href="#"
              primary={false}
            />
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-white/25 text-[12px] font-secondary"
          >
            hello@radiant.digital &nbsp;·&nbsp; 301.306.5102 &nbsp;·&nbsp; Vienna, VA
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

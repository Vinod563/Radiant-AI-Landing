import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

const stats = [
  { value: 50, suffix: '%', label: 'Increase in Customer Engagement', desc: 'Average across DSE projects', color: 'text-brand-green', bar: 'bg-brand-green' },
  { value: 40, suffix: '%', label: 'Faster Time to Market', desc: 'Product Accelerator clients', color: 'text-accent-blue', bar: 'bg-accent-blue' },
  { value: 70, suffix: '%', label: 'Reduction in Processing Time', desc: 'Via AI & RPA automation', color: 'text-accent-purple', bar: 'bg-accent-purple' },
  { value: 98, suffix: '%', label: 'Client Retention Rate', desc: 'Across all sectors', color: 'text-accent-orange', bar: 'bg-accent-orange' },
];

const CountUp = ({ value, suffix, color, isInView }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(count, value, { duration: 1.8, ease: 'easeOut' });
    return ctrl.stop;
  }, [isInView, value, count]);

  return (
    <motion.span className={`font-primary text-[52px] md:text-[64px] font-bold leading-none ${color}`}>
      <motion.span>{rounded}</motion.span>{suffix}
    </motion.span>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-px bg-gradient-to-r from-transparent via-accent-blue/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative text-center px-4 py-8 rounded-2xl hover:bg-surface-cyan/60 transition-colors duration-300"
            >
              {/* Progress ring (decorative) */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'currentColor' }} />

              <div className="mb-3">
                <CountUp value={stat.value} suffix={stat.suffix} color={stat.color} isInView={isInView} />
              </div>

              {/* Bar */}
              <div className="h-1 w-12 mx-auto rounded-full bg-border-light mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${stat.value}%` } : {}}
                  transition={{ duration: 1.5, delay: i * 0.12 + 0.3, ease: 'easeOut' }}
                  className={`h-full rounded-full ${stat.bar}`}
                />
              </div>

              <div className="text-content-dark font-primary font-semibold text-[15px] leading-snug mb-1">
                {stat.label}
              </div>
              <div className="text-content-muted font-secondary text-[12px]">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

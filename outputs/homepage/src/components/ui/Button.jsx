import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const variantStyles = {
  primary: 'bg-brand-green hover:bg-brand-green-dark text-white shadow-sm hover:shadow-lg',
  secondary: 'bg-transparent border-2 border-teal-border text-teal-dark hover:bg-surface-cyan',
  light: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm',
};

const sizes = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center font-secondary font-semibold',
        'uppercase tracking-wider rounded-pill transition-all duration-200 cursor-pointer',
        variantStyles[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

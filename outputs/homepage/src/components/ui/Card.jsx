import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Card = ({ children, className, hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      className={cn(
        'bg-white rounded-card p-6 md:p-8 shadow-card',
        'border border-border-light',
        'hover:shadow-lg transition-shadow duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

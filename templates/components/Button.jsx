import { cn } from '@/utils/cn';

const variants = {
  primary: 'bg-radiant-secondary text-white hover:bg-radiant-accent',
  secondary: 'bg-white text-radiant-primary border border-gray-300 hover:bg-gray-50',
  ghost: 'text-radiant-secondary hover:bg-blue-50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import { cn } from '@/utils/cn';

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

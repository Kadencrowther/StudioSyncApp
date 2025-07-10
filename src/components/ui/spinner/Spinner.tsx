import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          animate-spin rounded-full
          border-4 border-primary border-t-transparent
          ${sizeClasses[size]}
          ${className}
        `}
      />
    </div>
  );
};

export default Spinner; 
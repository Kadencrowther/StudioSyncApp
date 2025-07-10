import React from 'react';

interface FeeInputProps {
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  className?: string;
}

export const FeeInput: React.FC<FeeInputProps> = ({
  value,
  onChange,
  required = false,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        Fee Amount
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min="0"
        step="0.01"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
        required={required}
      />
    </div>
  );
}; 
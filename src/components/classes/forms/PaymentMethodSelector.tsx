import React from 'react';

type PaymentMethod = 'tuition' | 'onetime' | 'both' | undefined;

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  className?: string;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        Payment Method
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value as PaymentMethod)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
        required
      >
        <option value="">Select Payment Method</option>
        <option value="tuition">Tuition Rate</option>
        <option value="onetime">Fee</option>
        <option value="both">Both</option>
      </select>
    </div>
  );
};

export type { PaymentMethod }; 
import React from 'react';
import { RatePlan } from '../../../services/ratePlanService';

interface RatePlanSelectorProps {
  value: string;
  onChange: (value: string) => void;
  ratePlans: RatePlan[];
  required?: boolean;
  className?: string;
}

export const RatePlanSelector: React.FC<RatePlanSelectorProps> = ({
  value,
  onChange,
  ratePlans,
  required = false,
  className = ''
}) => {
  const activePlans = ratePlans.filter(plan => plan.IsActive);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        Rate Plan
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
        required={required}
      >
        <option value="">Select Rate Plan</option>
        {activePlans.map(plan => (
          <option key={plan.id} value={plan.id}>
            {plan.Name}
          </option>
        ))}
      </select>
    </div>
  );
}; 
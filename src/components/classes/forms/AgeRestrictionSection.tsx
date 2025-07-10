import React from 'react';

interface AgeRestrictionSectionProps {
  enforceAgeLimit: boolean;
  minAge: number;
  maxAge: number;
  onEnforceChange: (enforce: boolean) => void;
  onMinAgeChange: (age: number) => void;
  onMaxAgeChange: (age: number) => void;
  className?: string;
}

export const AgeRestrictionSection: React.FC<AgeRestrictionSectionProps> = ({
  enforceAgeLimit,
  minAge,
  maxAge,
  onEnforceChange,
  onMinAgeChange,
  onMaxAgeChange,
  className = ''
}) => {
  return (
    <div className={className}>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={enforceAgeLimit}
          onChange={(e) => onEnforceChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900"
        />
        <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Enforce Age Limit
        </label>
      </div>

      {enforceAgeLimit && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Minimum Age
            </label>
            <input
              type="number"
              value={minAge}
              onChange={(e) => onMinAgeChange(Number(e.target.value))}
              min="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Maximum Age
            </label>
            <input
              type="number"
              value={maxAge}
              onChange={(e) => onMaxAgeChange(Number(e.target.value))}
              min="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 
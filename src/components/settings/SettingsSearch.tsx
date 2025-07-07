import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SettingsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SettingsSearch: React.FC<SettingsSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search settings...',
}) => {
  return (
    <div className="relative w-full md:max-w-xs">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 
                 text-sm placeholder:text-gray-500 focus:border-brand-500 focus:outline-none 
                 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 
                 dark:text-gray-200 dark:placeholder:text-gray-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SettingsSearch; 
import { useState, useRef, useEffect } from 'react';
import { ViewDropdownProps } from '../../../types/class.types';

const ViewDropdown = <T extends string | string[]>({
  value,
  options,
  onViewChange,
  className = '',
  defaultLabel,
  isLoading = false,
  isMulti = false,
  allItemsLabel = 'All',
  icon,
}: ViewDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentViewLabel = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return defaultLabel;
    }
    
    if (Array.isArray(value)) {
      if (value.includes('all')) return allItemsLabel;
      const selectedLabels = value
        .map(v => options.find(opt => opt.value === v)?.label)
        .filter(Boolean);
      return selectedLabels.length > 1 
        ? `${selectedLabels[0]} +${selectedLabels.length - 1}`
        : selectedLabels[0] || defaultLabel;
    }
    
    return options.find(option => option.value === value)?.label || defaultLabel;
  };

  const handleOptionClick = (optionValue: string) => {
    if (!isMulti) {
      onViewChange(optionValue as T);
      setIsOpen(false);
      return;
    }

    const currentSelections = (Array.isArray(value) ? value : []) as string[];
    
    if (optionValue === 'all') {
      onViewChange(['all'] as unknown as T);
      setIsOpen(false);
      return;
    }

    let newSelections: string[];
    if (currentSelections.includes(optionValue)) {
      newSelections = currentSelections.filter(v => v !== optionValue);
    } else {
      newSelections = [...currentSelections.filter(v => v !== 'all'), optionValue];
    }

    if (newSelections.length === 0) {
      newSelections = ['all'];
    }

    onViewChange(newSelections as unknown as T);
  };

  const isSelected = (optionValue: string): boolean => {
    if (Array.isArray(value)) {
      if (value.includes('all') && optionValue === 'all') return true;
      if (value.includes('all') && optionValue !== 'all') return false;
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-9 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white/90 dark:hover:bg-gray-700"
      >
        <span className="flex items-center gap-2 truncate">
          {isLoading ? (
            <svg className="w-4 h-4 animate-spin text-gray-400 dark:text-gray-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <span className="text-gray-400 dark:text-gray-500">{icon}</span>
          )}
          <span className="truncate">{getCurrentViewLabel()}</span>
        </span>
        <svg
          className={`w-4 h-4 ml-1 transition-transform text-gray-400 dark:text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !isLoading && options.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {isMulti && (
            <button
              onClick={() => handleOptionClick('all')}
              className="flex items-center w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className={`w-3.5 h-3.5 mr-2 border rounded flex items-center justify-center ${isSelected('all') ? 'bg-brand-500 border-brand-500' : 'border-gray-300 dark:border-gray-600'}`}>
                  {isSelected('all') && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-700 dark:text-gray-200">{allItemsLabel}</span>
              </div>
            </button>
          )}
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`flex items-center w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-700
                ${option.value === options[options.length - 1].value ? 'rounded-b-lg' : ''}`}
            >
              {isMulti ? (
                <div className="flex items-center">
                  <div className={`w-3.5 h-3.5 mr-2 border rounded flex items-center justify-center ${isSelected(option.value) ? 'bg-brand-500 border-brand-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    {isSelected(option.value) && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  {option.color && (
                    <span 
                      className="w-2.5 h-2.5 mr-2 rounded-full" 
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
                </div>
              ) : (
                <>
                  {option.color && (
                    <span 
                      className="w-2.5 h-2.5 mr-2 rounded-full" 
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDropdown; 
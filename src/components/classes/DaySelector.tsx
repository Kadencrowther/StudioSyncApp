import React from 'react';

interface DaySelectorProps {
  selectedDays: string[];
  onChange: (days: string[]) => void;
  className?: string;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  onChange,
  className = ''
}) => {
  const days = [
    { value: 'sunday', label: 'S', fullName: 'Sunday' },
    { value: 'monday', label: 'M', fullName: 'Monday' },
    { value: 'tuesday', label: 'T', fullName: 'Tuesday' },
    { value: 'wednesday', label: 'W', fullName: 'Wednesday' },
    { value: 'thursday', label: 'T', fullName: 'Thursday' },
    { value: 'friday', label: 'F', fullName: 'Friday' },
    { value: 'saturday', label: 'S', fullName: 'Saturday' }
  ];

  const toggleDay = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    onChange(newDays);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {days.map(({ value, label, fullName }) => (
        <button
          key={value}
          type="button"
          onClick={() => toggleDay(value)}
          className={`
            w-9 h-9 rounded-full text-sm font-medium transition-all duration-200
            flex items-center justify-center
            ${selectedDays.includes(value)
              ? 'bg-brand-500 text-white shadow-md hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }
            focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:focus:ring-brand-400/20
          `}
          aria-pressed={selectedDays.includes(value)}
          title={fullName}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DaySelector; 
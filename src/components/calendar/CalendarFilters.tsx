import React from 'react';
import IconButton from '../ui/button/IconButton';

interface CalendarFiltersProps {
  onSeasonFilter: () => void;
  onRoomFilter: () => void;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  onSeasonFilter,
  onRoomFilter,
}) => {
  return (
    <div className="flex items-center gap-2">
      <IconButton
        variant="outline"
        size="sm"
        onClick={onSeasonFilter}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="6" y="12" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2" />
        </svg>
        Season
      </IconButton>
      
      <IconButton
        variant="outline"
        size="sm"
        onClick={onRoomFilter}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 21V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.0799 5 7.2 5H16.8C17.9201 5 18.4802 5 18.908 5.21799C19.2843 5.40973 19.5903 5.71569 19.782 6.09202C20 6.51984 20 7.0799 20 8.2V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M2 21H22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 8.5H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 12.5H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 16.5H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Room
      </IconButton>
    </div>
  );
};

export default CalendarFilters; 
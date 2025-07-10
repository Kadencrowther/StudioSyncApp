import React from 'react';
import ViewDropdown from '../ui/dropdown/ViewDropdown';
import { CalendarViewSelectorProps } from '../../types/class.types';

const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  currentView,
  onViewChange,
  className = '',
}) => {
  const viewOptions = [
    { label: 'Month', value: 'dayGridMonth' },
    { label: 'Week', value: 'timeGridWeek' },
    { label: 'Day', value: 'timeGridDay' },
  ];

  return (
    <ViewDropdown<string>
      value={currentView}
      options={viewOptions}
      onViewChange={onViewChange}
      className={className}
      defaultLabel="View"
      isMulti={false}
      icon={
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      }
    />
  );
};

export default CalendarViewSelector; 
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';

interface CalendarNavigationProps {
  calendarRef: React.RefObject<FullCalendar | null>;
  currentView: string;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({ calendarRef, currentView }) => {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    updateTitle();
  }, [currentView]); // Re-run when view changes

  const updateTitle = () => {
    const calendar = calendarRef.current?.getApi();
    if (calendar) {
      setTitle(calendar.view.title);
    }
  };

  const handlePrev = () => {
    const calendar = calendarRef.current?.getApi();
    if (calendar) {
      calendar.prev();
      updateTitle();
    }
  };

  const handleNext = () => {
    const calendar = calendarRef.current?.getApi();
    if (calendar) {
      calendar.next();
      updateTitle();
    }
  };

  return (
    <div className="relative flex items-center min-h-[60px] p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
      {/* Navigation Buttons - Absolute positioned on the left */}
      <div className="absolute left-3 sm:left-4 flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={handlePrev}
          className="px-2 sm:px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="px-2 sm:px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Centered Title */}
      <h2 className="flex-1 text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white text-center px-16">
        {title}
      </h2>
    </div>
  );
};

export default CalendarNavigation; 
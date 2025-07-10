import React, { forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { CalendarEvent } from './BaseCalendarWrapper';
import MonthCalendarWrapper from './MonthCalendarWrapper';
import WeekCalendarWrapper from './WeekCalendarWrapper';
import DayCalendarWrapper from './DayCalendarWrapper';

interface CalendarWrapperProps {
  events: CalendarEvent[];
  onDateSelect: (selectInfo: DateSelectArg) => void;
  onEventClick: (clickInfo: EventClickArg) => void;
  currentView: string;
}

const CalendarWrapper = forwardRef<FullCalendar, CalendarWrapperProps>((props, ref) => {
  const { events, onDateSelect, onEventClick, currentView } = props;
  const calendarRef = ref as React.RefObject<FullCalendar>;

  const renderCalendarView = () => {
    const commonProps = {
      events,
      onDateSelect,
      onEventClick,
      calendarRef,
    };

    switch (currentView) {
      case 'dayGridMonth':
        return <MonthCalendarWrapper {...commonProps} />;
      case 'timeGridWeek':
        return <WeekCalendarWrapper {...commonProps} />;
      case 'timeGridDay':
        return <DayCalendarWrapper {...commonProps} />;
      default:
        return <WeekCalendarWrapper {...commonProps} />;
    }
  };

  return (
    <div className="calendar-wrapper h-full flex flex-col overflow-hidden">
      <div className="calendar-container flex-1 h-full w-full">
        {renderCalendarView()}
      </div>
      <style>{`
        .fc {
          width: 100% !important;
          height: 100% !important;
          background: var(--background);
        }
        
        .fc .fc-view-harness {
          width: 100% !important;
          height: 100% !important;
          background: var(--background);
        }
        
        .fc .fc-view {
          width: 100% !important;
          height: 100% !important;
        }
        
        .fc .fc-scroller {
          height: 100% !important;
        }

        .fc .fc-scrollgrid,
        .fc .fc-scrollgrid-section-header,
        .fc .fc-scrollgrid-section-body,
        .fc .fc-scrollgrid-sync-table {
          width: 100% !important;
        }
        
        .fc .fc-col-header-cell,
        .fc .fc-timegrid-col,
        .fc .fc-daygrid-day {
          width: calc(100% / 7) !important;
          min-width: 0 !important;
          max-width: none !important;
          table-layout: fixed !important;
        }
        
        .fc-scrollgrid-sync-table,
        .fc-timegrid-body,
        .fc-timegrid-slots {
          table-layout: fixed !important;
          width: 100% !important;
        }
      `}</style>
    </div>
  );
});

CalendarWrapper.displayName = 'CalendarWrapper';

export default CalendarWrapper; 
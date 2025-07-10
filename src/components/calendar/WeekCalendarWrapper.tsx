import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BaseCalendarProps, baseCalendarOptions } from './BaseCalendarWrapper';
import CalendarEventCard from './CalendarEventCard';

const WeekCalendarWrapper: React.FC<BaseCalendarProps> = ({
  events,
  onDateSelect,
  onEventClick,
  calendarRef,
}) => {
  return (
    <div className="calendar-wrapper h-full flex flex-col overflow-hidden">
      <div className="calendar-container flex-1 h-full w-full">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          {...baseCalendarOptions}
          events={events}
          select={onDateSelect}
          eventClick={onEventClick}
          eventContent={(eventInfo) => <CalendarEventCard eventInfo={eventInfo} />}
          views={{
            timeGridWeek: {
              type: 'timeGrid',
              duration: { weeks: 1 }
            }
          }}
        />
      </div>
      <style>{`
        .fc-timegrid-event {
          min-height: 24px !important;
        }

        .fc-timegrid-event .fc-event-main {
          padding: 2px 4px !important;
        }

        .fc-v-event {
          min-height: 24px !important;
        }

        .fc-direction-ltr .fc-timegrid-col-events {
          margin: 0 2px !important;
        }

        .fc .fc-timegrid-now-indicator-line {
          z-index: 999;
        }

        .fc-theme-standard td, 
        .fc-theme-standard th,
        .fc-theme-standard .fc-scrollgrid {
          border-color: var(--border-color, #e5e7eb);
        }

        .dark .fc-theme-standard td,
        .dark .fc-theme-standard th,
        .dark .fc-theme-standard .fc-scrollgrid {
          border-color: var(--border-color-dark, #374151);
        }

        .fc-timegrid-event-harness {
          max-width: 100% !important;
        }

        .fc-scrollgrid-sync-table {
          height: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default WeekCalendarWrapper; 
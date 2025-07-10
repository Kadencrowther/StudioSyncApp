import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BaseCalendarProps, baseCalendarOptions } from './BaseCalendarWrapper';
import MonthViewEventCard from './MonthViewEventCard';

const MonthCalendarWrapper: React.FC<BaseCalendarProps> = ({
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
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          {...baseCalendarOptions}
          events={events}
          select={onDateSelect}
          eventClick={onEventClick}
          eventContent={(eventInfo) => <MonthViewEventCard eventInfo={eventInfo} />}
          views={{
            dayGridMonth: {
              type: 'dayGrid',
              duration: { months: 1 },
              dayMaxEvents: true,
              fixedWeekCount: false,
              showNonCurrentDates: true
            }
          }}
        />
      </div>
      <style>{`
        .fc-dayGridMonth-view .fc-daygrid-day {
          height: 120px !important;
          max-height: 120px !important;
        }

        .fc-dayGridMonth-view .fc-daygrid-day-frame {
          height: 100% !important;
          min-height: unset !important;
          max-height: 120px !important;
          padding-top: 20px !important;
        }

        .fc-dayGridMonth-view .fc-daygrid-day-top {
          position: absolute;
          top: 4px;
          left: 4px;
        }

        .fc-dayGridMonth-view .fc-daygrid-day-events {
          position: relative !important;
          min-height: 0 !important;
          margin: 0 !important;
          padding: 0 1px !important;
        }

        .fc-dayGridMonth-view .fc-daygrid-more-link {
          font-size: 11px;
          margin: 0;
          padding: 1px 2px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 3px;
        }

        .dark .fc-dayGridMonth-view .fc-daygrid-more-link {
          background: rgba(255, 255, 255, 0.1);
        }

        .fc-dayGridMonth-view .fc-daygrid-event-harness {
          margin: 1px 0 !important;
        }

        .fc-dayGridMonth-view .fc-event {
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default MonthCalendarWrapper; 
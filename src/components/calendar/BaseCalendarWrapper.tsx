import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg, EventInput, CalendarOptions } from '@fullcalendar/core';
import { ClassData } from '../../types/class.types';

export interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    classData?: ClassData;
  };
}

export interface BaseCalendarProps {
  events: CalendarEvent[];
  onDateSelect: (selectInfo: DateSelectArg) => void;
  onEventClick: (clickInfo: EventClickArg) => void;
  calendarRef: React.RefObject<FullCalendar>;
}

export const baseCalendarOptions: Partial<CalendarOptions> = {
  headerToolbar: false,
  selectable: true,
  allDaySlot: false,
  nowIndicator: true,
  slotEventOverlap: false,
  eventBackgroundColor: "transparent",
  eventBorderColor: "transparent",
  eventClassNames: "calendar-event",
  slotMinTime: "06:00:00",
  slotMaxTime: "22:00:00",
  height: "100%",
  handleWindowResize: true,
}; 
import { EventInput } from '@fullcalendar/core';
import { ClassData } from './class.types';

export interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    classData?: ClassData;
  };
} 
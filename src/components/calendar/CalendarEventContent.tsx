import React from 'react';
import { EventContentArg } from '@fullcalendar/core';

const CalendarEventContent: React.FC<{ eventInfo: EventContentArg }> = ({ eventInfo }) => {
  const classType = eventInfo.event.extendedProps.classData?.ClassType || 'Regular';
  const colorClass = `fc-bg-${classType.toLowerCase()}`;
  
  return (
    <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default CalendarEventContent; 
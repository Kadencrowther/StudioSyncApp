import React, { useRef, useEffect, useState } from 'react';
import { EventContentArg } from '@fullcalendar/core';
import { useStudioRooms } from '../../hooks/useStudioRooms';
import { useInstructors } from '../../hooks/useInstructors';
import { useUserStore } from '../../store/useUserStore';
import { ClassData } from '../../types/class.types';

interface EventCardProps {
  eventInfo: EventContentArg;
}

const CalendarEventCard: React.FC<EventCardProps> = ({ eventInfo }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);
  const [isSuperNarrow, setIsSuperNarrow] = useState(false);
  const currentStudio = useUserStore(state => state.currentStudio);
  const studioId = currentStudio || undefined;
  const { getRoom, getRoomColor } = useStudioRooms(studioId);
  const { getInstructorInitials } = useInstructors(studioId);
  const classData = eventInfo.event.extendedProps.classData as ClassData;
  
  useEffect(() => {
    const checkWidth = () => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        setIsNarrow(width < 120);
        setIsSuperNarrow(width < 80);
      }
    };

    // Check initially
    checkWidth();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(checkWidth);
    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  if (!classData) {
    return null;
  }

  const room = getRoom(classData.RoomId);
  const roomColor = getRoomColor(classData.RoomId);
  const instructorInitials = getInstructorInitials(classData.InstructorId);
  
  const startTime = new Date(eventInfo.event.start!).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const endTime = new Date(eventInfo.event.end!).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Calculate event duration in minutes
  const duration = (eventInfo.event.end!.getTime() - eventInfo.event.start!.getTime()) / (1000 * 60);
  const isShortEvent = duration <= 30;

  // Dynamic styles based on event duration and width
  const cardStyle: React.CSSProperties = {
    backgroundColor: `${roomColor}25`,
    borderLeft: `4px solid ${roomColor}`,
    height: '100%',
    minHeight: '24px',
    overflow: 'hidden',
    borderRadius: '4px',
    padding: isShortEvent || isSuperNarrow ? '2px 4px' : '4px 8px',
    position: 'relative',
  };

  return (
    <div 
      ref={cardRef}
      className="calendar-event-card group h-full"
      style={{ height: '100%', transition: 'all 0.2s ease-in-out' }}
    >
      <div 
        className={`
          h-full w-full 
          dark:bg-opacity-30 
          hover:shadow-md 
          transition-all duration-200 ease-in-out
          ${isShortEvent || isSuperNarrow ? 'text-xs' : 'text-sm'}
        `}
        style={cardStyle}
      >
        {/* Title Section with Instructor Initials */}
        <div className="flex justify-between items-start gap-1">
          <div className="font-medium text-gray-900 dark:text-white line-clamp-1 flex-1">
            {isSuperNarrow ? classData.ClassName.substring(0, 10) + '...' : classData.ClassName}
          </div>
          {instructorInitials && !isShortEvent && !isNarrow && (
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/20 px-1 rounded whitespace-nowrap">
              {instructorInitials}
            </div>
          )}
        </div>

        {/* Details Section - Only show if event is long enough and wide enough */}
        {!isShortEvent && !isSuperNarrow && (
          <div className="mt-1 text-xs">
            {/* Time - show if not super narrow */}
            {!isNarrow && (
              <div className="text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {startTime} - {endTime}
              </div>
            )}
            
            {/* Room Name - show only if enough space */}
            {duration >= 45 && !isNarrow && room && (
              <div className="text-gray-500 dark:text-gray-400 line-clamp-1">
                {room.Name}
              </div>
            )}

            {/* Additional Info - show only if plenty of space */}
            {duration >= 60 && !isNarrow && (
              <div className="text-gray-500 dark:text-gray-400 line-clamp-1">
                {classData.Students?.length || 0}/{classData.MaxSize} students
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarEventCard; 
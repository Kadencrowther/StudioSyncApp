import React from 'react';
import { useStudioRooms } from '../../hooks/useStudioRooms';
import { useInstructors } from '../../hooks/useInstructors';
import { useUserStore } from '../../store/useUserStore';
import { ClassData } from '../../types/class.types';

interface MonthViewEventCardProps {
  eventInfo: any;
}

const MonthViewEventCard: React.FC<MonthViewEventCardProps> = ({ eventInfo }) => {
  const currentStudio = useUserStore(state => state.currentStudio);
  const studioId = currentStudio || undefined;
  const { getRoomColor } = useStudioRooms(studioId);
  const { getInstructorInitials } = useInstructors(studioId);

  const classData = eventInfo.event.extendedProps.classData as ClassData;
  if (!classData) return null;

  const roomColor = getRoomColor(classData.RoomId);
  const instructorInitials = getInstructorInitials(classData.InstructorId);

  return (
    <div
      className="month-view-event-card group relative flex items-center bg-white dark:bg-gray-800 rounded shadow-sm transition-all w-full max-w-full overflow-hidden"
      style={{
        borderLeft: `2px solid ${roomColor}`,
      }}
    >
      <div className="flex-1 min-w-0 px-1.5 py-0.5 w-full max-w-full">
        <div className="flex items-center gap-1 w-full max-w-full overflow-hidden">
          <p className="text-xs font-medium text-gray-900 dark:text-white truncate flex-1 min-w-0">
            {classData.ClassName}
          </p>
          {instructorInitials && (
            <span className="flex-shrink-0 text-[10px] font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1 rounded">
              {instructorInitials}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthViewEventCard; 
import React from 'react';
import { format } from 'date-fns';
import { EventImpl } from '@fullcalendar/core/internal';
import { ClassData } from '../../types/class.types';
import { useStudioRooms } from '../../hooks/useStudioRooms';
import { useInstructors } from '../../hooks/useInstructors';
import { useUserStore } from '../../store/useUserStore';
import { Modal } from '../ui/modal';

interface MoreEventsModalProps {
  date: Date;
  events: EventImpl[];
  onClose: () => void;
  onEventClick: (event: EventImpl) => void;
  isOpen: boolean;
}

const MoreEventsModal: React.FC<MoreEventsModalProps> = ({
  date,
  events,
  onClose,
  onEventClick,
  isOpen
}) => {
  const currentStudio = useUserStore(state => state.currentStudio);
  const studioId = currentStudio || undefined;
  const { getRoomColor } = useStudioRooms(studioId);
  const { getInstructorInitials } = useInstructors(studioId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[500px] p-0 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {format(date, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="max-h-[400px] overflow-y-auto p-4">
        <div className="space-y-3">
          {events.map((event) => {
            const classData = event.extendedProps.classData as ClassData;
            const roomColor = getRoomColor(classData.RoomId);
            const instructorInitials = getInstructorInitials(classData.InstructorId);
            const startTime = format(event.start!, 'h:mm a');
            const endTime = format(event.end!, 'h:mm a');

            return (
              <div
                key={event.id}
                onClick={() => {
                  onEventClick(event);
                  onClose();
                }}
                className="group cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div
                  className="px-4 py-3 border-l-[3px] rounded-lg"
                  style={{ borderLeftColor: roomColor }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {classData.ClassName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {startTime} - {endTime}
                      </p>
                    </div>
                    {instructorInitials && (
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {instructorInitials}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default MoreEventsModal; 
import React from 'react';
import DaySelector from '../DaySelector';
import { ClassStyle } from '../../../services/classStyleService';
import { Season } from '../../../services/seasonService';
import { StudioRoom } from '../../../services/studioRoomService';
import { Instructor } from '../../../services/instructorService';
import { instructorService } from '../../../services/instructorService';

interface BasicClassInfoProps {
  className: string;
  classType: string;
  days: string[];
  startTime: string;
  endTime: string;
  maxSize: number;
  instructorId: string;
  classStyleId: string;
  seasonId: string;
  roomId: string;
  onInputChange: (name: string, value: string | number | string[]) => void;
  instructors: Instructor[];
  classStyles: ClassStyle[];
  seasons: Season[];
  rooms: StudioRoom[];
}

export const BasicClassInfo: React.FC<BasicClassInfoProps> = ({
  className,
  classType,
  days,
  startTime,
  endTime,
  maxSize,
  instructorId,
  classStyleId,
  seasonId,
  roomId,
  onInputChange,
  instructors,
  classStyles,
  seasons,
  rooms,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Class Name
        </label>
        <input
          type="text"
          value={className}
          onChange={(e) => onInputChange('ClassName', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Class Type
        </label>
        <select
          value={classType}
          onChange={(e) => onInputChange('ClassType', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
        >
          <option value="Regular">Regular</option>
          <option value="Workshop">Workshop</option>
          <option value="Private">Private</option>
          <option value="Competition">Competition</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Days
        </label>
        <DaySelector
          selectedDays={days}
          onChange={(newDays) => onInputChange('Days', newDays)}
          className="mb-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Start Time
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => onInputChange('StartTime', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          End Time
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => onInputChange('EndTime', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Max Class Size
        </label>
        <input
          type="number"
          value={maxSize}
          onChange={(e) => onInputChange('MaxSize', Number(e.target.value))}
          min="1"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Instructor
        </label>
        <select
          value={instructorId}
          onChange={(e) => onInputChange('InstructorId', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        >
          <option value="">Select Instructor</option>
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.id}>
              {instructorService.getInstructorFullName(instructor)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Class Style
        </label>
        <select
          value={classStyleId}
          onChange={(e) => onInputChange('ClassStyleId', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        >
          <option value="">Select Style</option>
          {classStyles.map(style => (
            <option key={style.id} value={style.id}>
              {style.StyleName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Season
        </label>
        <select
          value={seasonId}
          onChange={(e) => onInputChange('SeasonId', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        >
          <option value="">Select Season</option>
          {seasons.map(season => (
            <option key={season.id} value={season.id}>
              {season.Name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Room
        </label>
        <select
          value={roomId}
          onChange={(e) => onInputChange('RoomId', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          required
        >
          <option value="">Select Room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.Name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}; 
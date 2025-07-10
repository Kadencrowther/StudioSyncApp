import React, { useEffect, useState } from 'react';
import ViewDropdown from '../ui/dropdown/ViewDropdown';
import { StudioRoom, studioRoomService } from '../../services/studioRoomService';

interface StudioRoomFilterProps {
  studioId: string;
  currentRoomId: string[];
  onRoomChange: (roomIds: string[]) => void;
  className?: string;
}

const RoomIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const StudioRoomFilter: React.FC<StudioRoomFilterProps> = ({
  studioId,
  currentRoomId,
  onRoomChange,
  className = '',
}) => {
  const [rooms, setRooms] = useState<StudioRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      console.log('Loading rooms for studio:', studioId);
      try {
        const roomsMap = await studioRoomService.fetchStudioRooms(studioId);
        console.log('Fetched rooms:', roomsMap);
        
        const roomsList = Array.from(roomsMap.values())
          .filter(room => room.IsActive)
          .sort((a, b) => a.Name.localeCompare(b.Name));
        
        console.log('Processed rooms list:', roomsList);
        setRooms(roomsList);
      } catch (error) {
        console.error('Error loading rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (studioId) {
      loadRooms();
    } else {
      console.warn('No studioId provided to StudioRoomFilter');
    }
  }, [studioId]);

  const roomOptions = rooms.map(room => ({
    label: room.Name,
    value: room.id,
    color: room.Color
  }));

  console.log('Room options:', roomOptions);
  console.log('Current room IDs:', currentRoomId);

  return (
    <ViewDropdown<string[]>
      value={currentRoomId}
      options={roomOptions}
      onViewChange={onRoomChange}
      className={className}
      defaultLabel="Room"
      isLoading={isLoading}
      isMulti={true}
      allItemsLabel="All Rooms"
      icon={<RoomIcon />}
    />
  );
};

export default StudioRoomFilter; 
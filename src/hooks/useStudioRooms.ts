import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface StudioRoom {
  id: string;
  Color: string;
  Name: string;
}

export const useStudioRooms = (studioId: string | undefined) => {
  const [rooms, setRooms] = useState<Map<string, StudioRoom>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!studioId) return;

      try {
        const roomsRef = collection(db, `Studios/${studioId}/StudioRooms`);
        const snapshot = await getDocs(roomsRef);
        const roomsMap = new Map<string, StudioRoom>();
        
        snapshot.docs.forEach(doc => {
          const room = {
            id: doc.id,
            ...doc.data()
          } as StudioRoom;
          roomsMap.set(doc.id, room);
        });

        setRooms(roomsMap);
      } catch (error) {
        console.error('Error fetching studio rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [studioId]);

  const getRoom = (roomId: string | undefined): StudioRoom | undefined => {
    if (!roomId) return undefined;
    return rooms.get(roomId);
  };

  const getRoomColor = (roomId: string | undefined): string => {
    if (!roomId) return '#6366f1'; // Default indigo color
    return rooms.get(roomId)?.Color || '#6366f1';
  };

  return {
    getRoom,
    getRoomColor,
    loading
  };
}; 
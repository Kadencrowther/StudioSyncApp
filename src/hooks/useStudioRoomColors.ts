import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface StudioRoom {
  id: string;
  Color: string;
  Name: string;
}

export const useStudioRoomColors = (studioId: string | undefined) => {
  const [roomColors, setRoomColors] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomColors = async () => {
      if (!studioId) return;

      try {
        const roomsRef = collection(db, `Studios/${studioId}/StudioRooms`);
        const snapshot = await getDocs(roomsRef);
        const colors = new Map<string, string>();
        
        snapshot.docs.forEach(doc => {
          const room = doc.data() as StudioRoom;
          colors.set(doc.id, room.Color);
        });

        setRoomColors(colors);
      } catch (error) {
        console.error('Error fetching studio room colors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomColors();
  }, [studioId]);

  const getColorForRoom = (roomId: string | undefined): string => {
    if (!roomId) return '#6366f1'; // Default indigo color
    return roomColors.get(roomId) || '#6366f1';
  };

  return {
    getColorForRoom,
    loading
  };
}; 
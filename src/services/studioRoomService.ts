import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface StudioRoom {
  id: string;
  Name: string;
  Color: string;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export const studioRoomService = {
  fetchStudioRooms: async (studioId: string): Promise<Map<string, StudioRoom>> => {
    try {
      const roomsRef = collection(db, `Studios/${studioId}/StudioRooms`);
      const snapshot = await getDocs(roomsRef);
      const roomsMap = new Map<string, StudioRoom>();
      
      snapshot.docs.forEach(doc => {
        roomsMap.set(doc.id, {
          id: doc.id,
          ...doc.data()
        } as StudioRoom);
      });
      
      return roomsMap;
    } catch (error) {
      console.error('Error fetching studio rooms:', error);
      throw error;
    }
  },

  getRoomName: (roomsMap: Map<string, StudioRoom>, roomId: string): string => {
    const room = roomsMap.get(roomId);
    return room ? room.Name : 'Unknown Room';
  }
}; 
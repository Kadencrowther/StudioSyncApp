import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Season {
  id: string;
  Name: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export const seasonService = {
  fetchSeasons: async (studioId: string): Promise<Map<string, Season>> => {
    try {
      const seasonsRef = collection(db, `Studios/${studioId}/Seasons`);
      const snapshot = await getDocs(seasonsRef);
      const seasonsMap = new Map<string, Season>();
      
      snapshot.docs.forEach(doc => {
        seasonsMap.set(doc.id, {
          id: doc.id,
          ...doc.data()
        } as Season);
      });
      
      return seasonsMap;
    } catch (error) {
      console.error('Error fetching seasons:', error);
      throw error;
    }
  },

  getSeasonName: (seasonsMap: Map<string, Season>, seasonId: string): string => {
    const season = seasonsMap.get(seasonId);
    return season ? season.Name : 'Unknown Season';
  }
}; 
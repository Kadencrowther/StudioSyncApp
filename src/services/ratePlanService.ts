import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface HourRate {
  Hours: number;
  Rate: number;
}

export interface RatePlan {
  id: string;
  Name: string;
  IsActive: boolean;
  HourRates: HourRate[];
  FamilyDiscount: number | null;
  CreatedAt: string;
  UpdatedAt: string;
}

export const ratePlanService = {
  fetchRatePlans: async (studioId: string): Promise<Map<string, RatePlan>> => {
    try {
      const ratePlansRef = collection(db, `Studios/${studioId}/RatePlans`);
      const snapshot = await getDocs(ratePlansRef);
      const ratePlansMap = new Map<string, RatePlan>();
      
      snapshot.docs.forEach(doc => {
        ratePlansMap.set(doc.id, {
          id: doc.id,
          ...doc.data()
        } as RatePlan);
      });
      
      return ratePlansMap;
    } catch (error) {
      console.error('Error fetching rate plans:', error);
      throw error;
    }
  },

  getRatePlanName: (ratePlansMap: Map<string, RatePlan>, ratePlanId: string): string => {
    const ratePlan = ratePlansMap.get(ratePlanId);
    return ratePlan ? ratePlan.Name : 'Unknown Rate Plan';
  }
}; 
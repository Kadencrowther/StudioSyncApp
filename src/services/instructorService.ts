import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Instructor {
  id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone?: string;
  Role: string;
  IsActive: boolean;
  PayRate?: number;
  Classes?: string[];
  CreatedAt: any;
  UpdatedAt: any;
}

export const instructorService = {
  async fetchInstructors(studioId: string): Promise<Map<string, Instructor>> {
    try {
      const instructorsRef = collection(db, `Studios/${studioId}/Instructors`);
      const querySnapshot = await getDocs(instructorsRef);
      
      const instructorsMap = new Map<string, Instructor>();
      
      querySnapshot.docs.forEach(doc => {
        instructorsMap.set(doc.id, {
          id: doc.id,
          ...doc.data()
        } as Instructor);
      });

      return instructorsMap;
    } catch (error) {
      console.error('Error fetching instructors:', error);
      throw error;
    }
  },

  async fetchInstructorById(studioId: string, instructorId: string): Promise<Instructor | null> {
    try {
      const instructorRef = doc(db, `Studios/${studioId}/Instructors/${instructorId}`);
      const instructorDoc = await getDoc(instructorRef);
      
      if (!instructorDoc.exists()) {
        return null;
      }

      return {
        id: instructorDoc.id,
        ...instructorDoc.data()
      } as Instructor;
    } catch (error) {
      console.error('Error fetching instructor:', error);
      throw error;
    }
  },

  getInstructorFullName(instructor: Instructor): string {
    return `${instructor.FirstName} ${instructor.LastName}`;
  }
}; 
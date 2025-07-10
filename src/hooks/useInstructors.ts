import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Instructor {
  id: string;
  FirstName: string;
  LastName: string;
}

export const useInstructors = (studioId: string | undefined) => {
  const [instructors, setInstructors] = useState<Map<string, Instructor>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      if (!studioId) return;

      try {
        const instructorsRef = collection(db, `Studios/${studioId}/Instructors`);
        const snapshot = await getDocs(instructorsRef);
        const instructorsMap = new Map<string, Instructor>();
        
        snapshot.docs.forEach(doc => {
          const instructor = {
            id: doc.id,
            ...doc.data()
          } as Instructor;
          instructorsMap.set(doc.id, instructor);
        });

        setInstructors(instructorsMap);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [studioId]);

  const getInstructor = (instructorId: string | undefined): Instructor | undefined => {
    if (!instructorId) return undefined;
    return instructors.get(instructorId);
  };

  const getInstructorInitials = (instructorId: string | undefined): string => {
    if (!instructorId) return '';
    const instructor = instructors.get(instructorId);
    if (!instructor) return '';
    
    const firstInitial = instructor.FirstName ? instructor.FirstName[0] : '';
    const lastInitial = instructor.LastName ? instructor.LastName[0] : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return {
    getInstructor,
    getInstructorInitials,
    loading
  };
}; 
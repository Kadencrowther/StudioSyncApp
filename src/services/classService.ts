import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ClassData } from '../types/class.types';
import { CalendarEvent } from '../types/calendar.types';

export const classService = {
  fetchClasses: async (studioId: string): Promise<ClassData[]> => {
    try {
      const classesRef = collection(db, `Studios/${studioId}/Classes`);
      const snapshot = await getDocs(classesRef);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          ClassId: doc.id, // Ensure both id and ClassId are set
        } as ClassData;
      });
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },

  fetchClassById: async (studioId: string, classId: string): Promise<ClassData | null> => {
    try {
      const classRef = doc(db, `Studios/${studioId}/Classes`, classId);
      const classDoc = await getDoc(classRef);
      
      if (!classDoc.exists()) {
        return null;
      }

      const data = classDoc.data();
      return {
        ...data,
        id: classDoc.id,
        ClassId: classDoc.id, // Ensure both id and ClassId are set
      } as ClassData;
    } catch (error) {
      console.error('Error fetching class:', error);
      throw error;
    }
  },

  createClass: async (studioId: string, classData: Partial<ClassData>): Promise<string> => {
    try {
      const classesRef = collection(db, `Studios/${studioId}/Classes`);
      const docRef = await addDoc(classesRef, {
        ...classData,
        Students: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  },

  updateClass: async (studioId: string, classId: string, classData: Partial<ClassData>): Promise<void> => {
    try {
      const classRef = doc(db, `Studios/${studioId}/Classes`, classId);
      await updateDoc(classRef, {
        ...classData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating class:', error);
      throw error;
    }
  },

  deleteClass: async (studioId: string, classId: string): Promise<void> => {
    try {
      const classRef = doc(db, `Studios/${studioId}/Classes`, classId);
      await deleteDoc(classRef);
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  },

  /**
   * Converts a class to calendar events for each occurrence
   */
  convertClassToCalendarEvents(classData: ClassData): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const now = new Date();
    const oneMonthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    // Get all dates between now and one month from now
    const currentDate = new Date(now);
    while (currentDate <= oneMonthFromNow) {
      // Get the day name in lowercase
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
      // Check if class occurs on this day
      const hasClass = classData.Days.some(classDay => {
        const normalizedClassDay = classDay.toLowerCase().trim();
        return normalizedClassDay === dayOfWeek;
      });

      if (hasClass) {
        // Create event for this occurrence
        const [startHour, startMinute] = classData.StartTime.split(':').map(Number);
        const [endHour, endMinute] = classData.EndTime.split(':').map(Number);

        const startDate = new Date(currentDate);
        startDate.setHours(startHour, startMinute, 0);

        const endDate = new Date(currentDate);
        endDate.setHours(endHour, endMinute, 0);

        const event: CalendarEvent = {
          id: `${classData.id}-${startDate.toISOString()}`,
          title: classData.ClassName,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          extendedProps: {
            calendar: 'primary',
            classData: classData
          }
        };

        events.push(event);
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(`Generated ${events.length} events for class ${classData.ClassName}`);
    return events;
  },

  /**
   * Fetches all classes and converts them to calendar events
   */
  async fetchClassesAsCalendarEvents(studioId: string): Promise<CalendarEvent[]> {
    try {
      console.log('Fetching classes for studio:', studioId);
      const classes = await this.fetchClasses(studioId);
      console.log('Fetched classes:', classes);
      const allEvents = classes.flatMap(classData => this.convertClassToCalendarEvents(classData));
      console.log('Generated events:', allEvents);
      return allEvents;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  },

  /**
   * Fetches classes filtered by season and room
   */
  async fetchFilteredClasses(
    studioId: string,
    seasonIds: string[] = [],
    roomIds: string[] = []
  ): Promise<ClassData[]> {
    try {
      const classesRef = collection(db, `Studios/${studioId}/Classes`);
      let classesQuery = query(classesRef);

      // Add filters if specified
      if (seasonIds.length > 0 && !seasonIds.includes('all')) {
        classesQuery = query(classesQuery, where('SeasonId', 'in', seasonIds));
      }
      if (roomIds.length > 0 && !roomIds.includes('all')) {
        classesQuery = query(classesQuery, where('RoomId', 'in', roomIds));
      }

      const snapshot = await getDocs(classesQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ClassData));
    } catch (error) {
      console.error('Error fetching filtered classes:', error);
      throw error;
    }
  },

  /**
   * Fetches filtered classes and converts them to calendar events
   */
  async fetchFilteredCalendarEvents(
    studioId: string,
    seasonIds: string[] = [],
    roomIds: string[] = []
  ): Promise<CalendarEvent[]> {
    try {
      console.log('Fetching filtered classes:', { studioId, seasonIds, roomIds });
      const classes = await this.fetchFilteredClasses(studioId, seasonIds, roomIds);
      console.log('Fetched filtered classes:', classes);
      const allEvents = classes.flatMap(classData => this.convertClassToCalendarEvents(classData));
      console.log('Generated filtered events:', allEvents);
      return allEvents;
    } catch (error) {
      console.error('Error fetching filtered calendar events:', error);
      throw error;
    }
  }
}; 
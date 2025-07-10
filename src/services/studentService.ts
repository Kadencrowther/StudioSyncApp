import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Student {
  id: string;
  FirstName: string;
  LastName: string;
  FamilyId: string;
  Age: number;
  Gender: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export const studentService = {
  fetchStudents: async (studioId: string): Promise<Map<string, Student>> => {
    try {
      const studentsRef = collection(db, `Studios/${studioId}/Students`);
      const snapshot = await getDocs(studentsRef);
      const studentsMap = new Map<string, Student>();
      
      snapshot.docs.forEach(doc => {
        studentsMap.set(doc.id, {
          id: doc.id,
          ...doc.data()
        } as Student);
      });
      
      return studentsMap;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  fetchStudentsByIds: async (studioId: string, studentIds: string[]): Promise<Student[]> => {
    try {
      const students: Student[] = [];
      for (const id of studentIds) {
        const studentRef = doc(db, `Studios/${studioId}/Students`, id);
        const studentDoc = await getDoc(studentRef);
        if (studentDoc.exists()) {
          students.push({
            id: studentDoc.id,
            ...studentDoc.data()
          } as Student);
        }
      }
      return students;
    } catch (error) {
      console.error('Error fetching students by ids:', error);
      throw error;
    }
  },

  fetchStudentById: async (studioId: string, studentId: string): Promise<Student> => {
    try {
      const studentRef = doc(db, `Studios/${studioId}/Students`, studentId);
      const studentDoc = await getDoc(studentRef);
      if (!studentDoc.exists()) {
        throw new Error('Student not found');
      }
      return {
        id: studentDoc.id,
        ...studentDoc.data()
      } as Student;
    } catch (error) {
      console.error('Error fetching student by id:', error);
      throw error;
    }
  },

  getStudentFullName: (student: Student): string => {
    return `${student.FirstName} ${student.LastName}`;
  }
}; 
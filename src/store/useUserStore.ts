import { create } from 'zustand';
import { collection, doc, getDoc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface StudioUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'owner' | 'admin' | 'instructor' | 'student' | 'parent';
  phoneNumber?: string;
  isActive: boolean;
  studioId: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  permissions?: string[];
}

interface UserState {
  currentStudio: string | null;
  currentUserDoc: any | null;
  userData: any | null;
  loading: boolean;
  error: string | null;
  setUserData: (data: any) => void;
  clearUserData: () => void;
  findUserStudios: (uid: string) => Promise<string[]>;
  fetchUserData: (studioId: string, uid: string) => Promise<void>;
  updateProfile: (studioId: string, uid: string, data: any) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  currentStudio: null,
  currentUserDoc: null,
  userData: null,
  loading: false,
  error: null,

  setUserData: (data) => set({ userData: data }),
  
  clearUserData: () => set({ 
    userData: null, 
    currentStudio: null,
    currentUserDoc: null,
    error: null 
  }),

  findUserStudios: async (uid) => {
    try {
      set({ loading: true });
      const studios: string[] = [];
      
      // Get all studios
      const studiosRef = collection(db, 'Studios');
      const studiosSnapshot = await getDocs(studiosRef);
      
      // For each studio, check if user exists in Users collection
      for (const studioDoc of studiosSnapshot.docs) {
        const usersRef = collection(db, `Studios/${studioDoc.id}/Users`);
        const q = query(usersRef, where('Uid', '==', uid));
        const userSnapshot = await getDocs(q);
        
        if (!userSnapshot.empty) {
          studios.push(studioDoc.id);
        }
      }
      
      set({ loading: false });
      return studios;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return [];
    }
  },

  fetchUserData: async (studioId, uid) => {
    try {
      set({ loading: true });
      
      // Query the Users collection to find the document with matching Uid
      const usersRef = collection(db, `Studios/${studioId}/Users`);
      const q = query(usersRef, where('Uid', '==', uid));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('User not found in studio');
      }
      
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      set({ 
        userData,
        currentStudio: studioId,
        currentUserDoc: { id: userDoc.id, ...userData },
        loading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateProfile: async (studioId, uid, data) => {
    try {
      set({ loading: true });
      
      // Find the user document by Uid
      const usersRef = collection(db, `Studios/${studioId}/Users`);
      const q = query(usersRef, where('Uid', '==', uid));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('User not found in studio');
      }
      
      const userDoc = querySnapshot.docs[0];
      
      // Update the document
      await setDoc(doc(db, `Studios/${studioId}/Users`, userDoc.id), {
        ...data,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      set({ 
        userData: data,
        currentUserDoc: { id: userDoc.id, ...data },
        loading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
})); 
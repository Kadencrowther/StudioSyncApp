import { create } from 'zustand';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface DanceUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'student' | 'instructor' | 'admin';
  membershipType?: 'basic' | 'premium' | 'pro';
  enrolledClasses?: string[];
  profileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  userData: DanceUser | null;
  loading: boolean;
  error: string | null;
  setUserData: (data: DanceUser | null) => void;
  updateProfile: (uid: string, data: Partial<DanceUser>) => Promise<void>;
  fetchUserData: (uid: string) => Promise<void>;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  loading: false,
  error: null,

  setUserData: (data) => set({ userData: data }),

  updateProfile: async (uid, data) => {
    try {
      set({ loading: true, error: null });
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      set((state) => ({
        userData: state.userData ? { ...state.userData, ...data } : null,
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchUserData: async (uid) => {
    try {
      set({ loading: true, error: null });
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        set({ userData: userDoc.data() as DanceUser, loading: false });
      } else {
        // Initialize new user
        const newUser: DanceUser = {
          uid,
          email: '',
          role: 'student',
          profileComplete: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await setDoc(userRef, newUser);
        set({ userData: newUser, loading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  clearUserData: () => set({ userData: null, error: null })
})); 
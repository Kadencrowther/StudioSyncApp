import { create } from 'zustand';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useUserStore } from './useUserStore';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string, studioId?: string) => Promise<boolean>;
  signUp: (email: string, password: string, studioId: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  setError: (error: string | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  
  signIn: async (email: string, password: string, studioId?: string): Promise<boolean> => {
    try {
      set({ error: null, loading: true });
      
      // First authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // If studioId is provided, check if user exists in that studio's Users collection
      if (studioId) {
        await useUserStore.getState().fetchUserData(studioId, userCredential.user.uid);
        set({ user: userCredential.user, loading: false });
        return true;
      }

      // If no studioId provided, find all studios the user belongs to
      const userStudios = await useUserStore.getState().findUserStudios(userCredential.user.uid);
      
      if (userStudios.length === 0) {
        await firebaseSignOut(auth);
        set({ 
          error: 'User not found in any studio. Please contact your studio administrator.',
          loading: false,
          user: null 
        });
        return false;
      }
      
      // Use the first studio if multiple exist
      await useUserStore.getState().fetchUserData(userStudios[0], userCredential.user.uid);
      set({ user: userCredential.user, loading: false });
      return true;

    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return false;
    }
  },

  signUp: async (email: string, password: string, studioId: string, userData: any) => {
    try {
      set({ error: null, loading: true });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Initialize studio-specific user data
      const newUserData = {
        ...userData,
        uid: userCredential.user.uid,
        email: email,
        studioId: studioId,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await useUserStore.getState().setUserData(newUserData);
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      useUserStore.getState().clearUserData();
      set({ user: null, loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setError: (error: string | null) => set({ error }),

  checkAuth: async () => {
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        set({ loading: true });
        
        if (user) {
          // Find user's studios
          const userStudios = await useUserStore.getState().findUserStudios(user.uid);
          
          if (userStudios.length > 0) {
            // Load user data from the first studio they belong to
            await useUserStore.getState().fetchUserData(userStudios[0], user.uid);
            set({ user, loading: false });
          } else {
            set({ user: null, loading: false });
          }
        } else {
          useUserStore.getState().clearUserData();
          set({ user: null, loading: false });
        }
        
        unsubscribe();
        resolve();
      });
    });
  }
}));

// Initialize auth check
useAuthStore.getState().checkAuth(); 
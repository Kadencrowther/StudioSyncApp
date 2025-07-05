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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  
  signIn: async (email: string, password: string) => {
    try {
      set({ error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
      // Fetch user data
      await useUserStore.getState().fetchUserData(userCredential.user.uid);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
      // Initialize user data
      await useUserStore.getState().fetchUserData(userCredential.user.uid);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
      useUserStore.getState().clearUserData();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setError: (error: string | null) => set({ error })
}));

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
  if (user) {
    useUserStore.getState().fetchUserData(user.uid);
  } else {
    useUserStore.getState().clearUserData();
  }
}); 
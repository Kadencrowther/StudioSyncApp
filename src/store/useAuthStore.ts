import { create } from 'zustand';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useUserStore, UserState } from './useUserStore';

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

// Type assertion for useUserStore.getState()
const getUserStore = () => useUserStore.getState() as UserState;

let authCheckPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  
  signIn: async (email: string, password: string, studioId?: string): Promise<boolean> => {
    try {
      set({ error: null, loading: true });
      console.log('🔐 Setting Firebase persistence to LOCAL...');
      
      await setPersistence(auth, browserLocalPersistence);
      console.log('✅ Browser persistence set successfully');
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('🔑 User authenticated with Firebase:', userCredential.user.email);
      
      if (studioId) {
        console.log('🏢 Fetching user data for studio:', studioId);
        await getUserStore().fetchUserData(studioId, userCredential.user.uid);
        set({ user: userCredential.user, loading: false });
        console.log('✅ User data loaded for studio:', studioId);
        return true;
      }

      console.log('🔍 Finding user studios...');
      const userStudios = await getUserStore().findUserStudios(userCredential.user.uid);
      console.log('📋 Found studios:', userStudios);
      
      if (userStudios.length === 0) {
        console.error('❌ User not found in any studio');
        await firebaseSignOut(auth);
        set({ 
          error: 'User not found in any studio. Please contact your studio administrator.',
          loading: false,
          user: null 
        });
        return false;
      }
      
      console.log('🏢 Loading user data for studio:', userStudios[0]);
      await getUserStore().fetchUserData(userStudios[0], userCredential.user.uid);
      set({ user: userCredential.user, loading: false });
      console.log('✅ Sign in complete - User authenticated and data loaded');
      return true;

    } catch (error) {
      console.error('❌ Sign in error:', error);
      set({ error: (error as Error).message, loading: false });
      return false;
    }
  },

  signUp: async (email: string, password: string, studioId: string, userData: any) => {
    try {
      set({ error: null, loading: true });
      console.log('🔐 Setting up new user account...');
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Firebase account created:', userCredential.user.email);
      
      const newUserData = {
        ...userData,
        uid: userCredential.user.uid,
        email: email,
        studioId: studioId,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('💾 Saving user data to studio:', studioId);
      await getUserStore().setUserData(newUserData);
      set({ user: userCredential.user, loading: false });
      console.log('✅ Sign up complete - User created and data saved');
    } catch (error) {
      console.error('❌ Sign up error:', error);
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      console.log('🔒 Signing out user...');
      await firebaseSignOut(auth);
      getUserStore().clearUserData();
      set({ user: null, loading: false, error: null });
      console.log('✅ Sign out complete');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  setError: (error: string | null) => set({ error }),

  checkAuth: async () => {
    // If there's already an auth check in progress, return that promise
    if (authCheckPromise) {
      return authCheckPromise;
    }

    authCheckPromise = new Promise<void>((resolve) => {
      console.log('🔄 Checking authentication state...');
      
      // Set persistence immediately
      setPersistence(auth, browserLocalPersistence)
        .then(() => console.log('✅ Browser persistence set during auth check'))
        .catch(console.error);

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            console.log('👤 Auth state restored. User:', user.email);
            
            // Load user data in parallel
            const userStudiosPromise = getUserStore().findUserStudios(user.uid);
            
            // Set the user immediately while data loads
            set({ user, loading: true });
            
            const userStudios = await userStudiosPromise;
            console.log('📋 Found studios:', userStudios);
            
            if (userStudios.length > 0) {
              await getUserStore().fetchUserData(userStudios[0], user.uid);
              console.log('✅ Auth check complete - User authenticated and data loaded');
            } else {
              console.log('⚠️ User not found in any studio');
              await firebaseSignOut(auth);
              set({ user: null });
            }
          } else {
            console.log('ℹ️ No authenticated user found');
            getUserStore().clearUserData();
          }
        } catch (error) {
          console.error('❌ Error during auth check:', error);
          set({ user: null });
        } finally {
          set({ loading: false });
          authCheckPromise = null;
          resolve();
        }
      });

      // Clean up the listener when the promise is resolved
      return () => {
        unsubscribe();
        authCheckPromise = null;
      };
    });

    return authCheckPromise;
  }
}));

// Initialize auth check
useAuthStore.getState().checkAuth(); 
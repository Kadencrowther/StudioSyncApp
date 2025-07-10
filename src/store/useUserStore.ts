import { create } from 'zustand';
import { collection, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { persist } from 'zustand/middleware';

export interface StudioUser {
  Uid: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Role: 'owner' | 'admin' | 'instructor' | 'student' | 'parent';
  PhoneNumber?: string;
  IsActive: boolean;
  StudioId: string;
  CreatedAt: string;
  UpdatedAt: string;
  LastLoginAt?: string;
  Permissions?: string[];
  PhotoURL?: string;
}

export interface UserState {
  currentStudio: string | null;
  currentUserDoc: StudioUser | null;
  userData: StudioUser | null;
  loading: boolean;
  error: string | null;
  setUserData: (data: StudioUser) => void;
  clearUserData: () => void;
  findUserStudios: (uid: string) => Promise<string[]>;
  fetchUserData: (studioId: string, uid: string) => Promise<void>;
  updateProfile: (studioId: string, uid: string, data: Partial<StudioUser>) => Promise<void>;
}

// Cache for studio lookups
const studioCache = new Map<string, string[]>();
const userDataCache = new Map<string, StudioUser>();

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentStudio: null,
      currentUserDoc: null,
      userData: null,
      loading: false,
      error: null,

      setUserData: (data) => {
        console.log('💾 Setting user data:', data);
        // Cache the user data
        userDataCache.set(`${data.StudioId}:${data.Uid}`, data);
        set({ userData: data });
        console.log('✅ User data persisted to store');
      },
      
      clearUserData: () => {
        console.log('🧹 Clearing user data from store');
        studioCache.clear();
        userDataCache.clear();
        set({ 
          userData: null, 
          currentStudio: null,
          currentUserDoc: null,
          error: null 
        });
        console.log('✅ User data cleared');
      },

      findUserStudios: async (uid) => {
        try {
          console.log('🔍 Finding studios for user:', uid);
          set({ loading: true });

          // Check cache first
          if (studioCache.has(uid)) {
            const studios = studioCache.get(uid)!;
            console.log('📋 Found studios in cache:', studios);
            set({ loading: false });
            return studios;
          }

          const studios: string[] = [];
          const studiosRef = collection(db, 'Studios');
          const studiosSnapshot = await getDocs(studiosRef);
          
          // Use Promise.all for parallel queries
          const queries = studiosSnapshot.docs.map(async (studioDoc) => {
            const usersRef = collection(db, `Studios/${studioDoc.id}/Users`);
            const q = query(usersRef, where('Uid', '==', uid));
            const userSnapshot = await getDocs(q);
            
            if (!userSnapshot.empty) {
              studios.push(studioDoc.id);
            }
          });

          await Promise.all(queries);
          
          // Cache the results
          studioCache.set(uid, studios);
          console.log('📋 Found studios:', studios);
          set({ loading: false });
          return studios;
        } catch (error) {
          console.error('❌ Error finding user studios:', error);
          set({ error: (error as Error).message, loading: false });
          return [];
        }
      },

      fetchUserData: async (studioId, uid) => {
        try {
          console.log('🔄 Fetching user data for studio:', studioId);
          set({ loading: true });

          // Check cache first
          const cacheKey = `${studioId}:${uid}`;
          if (userDataCache.has(cacheKey)) {
            const cachedData = userDataCache.get(cacheKey)!;
            console.log('📋 Found user data in cache:', cachedData);
            set({ 
              userData: cachedData,
              currentStudio: studioId,
              currentUserDoc: cachedData,
              loading: false 
            });
            return;
          }
          
          const usersRef = collection(db, `Studios/${studioId}/Users`);
          const q = query(usersRef, where('Uid', '==', uid));
          const querySnapshot = await getDocs(q);
          
          if (querySnapshot.empty) {
            throw new Error('User not found in studio');
          }
          
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as StudioUser;
          
          // Cache the data
          userDataCache.set(cacheKey, userData);
          console.log('💾 Persisting user data to store:', userData);
          set({ 
            userData,
            currentStudio: studioId,
            currentUserDoc: { id: userDoc.id, ...userData } as StudioUser,
            loading: false 
          });
          console.log('✅ User data loaded and persisted');
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
          set({ error: (error as Error).message, loading: false });
        }
      },

      updateProfile: async (studioId, uid, data) => {
        try {
          console.log('📝 Updating user profile...');
          set({ loading: true });
          
          const usersRef = collection(db, `Studios/${studioId}/Users`);
          const q = query(usersRef, where('Uid', '==', uid));
          const querySnapshot = await getDocs(q);
          
          if (querySnapshot.empty) {
            throw new Error('User not found in studio');
          }
          
          const userDoc = querySnapshot.docs[0];
          
          await setDoc(doc(db, `Studios/${studioId}/Users`, userDoc.id), {
            ...data,
            UpdatedAt: new Date().toISOString()
          }, { merge: true });
          
          const updatedData = { ...userDoc.data(), ...data } as StudioUser;
          // Update cache
          userDataCache.set(`${studioId}:${uid}`, updatedData);
          console.log('💾 Persisting updated user data:', updatedData);
          set({ 
            userData: updatedData,
            currentUserDoc: { id: userDoc.id, ...updatedData } as StudioUser,
            loading: false 
          });
          console.log('✅ Profile update complete');
        } catch (error) {
          console.error('❌ Error updating profile:', error);
          set({ error: (error as Error).message, loading: false });
        }
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        currentStudio: state.currentStudio,
        currentUserDoc: state.currentUserDoc,
        userData: state.userData,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('🔄 Rehydrating user store from storage...');
        if (state?.userData) {
          // Populate cache from storage
          userDataCache.set(`${state.userData.StudioId}:${state.userData.Uid}`, state.userData);
          console.log('✅ User data restored from storage:', state.userData);
        } else {
          console.log('ℹ️ No user data found in storage');
        }
      }
    }
  )
); 
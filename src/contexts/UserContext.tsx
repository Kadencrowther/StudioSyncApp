import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photoURL?: string;
}

interface UserContextType {
  userData: UserData | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData({
              firstName: data.firstName,
              lastName: data.lastName,
              email: user.email || data.email,
              role: data.role,
              photoURL: user.photoURL || data.photoURL,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 
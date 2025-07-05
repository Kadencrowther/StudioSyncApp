import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXFBdSDYBz4FqT1HshjSJwHuPDwXcc3zI",
  authDomain: "studiosync-af73d.firebaseapp.com",
  projectId: "studiosync-af73d",
  storageBucket: "studiosync-af73d.appspot.com",
  messagingSenderId: "172555302276",
  appId: "1:172555302276:web:5710b72f825deaf7de59d1",
  measurementId: "G-TLH67F2G5J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app); 
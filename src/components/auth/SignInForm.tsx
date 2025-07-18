import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useAuthStore } from "../../store/useAuthStore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

interface StudioBranding {
  studioName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function SignInForm() {
  const { studioId } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [studioBranding, setStudioBranding] = useState<StudioBranding | null>(null);
  
  const navigate = useNavigate();
  const { signIn, error, setError } = useAuthStore();

  useEffect(() => {
    const loadStudioBranding = async () => {
      if (!studioId) {
        setLoading(false);
        return;
      }

      try {
        const studioRef = doc(db, 'Studios', studioId);
        const studioDoc = await getDoc(studioRef);

        if (!studioDoc.exists()) {
          setError('Studio not found');
          setLoading(false);
          return;
        }

        const data = studioDoc.data();
        setStudioBranding({
          studioName: data.StudioName || '',
          logoUrl: data.LogoUrl || '',
          primaryColor: data.PrimaryColor || '#36404e',
          secondaryColor: data.SecondaryColor || '#c8b568'
        });
      } catch (error) {
        setError('Failed to load studio information');
      }
      setLoading(false);
    };

    loadStudioBranding();
  }, [studioId, setError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First authenticate with Firebase
      const success = await signIn(email, password, studioId);
      if (success) {
        // Get the current user's UID after successful authentication
        const currentUser = auth.currentUser;
        if (!currentUser || !studioId) {
          setError('Authentication failed');
          return;
        }

        // Check if user exists in this studio's Users collection
        const usersRef = collection(db, `Studios/${studioId}/Users`);
        const q = query(usersRef, where('Uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('You do not have access to this studio');
          // Sign out the user since they don't have access to this studio
          await auth.signOut();
          return;
        }

        const userDoc = querySnapshot.docs[0];
        navigate(`/${studioId}/${userDoc.id}`);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError((err as Error).message || 'Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      if (!user || !studioId) {
        setError('Authentication failed');
        setIsGoogleLoading(false);
        return;
      }

      // Check if user exists in this studio's Users collection
      const usersRef = collection(db, `Studios/${studioId}/Users`);
      const q = query(usersRef, where('Uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('You do not have access to this studio');
        // Sign out the user since they don't have access to this studio
        await auth.signOut();
        setIsGoogleLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      // Use the auth store's signIn method to properly set the state
      await useAuthStore.getState().checkAuth();
      navigate(`/${studioId}/${userDoc.id}`);
    } catch (err) {
      console.error('Google sign in error:', err);
      setError((err as Error).message || 'Google sign in failed');
      await auth.signOut();
      setIsGoogleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-center flex-1">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        {isGoogleLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Authenticating with Google...</p>
          </div>
        ) : (
          <div>
            <div className="mb-5 sm:mb-8">
              {studioBranding?.logoUrl && (
                <img
                  src={studioBranding.logoUrl}
                  alt={`${studioBranding.studioName} logo`}
                  className="mx-auto h-16 w-auto mb-4"
                />
              )}
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md text-center">
                Sign In {studioBranding?.studioName ? `to ${studioBranding.studioName}` : ''}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Enter your email and password to sign in!
              </p>
              {error && (
                <p className="mt-2 text-sm text-error-500 text-center">{error}</p>
              )}
            </div>
            <div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 disabled:opacity-50"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
              <div className="relative py-3 sm:py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                    Or
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input 
                      placeholder="info@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isChecked} onChange={setIsChecked} />
                      <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                        Keep me logged in
                      </span>
                    </div>
                    <Link
                      to="/reset-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: studioBranding?.primaryColor,
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg transition w-full px-4 py-3 text-sm text-white shadow-theme-xs hover:opacity-90 disabled:opacity-50"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Don&apos;t have an account? {""}
                  <Link
                    to="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

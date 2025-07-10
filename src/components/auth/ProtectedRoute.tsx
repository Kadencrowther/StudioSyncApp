import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuthStore();
  const { currentStudio, currentUserDoc, loading: userLoading } = useUserStore();
  const location = useLocation();
  const { studioId, userId } = useParams();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    console.log('🔒 ProtectedRoute - Auth State:', {
      user: user?.email,
      authLoading,
      userLoading,
      currentStudio,
      currentUserDoc: currentUserDoc?.Email
    });

    // Wait for both stores to finish their initial loading
    if (!authLoading && !userLoading) {
      setIsInitializing(false);
    }
  }, [user, authLoading, userLoading, currentStudio, currentUserDoc]);

  useEffect(() => {
    // If we're already authenticated but missing URL parameters, redirect to the full URL
    if (user && currentStudio && currentUserDoc && (!studioId || !userId)) {
      console.log('🔄 Updating URL with full path parameters');
      const baseUrl = location.pathname === '/' ? '' : location.pathname;
      const fullUrl = `${baseUrl}/${currentStudio}/${currentUserDoc.Uid}${location.search}`;
      window.history.replaceState(null, '', fullUrl);
    }
  }, [user, currentStudio, currentUserDoc, location, studioId, userId]);

  // Show nothing while initializing to prevent flash of redirect
  if (isInitializing || authLoading || userLoading) {
    console.log('⌛ Loading authentication state...');
    return null; // Or a loading spinner component
  }

  // Only redirect if we're sure we're not authenticated
  if (!user || !currentStudio || !currentUserDoc) {
    console.log('🚫 Not authenticated, redirecting to signin');
    // Store the attempted URL for redirect after login
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  console.log('✅ Authentication verified, rendering protected content');
  return <>{children}</>;
} 
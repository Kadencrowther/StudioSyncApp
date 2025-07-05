import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthStore();
  const { currentStudio, currentUserDoc } = useUserStore();
  const location = useLocation();
  const { studioId, userId } = useParams();

  useEffect(() => {
    // If we're already authenticated but missing URL parameters, redirect to the full URL
    if (user && currentStudio && currentUserDoc && (!studioId || !userId)) {
      const baseUrl = location.pathname === '/' ? '' : location.pathname;
      const fullUrl = `${baseUrl}/${currentStudio}/${currentUserDoc.id}${location.search}`;
      window.history.replaceState(null, '', fullUrl);
    }
  }, [user, currentStudio, currentUserDoc, location, studioId, userId]);

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 
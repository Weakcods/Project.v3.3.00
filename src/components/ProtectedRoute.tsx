import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useAuthStore } from '../stores/authStore';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ requireAdmin = false }) {
  const { user, token } = useAuthStore();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading text="Checking authentication..." />;
  }
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/dashboard/user" replace />;
  }

  if (!requireAdmin && user?.role === 'admin' && location.pathname === '/dashboard/user') {
    return <Navigate to="/dashboard/admin" replace />;
  }
  
  return <Outlet />;
}
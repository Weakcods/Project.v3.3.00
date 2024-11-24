import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function ProtectedRoute({ requireAdmin = false }) {
  const { user, token } = useAuthStore();
  const location = useLocation();
  
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
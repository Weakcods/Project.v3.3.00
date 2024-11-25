import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VisitorRequests from './pages/VisitorRequests';
import AccessLogs from './pages/AccessLogs';
import Security from './pages/Security';
import Analytics from './pages/Analytics';
import UserManagement from './pages/UserManagement';
import Settings from './pages/user/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
//import UserSettings from './pages/user/UserSettings';
import ProfileForm from './components/ProfileForm';
import FeedbackSection from './pages/Feedback';


function App() {
  const { theme } = useThemeStore();

  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard/user" element={<UserDashboard />} />
              <Route path="/requests" element={<VisitorRequests />} />
              <Route path="/logs" element={<AccessLogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/profile" element={<ProfileForm/>} />  {/*  edit this to link another pages*/}
              <Route path="/feedback" element={<FeedbackSection />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route element={<Layout />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/security" element={<Security />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<UserManagement />} />
            </Route>
          </Route>

          {/* Redirect /dashboard to the appropriate dashboard based on role */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard/user" replace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
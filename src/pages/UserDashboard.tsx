import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import DashboardStats from './user/DashboardStat';
import ActivitySection from './user/ActivitySection';

export default function UserDashboard() {
  const { user} = useAuthStore();  // Assuming you have isLoading to track auth loading state
  const [activeSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.name || user?.email.split('@')[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your gate passes and requirements
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {activeSection === 'overview' && (
            <>
              <DashboardStats />
              <ActivitySection />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

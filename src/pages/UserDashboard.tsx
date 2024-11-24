import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import DashboardStats from './user/DashboardStat';
import RequirementsSection from './user/RequirementSection';
import PaymentSection from './user/PaymentSection';
import ActivitySection from './user/ActivitySection';

export default function UserDashboard() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your gate passes and requirements
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {['overview', 'requirements', 'payments'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === section
                  ? 'bg-gradient-to-r from-[#FDFC47] to-[#24FE41] text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {activeSection === 'overview' && (
            <>
              <DashboardStats />
              <ActivitySection />
            </>
          )}
          
          {activeSection === 'requirements' && (
            <RequirementsSection />
          )}
          
          {activeSection === 'payments' && (
            <PaymentSection />
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Save } from 'lucide-react';

export default function UserSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    notifications: {
      email: true,
      sms: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Account Settings
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-[#24FE41] hover:bg-[#24FE41]/10 rounded-lg transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#24FE41] focus:border-transparent transition-all bg-white/50 dark:bg-gray-700/50 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#24FE41] focus:border-transparent transition-all bg-white/50 dark:bg-gray-700/50 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#24FE41] focus:border-transparent transition-all bg-white/50 dark:bg-gray-700/50 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifications.email}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: {
                    ...formData.notifications,
                    email: e.target.checked,
                  },
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-[#24FE41] focus:ring-[#24FE41]"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifications.sms}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: {
                    ...formData.notifications,
                    sms: e.target.checked,
                  },
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-[#24FE41] focus:ring-[#24FE41]"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">SMS notifications</span>
            </label>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#FDFC47] to-[#24FE41] text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        )}
      </form>

      <div className="mt-8 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="flex items-start gap-3">
          <Shield className="text-[#24FE41]" size={24} />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Account Security
            </h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Your account is protected with two-factor authentication. You can manage your security settings and devices from the security tab.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
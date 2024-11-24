import { Bell, User, Globe } from 'lucide-react';

const settingSections = [
  {
    title: 'Profile Settings',
    icon: User,
    settings: [
      { name: 'Update Profile Information', description: 'Change your name, email, and other personal details' },
      { name: 'Change Password', description: 'Update your password for better security' },
      { name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
    ]
  },
  {
    title: 'Notification Settings',
    icon: Bell,
    settings: [
      { name: 'Email Notifications', description: 'Receive updates and alerts via email' },
      { name: 'Push Notifications', description: 'Get instant notifications on your device' },
      { name: 'Notification Preferences', description: 'Customize what notifications you want to receive' },
    ]
  },
  {
    title: 'System Settings',
    icon: Globe,
    settings: [
      { name: 'Language', description: 'Choose your preferred language' },
      { name: 'Time Zone', description: 'Set your local time zone' },
      { name: 'Date Format', description: 'Choose how dates are displayed' },
    ]
  },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="space-y-6">
        {settingSections.map((section) => (
          <div key={section.title} className="card">
            <div className="flex items-center space-x-2 mb-6">
              {/* Render the icon dynamically */}
              <section.icon size={24} className="text-[#24FE41]" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{setting.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                  </div>


                  {/* Use Link component instead of <a> for internal navigation 
                  nasa Profileform.tsx*/}
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg transition-colors">
                      Configure
                    </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

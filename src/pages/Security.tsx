import { Shield, Bell, Camera, Lock, UserX, AlertTriangle } from 'lucide-react';

const securityMetrics = [
  { title: 'Active Alerts', value: '3', icon: Bell, color: 'text-yellow-500' },
  { title: 'Online Cameras', value: '8/8', icon: Camera, color: 'text-green-500' },
  { title: 'Blocked Users', value: '12', icon: UserX, color: 'text-red-500' },
  { title: 'Security Level', value: 'High', icon: Shield, color: 'text-blue-500' },
];

const recentAlerts = [
  { id: 1, type: 'Unauthorized Access Attempt', location: 'Main Gate', time: '10 mins ago', severity: 'high' },
  { id: 2, type: 'Camera Offline', location: 'Parking Area', time: '1 hour ago', severity: 'medium' },
  { id: 3, type: 'Multiple Failed Logins', location: 'System', time: '2 hours ago', severity: 'low' },
];

export default function Security() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric) => (
          <div key={metric.title} className="card hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${metric.color}`}>
                <metric.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className={`p-2 rounded-full ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                  alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{alert.type}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center space-x-3">
                <Lock size={20} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enable 2FA for enhanced security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#24FE41]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Security Alerts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications for security events</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#24FE41]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
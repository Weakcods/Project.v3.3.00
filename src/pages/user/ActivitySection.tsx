import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'Entry',
    location: 'Main Gate',
    time: '10:30 AM',
    date: '2024-03-15',
    vehicle: 'Toyota Corolla (ABC-123)',
  },
  {
    id: 2,
    type: 'Exit',
    location: 'Main Gate',
    time: '05:45 PM',
    date: '2024-03-15',
    vehicle: 'Toyota Corolla (ABC-123)',
  },
  {
    id: 3,
    type: 'Entry',
    location: 'Side Gate',
    time: '09:15 AM',
    date: '2024-03-14',
    vehicle: 'Toyota Corolla (ABC-123)',
  },
];

export default function ActivitySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <button className="text-sm text-[#24FE41] hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-4 p-4 rounded-lg border dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className={`p-3 rounded-full ${
              activity.type === 'Entry' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {activity.type === 'Entry' ? '→' : '←'}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {activity.type} - {activity.vehicle}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activity.type === 'Entry'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="mr-1" />
                  {activity.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock size={16} className="mr-1" />
                  {activity.time}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="mr-1" />
                  {activity.date}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Summary */}
      <div className="mt-6 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Today's Entries</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">12</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Today's Exits</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">10</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Vehicles</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">2</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
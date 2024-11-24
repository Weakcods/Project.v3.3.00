import { Users, Clock, FileCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    name: 'Active Passes',
    value: '2',
    icon: FileCheck,
    change: '+1',
    changeType: 'positive',
  },
  {
    name: 'Total Visits',
    value: '24',
    icon: Users,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Avg. Duration',
    value: '45m',
    icon: Clock,
    change: '-5%',
    changeType: 'negative',
  },
  {
    name: 'Pending Requests',
    value: '3',
    icon: AlertTriangle,
    change: '+2',
    changeType: 'neutral',
  },
];

export default function DashboardStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              stat.changeType === 'positive' ? 'bg-green-100 text-green-600' :
              stat.changeType === 'negative' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              <stat.icon size={24} />
            </div>
          </div>
          <p className={`text-sm mt-2 ${
            stat.changeType === 'positive' ? 'text-green-600' :
            stat.changeType === 'negative' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {stat.change} from last week
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
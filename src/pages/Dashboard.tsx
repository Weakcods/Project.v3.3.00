import { Users, UserCheck, Clock, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const visitorData = [
  { time: '00:00', visitors: 30 },
  { time: '03:00', visitors: 20 },
  { time: '06:00', visitors: 15 },
  { time: '09:00', visitors: 45 },
  { time: '12:00', visitors: 60 },
  { time: '15:00', visitors: 55 },
  { time: '18:00', visitors: 40 },
  { time: '21:00', visitors: 35 },
];

const weeklyData = [
  { day: 'Mon', visitors: 150, passes: 45 },
  { day: 'Tue', visitors: 230, passes: 65 },
  { day: 'Wed', visitors: 180, passes: 52 },
  { day: 'Thu', visitors: 290, passes: 75 },
  { day: 'Fri', visitors: 320, passes: 85 },
  { day: 'Sat', visitors: 160, passes: 48 },
  { day: 'Sun', visitors: 120, passes: 35 },
];

const stats = [
  {
    name: 'Total Visitors',
    value: '2,345',
    icon: Users,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Active Passes',
    value: '42',
    icon: UserCheck,
    change: '+8%',
    changeType: 'positive',
  },
  {
    name: 'Avg. Visit Duration',
    value: '1.5h',
    icon: Clock,
    change: '-5%',
    changeType: 'negative',
  },
  {
    name: 'Security Alerts',
    value: '3',
    icon: AlertTriangle,
    change: '+2',
    changeType: 'neutral',
  },
];

const recentVisitors = [
  { id: 1, name: 'Alice Johnson', purpose: 'Meeting', time: '10:30 AM', status: 'active' },
  { id: 2, name: 'Bob Smith', purpose: 'Delivery', time: '11:45 AM', status: 'completed' },
  { id: 3, name: 'Carol White', purpose: 'Interview', time: '2:15 PM', status: 'scheduled' },
];

const tabs = ['All Visitors', 'Active', 'Scheduled', 'Completed'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('All Visitors');

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="fade-in">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome Back </h1>
        <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your gate passes today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.name} 
            className="card hover-scale"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.changeType === 'positive' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                stat.changeType === 'negative' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' :
                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className={`flex items-center mt-2 text-sm ${
              stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
              stat.changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {stat.changeType === 'positive' ? <ArrowUp size={16} /> :
               stat.changeType === 'negative' ? <ArrowDown size={16} /> : null}
              <span className="ml-1">{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Today's Visitor Traffic</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#24FE41" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#24FE41" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#24FE41"
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Weekly Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="visitors" fill="#24FE41" radius={[4, 4, 0, 0]} />
                <Bar dataKey="passes" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Visitors Section */}
      <div className="card slide-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Visitors</h3>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  activeTab === tab
                    ? 'bg-[#24FE41] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-900 dark:text-white">Name</th>
                <th className="pb-3 text-gray-900 dark:text-white">Purpose</th>
                <th className="pb-3 text-gray-900 dark:text-white">Time</th>
                <th className="pb-3 text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentVisitors.map((visitor) => (
                <tr key={visitor.id} className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-white">{visitor.name}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{visitor.purpose}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{visitor.time}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      visitor.status === 'active' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                      visitor.status === 'completed' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {visitor.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
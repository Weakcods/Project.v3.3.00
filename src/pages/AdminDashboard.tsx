import { Users, Shield, Clock, AlertTriangle, ArrowUp, ArrowDown, Download } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {AreaChart, Area,BarChart, Bar,PieChart, Pie, Cell,XAxis, YAxis, CartesianGrid,Tooltip, Legend, ResponsiveContainer} from 'recharts';

const stats = [
  {
    name: 'Total Users',
    value: '1,234',
    icon: Users,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Active Guards',
    value: '8',
    icon: Shield,
    change: '0%',
    changeType: 'neutral',
  },
  {
    name: 'Avg. Processing Time',
    value: '2.5m',
    icon: Clock,
    change: '-15%',
    changeType: 'positive',
  },
  {
    name: 'Security Alerts',
    value: '3',
    icon: AlertTriangle,
    change: '+2',
    changeType: 'negative',
  },
];

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

const accessTypeData = [
  { name: 'Students', value: 400 },
  { name: 'Staff', value: 300 },
  { name: 'Visitors', value: 200 },
  { name: 'Contractors', value: 100 },
];

const COLORS = ['#24FE41', '#00C49F', '#FFBB28', '#FF8042'];

const recentAlerts = [
  { id: 1, type: 'Unauthorized Access', location: 'Main Gate', time: '10:30 AM', severity: 'high' },
  { id: 2, type: 'Multiple Failed Attempts', location: 'Side Gate', time: '11:45 AM', severity: 'medium' },
  { id: 3, type: 'System Warning', location: 'System', time: '02:15 PM', severity: 'low' },
];

export default function AdminDashboard() {
  // const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, Master the Great!</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download size={20} />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.changeType === 'positive' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                stat.changeType === 'negative' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              {stat.changeType !== 'neutral' && (
                stat.changeType === 'positive' ? <ArrowUp size={16} className="text-green-600 dark:text-green-400" /> :
                <ArrowDown size={16} className="text-red-600 dark:text-red-400" />
              )}
              <span className={`text-sm ml-1 ${
                stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
                stat.changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
                'text-gray-600 dark:text-gray-400'
              }`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Traffic Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Today's Traffic</h2>
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

        {/* Weekly Overview Chart */}
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
                <Legend />
                <Bar dataKey="visitors" name="Visitors" fill="#24FE41" radius={[4, 4, 0, 0]} />
                <Bar dataKey="passes" name="Passes" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Access Distribution Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Access Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accessTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {accessTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="card">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Alerts</h2>
            <div className="flex space-x-2 mt-4 sm:mt-0">
              {['overview', 'alerts', 'logs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    activeTab === tab
                      ? 'bg-[#24FE41] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{alert.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alert.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
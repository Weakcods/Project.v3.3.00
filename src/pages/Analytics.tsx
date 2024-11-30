import { useState } from 'react';
import { BarChart2, TrendingUp, Users, Clock, Calendar, Download, Filter } from 'lucide-react';

const visitorStats = [
  { title: 'Total Visitors', value: '1,234', change: '+12%', trend: 'up' },
  { title: 'Avg. Duration', value: '45m', change: '-5%', trend: 'down' },
  { title: 'Peak Hours', value: '2-4 PM', change: '0%', trend: 'neutral' },
  { title: 'Regular Visitors', value: '45%', change: '+8%', trend: 'up' },
];

const timeRanges = ['Today', 'This Week', 'This Month', 'This Year'];

export default function Analytics() {
  const [selectedRange, setSelectedRange] = useState('This Week');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <select
             className="input-field pl-10 pr-8 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring focus:ring-[#24FE41] focus:border-[#24FE41] dark:focus:ring-[#24FE41] dark:focus:border-[#24FE41] rounded-md"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visitorStats.map((stat) => (
          <div key={stat.title} className="card hover-scale">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              <div className={`p-2 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-600' :
                stat.trend === 'down' ? 'bg-red-100 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            <p className={`text-sm ${
              stat.trend === 'up' ? 'text-green-600' :
              stat.trend === 'down' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {stat.change} from last period
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Visitor Traffic</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">Daily</button>
              <button className="px-3 py-1 rounded-full text-sm bg-[#24FE41] text-white">Weekly</button>
              <button className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">Monthly</button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <BarChart2 size={48} />
            <span className="ml-2">Chart visualization would go here</span>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Popular Times</h2>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <span className="w-16 text-sm text-gray-600 dark:text-gray-400">{`${8 + index * 2}:00`}</span>
                <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#24FE41]"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <span className="w-16 text-right text-sm text-gray-600 dark:text-gray-400">{`${Math.floor(Math.random() * 100)}%`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
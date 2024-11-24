import { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';

const logs = [
  { id: 1, name: 'James Brown', type: 'Entry', location: 'Main Gate', timestamp: '2024-03-15 09:30:45', status: 'success' },
  { id: 2, name: 'James Brown', type: 'Exit', location: 'Main Gate', timestamp: '2024-03-15 10:15:22', status: 'success' },
  { id: 3, name: 'James Brown', type: 'Entry', location: 'Side Gate', timestamp: '2024-03-15 11:45:10', status: 'denied' },
];

export default function AccessLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Logs</h1>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-2">
            <Calendar size={20} />
            <span>Date Range</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search logs..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <select
              className="input-field pl-10 pr-8"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="entry">Entry</option>
              <option value="exit">Exit</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-900 dark:text-white">Name</th>
                <th className="pb-3 text-gray-900 dark:text-white">Type</th>
                <th className="pb-3 text-gray-900 dark:text-white">Location</th>
                <th className="pb-3 text-gray-900 dark:text-white">Timestamp</th>
                <th className="pb-3 text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-white">{log.name}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{log.type}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{log.location}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{log.timestamp}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      log.status === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {log.status}
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
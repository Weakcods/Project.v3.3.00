import { useState  } from 'react';
import { Search, Filter, Download ,MessageSquareWarning } from 'lucide-react';

const logs = [
  { id: 1, name: 'James Brown', type: 'Entry', location: 'Main Gate', timestamp: '2024-03-15 09:30:45', status: 'success' },
  { id: 2, name: 'James Brown', type: 'Exit', location: 'Main Gate', timestamp: '2024-03-15 10:15:22', status: 'success' },
  { id: 3, name: 'James Brown', type: 'Entry', location: 'Side Gate', timestamp: '2024-03-15 11:45:10', status: 'denied' },
];

export default function ViewPassLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (log: typeof logs[number]) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(log))}`;
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${log.name.replace(/\s+/g, '_')}_${log.timestamp.replace(/:/g, '-')}.json`; // Format for the download file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">G-Pass Logs</h1>
        <div className="flex gap-2">
          
          <button className="btn-primary flex items-center gap-2">
            <MessageSquareWarning  size={20} />
            <span>Report Issue</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search logs..."
              className="input-field pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <select
              className="input-field pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        log.status === 'success' ? 'bg-green-100 text-green-600' :
                        log.status === 'denied' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {log.status === 'success' && (
                        <button
                          onClick={() => handleDownload(log)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">No logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

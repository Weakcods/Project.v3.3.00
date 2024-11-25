import { useState } from 'react';
import { Search, Filter, Download, MessageSquareWarning, Clock, MapPin, User, ArrowRight, ArrowLeft } from 'lucide-react';

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
    a.download = `${log.name.replace(/\s+/g, '_')}_${log.timestamp.replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'bg-green-100 text-green-600 border-green-200' :
           status === 'denied' ? 'bg-red-100 text-red-600 border-red-200' :
           'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getTypeIcon = (type: string) => {
    return type === 'Entry' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">G-Pass Logs</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <MessageSquareWarning size={20} className="mr-2" />
          <span>Report Issue</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <select
            className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="entry">Entry</option>
            <option value="exit">Exit</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <div key={log.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={20} />
                  <span className="font-medium text-gray-900 dark:text-white">{log.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(log.status)} border`}>
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  {getTypeIcon(log.type)}
                  <span className="ml-2">{log.type}</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin size={18} className="mr-2" />
                  <span>{log.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock size={18} className="mr-2" />
                  <span>{log.timestamp}</span>
                </div>
              </div>

              {log.status === 'success' && (
                <button
                  onClick={() => handleDownload(log)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Download size={18} className="mr-2" />
                  Download Log
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500">No logs found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
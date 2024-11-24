import { useState } from 'react';
import { Plus, Search, Filter, Check, X } from 'lucide-react';

const requests = [
  { id: 1, name: 'Emma Wilson', purpose: 'Interview', date: '2024-03-15', time: '10:00 AM', status: 'pending' },
  { id: 2, name: 'James Brown', purpose: 'Delivery', date: '2024-03-15', time: '11:30 AM', status: 'approved' },
  { id: 3, name: 'Sarah Davis', purpose: 'Meeting', date: '2024-03-15', time: '2:00 PM', status: 'rejected' },
];

export default function VisitorRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Visitor Requests</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          <span>New Request</span>
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search requests..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <select
              className="input-field pl-10 pr-8"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-900 dark:text-white">Visitor</th>
                <th className="pb-3 text-gray-900 dark:text-white">Purpose</th>
                <th className="pb-3 text-gray-900 dark:text-white">Date</th>
                <th className="pb-3 text-gray-900 dark:text-white">Time</th>
                <th className="pb-3 text-gray-900 dark:text-white">Status</th>
                <th className="pb-3 text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-white">{request.name}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{request.purpose}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{request.date}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{request.time}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status === 'approved' ? 'bg-green-100 text-green-600' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-green-100 rounded-full">
                        <Check size={20} className="text-green-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded-full">
                        <X size={20} className="text-red-600" />
                      </button>
                    </div>
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
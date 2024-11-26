import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

interface Request {
  id: number;
  name: string;
  type: string;
  location: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
}

const initialRequests: Request[] = [
  { id: 1, name: 'Noe Dela Concepcion', type: 'Interview', location: 'Meeting Room A', date: '2024-03-15', time: '10:00 AM', status: 'pending' },
  { id: 2, name: 'Noe Dela Concepcion', type: 'Delivery', location: 'Reception', date: '2024-03-15', time: '11:30 AM', status: 'approved' },
  { id: 3, name: 'Noe Dela Concepcion', type: 'Meeting', location: 'Conference Room B', date: '2024-03-15', time: '2:00 PM', status: 'rejected' },
];

export default function VisitorHistory() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: Request = {
      id: requests.length + 1,
      ...formData,
      status: 'pending',
    };
    setRequests([...requests, newRequest]);
    setIsModalOpen(false);
    setFormData({ name: '', type: '', location: '', date: '', time: '' });
  };

  const handleCancelRequest = (id: number) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  const filteredRequests = requests.filter(request => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearch =
      request.name.toLowerCase().includes(searchString) ||
      request.type.toLowerCase().includes(searchString) ||
      request.location.toLowerCase().includes(searchString);
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatTimestamp = (date: string, time: string) => {
    return `${new Date(date).toLocaleDateString()} ${time}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-[#24FE41] bg-opacity-20 text-[#24FE41]';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">History</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#24FE41] text-gray-900 font-medium rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            <span>New Request</span>
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, type, or location..."
              className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#24FE41] focus:border-[#24FE41] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <select
              className="pl-10 pr-8 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#24FE41] focus:border-[#24FE41] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{request.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{request.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-24">Location:</span>
                  <span className="text-gray-600 dark:text-gray-400">{request.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-24">Date:</span>
                  <span className="text-gray-600 dark:text-gray-400">{formatTimestamp(request.date, request.time)}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                {request.status === 'approved' ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Renew
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancelRequest(request.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for New Request */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Visitor Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#24FE41] focus:border-[#24FE41]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Visit Type</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#24FE41] focus:border-[#24FE41]"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Location</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#24FE41] focus:border-[#24FE41]"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Date</label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#24FE41] focus:border-[#24FE41]"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Time</label>
                <input
                  type="time"
                  required
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#24FE41] focus:border-[#24FE41]"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#24FE41] text-gray-900 font-medium rounded-lg hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Search, Filter, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

const feedbacks = [
  {
    id: 1,
    user: 'John Doe',
    type: 'Gate Access',
    message: 'The new QR code system is much faster than the old card system.',
    rating: 5,
    date: '2024-03-15',
    status: 'positive'
  },
  {
    id: 2,
    user: 'Jane Smith',
    type: 'App Interface',
    message: 'Would be great to have push notifications for pass approvals.',
    rating: 4,
    date: '2024-03-14',
    status: 'suggestion'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    type: 'Security',
    message: 'Sometimes the scanner takes too long to read the QR code.',
    rating: 2,
    date: '2024-03-13',
    status: 'negative'
  }
];

export default function UserFeedback() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and analyze user feedback</p>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search feedback..."
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
              <option value="gate">Gate Access</option>
              <option value="app">App Interface</option>
              <option value="security">Security</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{feedback.user}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">• {feedback.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      feedback.type === 'Gate Access' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                      feedback.type === 'App Interface' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                      'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                    }`}>
                      {feedback.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      feedback.status === 'positive' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                      feedback.status === 'negative' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                    }`}>
                      {feedback.status}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {feedback.status === 'positive' ? (
                    <ThumbsUp className="text-green-500" size={20} />
                  ) : feedback.status === 'negative' ? (
                    <ThumbsDown className="text-red-500" size={20} />
                  ) : (
                    <MessageCircle className="text-yellow-500" size={20} />
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-4">
                  <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#24FE41]">
                    Reply
                  </button>
                  <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#24FE41]">
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
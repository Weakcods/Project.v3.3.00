import { useState } from 'react';
import { Search, Filter, ThumbsUp, ThumbsDown, MessageCircle, Plus, Edit2, Trash2, Reply, Send, X } from 'lucide-react';

interface Feedback {
  id: number;
  user: string;
  type: string;
  message: string;
  rating: number;
  date: string;
  status: 'positive' | 'negative' | 'suggestion';
  replies?: Reply[];
}

interface Reply {
  id: number;
  adminName: string;
  message: string;
  date: string;
}

const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    user: 'Reymart Azucena',
    type: 'Gate Access',
    message: 'The new QR code system is much faster than the old card system.',
    rating: 5,
    date: '2024-03-15',
    status: 'positive',
    replies: [
      {
        id: 1,
        adminName: 'Admin Joshua',
        message: 'Thank you for your positive feedback! Were glad the new system is working well for you',
        date: '2024-03-15 14:30'
      }
    ]
  },
  {
    id: 2,
    user: 'Jasper Brix Olpos',
    type: 'App Interface',
    message: 'Would be great to have push notifications for pass approvals.',
    rating: 4,
    date: '2024-03-14',
    status: 'suggestion',
    replies: []
  },
  {
    id: 3,
    user: 'Noe Dela Conception',
    type: 'Security',
    message: 'Sometimes the scanner takes too long to read the QR code.',
    rating: 2,
    date: '2024-03-13',
    status: 'negative',
    replies: [
      {
        id: 2,
        adminName: 'Admin josh',
        message: 'We apologize for the inconvenience. Our team is working on optimizing the scanner performance.',
        date: '2024-03-13 16:45'
      }
    ]
  }
];

export default function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [replyingTo, setReplyingTo] = useState<Feedback | null>(null);
  const [formData, setFormData] = useState<Partial<Feedback>>({});
  const [replyText, setReplyText] = useState('');

  const handleCreate = () => {
    setEditingFeedback(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setFormData(feedback);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    }
  };

  const handleReply = (feedback: Feedback) => {
    setReplyingTo(feedback);
    setReplyText('');
    setIsReplyModalOpen(true);
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingTo) return;

    const newReply: Reply = {
      id: Date.now(),
      adminName: 'Admin Joshua', // In a real app, get from auth context
      message: replyText,
      date: new Date().toLocaleString()
    };

    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === replyingTo.id
        ? { ...feedback, replies: [...(feedback.replies || []), newReply] }
        : feedback
    ));

    setIsReplyModalOpen(false);
    setReplyText('');
    setReplyingTo(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeedback) {
      setFeedbacks(feedbacks.map(feedback => 
        feedback.id === editingFeedback.id ? { ...feedback, ...formData } : feedback
      ));
    } else {
      setFeedbacks([...feedbacks, { 
        ...formData as Feedback,
        id: Math.max(...feedbacks.map(f => f.id)) + 1,
        date: new Date().toISOString().split('T')[0],
        replies: []
      }]);
    }
    setIsModalOpen(false);
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || feedback.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and respond to user feedback</p>
        </div>
        <button 
          onClick={handleCreate}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Feedback
        </button>
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
          {filteredFeedbacks.map((feedback) => (
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

                  {/* Replies Section */}
                  {feedback.replies && feedback.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
                      {feedback.replies.map((reply) => (
                        <div key={reply.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">{reply.adminName}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center">
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
                  <button
                    onClick={() => handleReply(feedback)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#24FE41] flex items-center gap-1"
                  >
                    <Reply size={16} />
                    Reply
                  </button>
                  <button
                    onClick={() => handleEdit(feedback)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#24FE41] flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feedback.id)}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Reply to Feedback</h2>
              <button
                onClick={() => setIsReplyModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            
            {replyingTo && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Original feedback:</p>
                <p className="text-gray-900 dark:text-white">{replyingTo.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmitReply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Reply
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="input-field min-h-[100px]"
                  placeholder="Type your reply here..."
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReplyModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <Send size={16} />
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {editingFeedback ? 'Edit Feedback' : 'Add New Feedback'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  User
                </label>
                <input
                  type="text"
                  value={formData.user || ''}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Gate Access">Gate Access</option>
                  <option value="App Interface">App Interface</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field min-h-[100px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating || ''}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status || ''}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'positive' | 'negative' | 'suggestion' })}
                  className="input-field"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="suggestion">Suggestion</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingFeedback ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { MessageSquareText, Plus,  Trash2, X } from 'lucide-react';

interface Feedback {
  id: number;
  title: string;
  message: string;
  category: 'general' | 'technical' | 'suggestion';
  status: 'pending' | 'responded';
  createdAt: string;
  response?: string;
}

const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    title: 'Gate Pass Scanner Issue',
    message: 'The QR scanner sometimes takes too long to read the code.',
    category: 'technical',
    status: 'responded',
    createdAt: '2024-03-15 10:30 AM',
    response: 'Thank you for reporting this issue. We are working on optimizing the scanner performance.'
  },
  {
    id: 2,
    title: 'Great User Experience',
    message: 'The new interface is very intuitive and easy to use.',
    category: 'general',
    status: 'responded',
    createdAt: '2024-03-14 02:15 PM',
    response: 'We appreciate your positive feedback! We strive to make the system user-friendly.'
  }
];

export default function UserFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [formData, setFormData] = useState<Partial<Feedback>>({});

  const handleCreate = () => {
    setEditingFeedback(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeedback) {
      setFeedbacks(feedbacks.map(feedback => 
        feedback.id === editingFeedback.id ? { ...feedback, ...formData } : feedback
      ));
    } else {
      const newFeedback: Feedback = {
        ...formData as Feedback,
        id: Math.max(...feedbacks.map(f => f.id), 0) + 1,
        createdAt: new Date().toLocaleString(),
        status: 'pending'
      };
      setFeedbacks([newFeedback, ...feedbacks]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400">Share your thoughts and suggestions</p>
        </div>
        <button 
          onClick={handleCreate}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${
                  feedback.category === 'technical' ? 'bg-orange-100 text-orange-600' :
                  feedback.category === 'suggestion' ? 'bg-purple-100 text-purple-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <MessageSquareText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{feedback.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      feedback.status === 'responded' 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {feedback.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feedback.message}</p>
                  {feedback.response && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Response:</span> {feedback.response}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{feedback.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                
                <button
                  onClick={() => handleDelete(feedback.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingFeedback ? 'Edit Feedback' : 'New Feedback'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="Brief title for your feedback"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Feedback['category'] })}
                  className="input-field"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                  <option value="suggestion">Suggestion</option>
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
                  placeholder="Describe your feedback in detail"
                  required
                />
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
                  {editingFeedback ? 'Update' : 'Submit'} Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
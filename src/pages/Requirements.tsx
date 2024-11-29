import { useState } from 'react';
import {  Car, CreditCard, GraduationCap, FileWarning, CheckCircle2, AlertCircle, HelpCircle, X, Upload } from 'lucide-react';

interface Requirement {
  id: number;
  title: string;
  description: string;
  icon: any;
  guidelines: string[];
  status: 'pending' | 'approved' | 'rejected';
  uploadedFile?: string;
  uploadDate?: string;
}

const initialRequirements: Requirement[] = [
  {
    id: 1,
    title: 'CR/OR',
    description: 'Certificate of Registration and Official Receipt',
    icon: Car,
    guidelines: [
      'Must be current and valid',
      'Both CR and OR should be clearly visible',
      'All text must be legible'
    ],
    status: 'pending'
  },
  {
    id: 2,
    title: "Driver's License",
    description: 'Valid drivers license',
    icon: CreditCard,
    guidelines: [
      'Must not be expired',
      'Front and back images required',
      'Should show complete information at dapat pogi ka'
    ],
    status: 'approved',
    uploadedFile: 'license.pdf',
    uploadDate: '2024-03-15'
  },
  {
    id: 3,
    title: 'School ID',
    description: 'Current school identification card',
    icon: GraduationCap,
    guidelines: [
      'Must be for the current academic year',
      'Should display clear photo and details',
      'Institution name must be visible'
    ],
    status: 'rejected'
  }
];

const documentGuidelines = [
  'All documents must be clear and legible',
  'File size should not exceed 5MB',
  'Accepted formats: PDF, JPG, PNG',
  'Documents must be valid and not expired'
];

export default function Requirements() {
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  const [formData, setFormData] = useState<Partial<Requirement>>({});

  const handleCreate = () => {
    setEditingRequirement(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (requirement: Requirement) => {
    setEditingRequirement(requirement);
    setFormData(requirement);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this requirement?')) {
      setRequirements(requirements.filter(req => req.id !== id));
    }
  };

  const handleUpload = (id: number) => {
    // Simulate file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.jpg,.png';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setRequirements(requirements.map(req =>
          req.id === id ? {
            ...req,
            uploadedFile: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'pending'
          } : req
        ));
      }
    };
    fileInput.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRequirement) {
      setRequirements(requirements.map(req => 
        req.id === editingRequirement.id ? { ...req, ...formData } : req
      ));
    } else {
      const newRequirement: Requirement = {
        ...formData as Requirement,
        id: Math.max(...requirements.map(r => r.id), 0) + 1,
        status: 'pending',
        guidelines: formData.guidelines || []
      };
      setRequirements([...requirements, newRequirement]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Requirements</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Required documents for gate pass application</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requirements.map((req) => (
          <div key={req.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#24FE41] bg-opacity-10 text-[#24FE41]">
                  <req.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{req.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{req.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {req.guidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#24FE41] mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{guideline}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  req.status === 'approved' ? 'bg-green-100 text-green-600' :
                  req.status === 'rejected' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {req.status}
                </span>
                <button
                  onClick={() => handleUpload(req.id)}
                  className="flex items-center gap-2 text-sm text-[#24FE41] hover:text-[#1ee539]"
                >
                  <Upload size={16} />
                  {req.uploadedFile ? 'Update File' : 'Upload File'}
                </button>
              </div>
              {req.uploadedFile && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Uploaded: {req.uploadedFile} on {req.uploadDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <FileWarning size={24} className="text-[#24FE41]" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Document Guidelines</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentGuidelines.map((guideline, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <AlertCircle size={20} className="text-[#24FE41]" />
              <p className="text-gray-700 dark:text-gray-300">{guideline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingRequirement ? 'Edit Requirement' : 'New Requirement'}
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
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Guidelines (one per line)
                </label>
                <textarea
                  value={formData.guidelines?.join('\n') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    guidelines: e.target.value.split('\n').filter(line => line.trim())
                  })}
                  className="input-field min-h-[100px]"
                  placeholder="Enter each guideline on a new line"
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
                  {editingRequirement ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card bg-blue-50 dark:bg-blue-900/20">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
            <HelpCircle size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              If you have questions about document requirements or need assistance, please contact our support team or visit the help center.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
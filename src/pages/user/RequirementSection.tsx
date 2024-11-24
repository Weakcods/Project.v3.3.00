import { FileCheck2, AlertCircle, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const requirements = [
  {
    id: 'cr-or',
    title: 'CR/OR',
    description: 'Certificate of Registration and Official Receipt',
    status: 'pending',
    expiryDate: '2024-12-31',
  },
  {
    id: 'drivers-license',
    title: "Driver's License",
    description: 'Valid government-issued drivers license',
    status: 'approved',
    expiryDate: '2025-06-15',
  },
  {
    id: 'school-id',
    title: 'School ID',
    description: 'Current school year identification card',
    status: 'expired',
    expiryDate: '2023-12-31',
  },
];

export default function RequirementsSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Document Requirements
      </h2>

      <div className="grid gap-6">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {req.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {req.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(req.status)}`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Expires: {req.expiryDate}
                  </span>
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#24FE41] hover:bg-[#24FE41]/10 rounded-lg transition-colors">
                <Upload size={16} />
                Update
              </button>
            </div>

            {req.status === 'expired' && (
              <div className="flex items-center gap-2 mt-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <AlertCircle size={16} />
                This document has expired. Please upload a new one.
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="flex items-start gap-3">
          <FileCheck2 className="text-[#24FE41]" size={24} />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Document Guidelines
            </h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• All documents must be clear and legible</li>
              <li>• File size should not exceed 5MB</li>
              <li>• Accepted formats: PDF, JPG, PNG</li>
              <li>• Documents must be valid and not expired</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
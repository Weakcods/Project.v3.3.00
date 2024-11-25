import { Edit, Trash2, Mail, Shield, Circle } from 'lucide-react';
import { User } from './types';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-600 border-green-200' 
      : 'bg-red-100 text-red-600 border-red-200';
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'security':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'guard':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white text-lg">{user.name}</span>
          <div className="flex items-center text-gray-500 mt-1">
            <Mail size={16} className="mr-1" />
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(user)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit user"
          >
            <Edit size={18} className="text-blue-600" />
          </button>
          <button 
            onClick={() => onDelete(user.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete user"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="flex items-center">
          <Shield size={16} className="mr-1 text-gray-400" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)} border`}>
            {user.role}
          </span>
        </div>
        <div className="flex items-center">
          <Circle size={16} className="mr-1 text-gray-400" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)} border`}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
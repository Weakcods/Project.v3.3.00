import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, UserPlus } from 'lucide-react';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Security', status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Guard', status: 'inactive' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <select
              className="input-field pl-10 pr-8"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="security">Security</option>
              <option value="guard">Guard</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-900 dark:text-white">Name</th>
                <th className="pb-3 text-gray-900 dark:text-white">Email</th>
                <th className="pb-3 text-gray-900 dark:text-white">Role</th>
                <th className="pb-3 text-gray-900 dark:text-white">Status</th>
                <th className="pb-3 text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{user.email}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-blue-100 rounded-full">
                        <Edit size={20} className="text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded-full">
                        <Trash2 size={20} className="text-red-600" />
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
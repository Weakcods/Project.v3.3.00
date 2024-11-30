import { useState } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import { UserCard } from '../pages/admin/User-card';
import { UserModal } from '../pages/admin/UserModal';
import { User } from '../pages/admin/types';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'stuff', status: 'active' as const },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Security', status: 'active' as const },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Guard', status: 'inactive' as const },
  { id: 4, name: 'Jasper Brix Olpos', email: 'jasper@example.com', role: 'Student', status: 'inactive' as const },
  { id: 3, name: 'Noe Dela Conception', email: 'noelalala@example.com', role: 'Faculty', status: 'active' as const },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userData: Omit<User, 'id'>) => {
    if (!editingUser) return;
    setUsers(users.map(user => 
      user.id === editingUser.id ? { ...userData, id: user.id } : user
    ));
    setEditingUser(undefined);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <button 
          onClick={() => {
            setEditingUser(undefined);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={20} className="mr-2" />
          <span>Add User</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <select
            className="input-field pl-10 pr-8 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring focus:ring-[#24FE41] focus:border-[#24FE41] dark:focus:ring-[#24FE41] dark:focus:border-[#24FE41] rounded-md"

            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="staff">Staff</option>
            <option value="security">Security</option>
            <option value="guard">Guard</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={openEditModal}
              onDelete={handleDeleteUser}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(undefined);
        }}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        editUser={editingUser}
      />
    </div>
  );
}
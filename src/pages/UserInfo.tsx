import { useState } from 'react';
import { Search, Filter, Download, User, Mail, Phone, MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  address: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

const initialUserInfo: UserData[] = [
  {
    id: 1,
    name: 'Jasper brix Olpos',
    email: 'jasper@gmail.com',
    phone: '+1 234 567 890',
    department: 'CS',
    address: '123 University Ave',
    status: 'active',
    lastActive: '2024-03-23 10:30 AM'
  },
  {
    id: 2,
    name: 'Noe Dela Conception',
    email: 'noeeelal@gmail.com',
    phone: '+1 234 567 891',
    department: 'CS',
    address: '456 College St',
    status: 'inactive',
    lastActive: '2024-03-14 03:45 AM'
  },
  {
    id: 3,
    name: 'Reymart Azucena',
    email: 'reyjane@gmail.com',
    phone: '+1 234 567 891',
    department: 'CEAT',
    address: '456 College St',
    status: 'inactive',
    lastActive: '2024-03-14 03:45 PM'
  },
  {
    id: 4,
    name: 'Juan Smith',
    email: 'juan@example.com',
    phone: '+1 234 567 891',
    department: 'CBA',
    address: '456 College St',
    status: 'active',
    lastActive: '2024-03-14 03:45 PM'
  },
  {
    id: 5,
    name: 'Jane Tamad',
    email: 'tamad@example.com',
    phone: '+1 234 567 891',
    department: 'CAH',
    address: '456 College St',
    status: 'inactive',
    lastActive: '2024-03-14 03:45 PM'
  },
  {
    id: 6,
    name: 'Jhone Reyes',
    email: 'reyess2@gmail.com',
    phone: '+1 234 567 891',
    department: 'CHTM',
    address: '456 College St',
    status: 'inactive',
    lastActive: '2024-03-14 03:45 PM'
  }
];

export default function UserInfo() {
  const [users, setUsers] = useState<UserData[]>(initialUserInfo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<Partial<UserData>>({});

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...formData } : user
      ));
    } else {
      setUsers([...users, { 
        ...formData as UserData,
        id: Math.max(...users.map(u => u.id)) + 1,
        lastActive: new Date().toLocaleString()
      }]);
    }
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || 
                             user.department.toLowerCase().includes(filterDepartment.toLowerCase());
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Information</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleCreate}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add User
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            Export Data
          </button>
        </div>
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
          <Filter
              className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
              size={20}
            />
             <select
              className="input-field pl-10 pr-8 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 rounded-md"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="cs">CS</option>
              <option value="ceat">CEAT</option>
              <option value="cah">CAH</option>
              <option value="cba">CBA</option>
              <option value="chtm">CHTM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#24FE41] flex items-center justify-center text-white">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                      : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                  }`}>
                    {user.status}
                  </span>
                  <button 
                    onClick={() => handleEdit(user)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <Edit2 size={16} className="text-blue-500" />
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail size={16} />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone size={16} />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm">{user.address}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last active: {user.lastActive}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="input-field"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { Search, Filter, Download, CreditCard, DollarSign, Calendar, Plus, Edit2, Trash2, CheckCircle2, XCircle, Receipt, ArrowUpDown } from 'lucide-react';

interface Payment {
  id: number;
  studentId: string;
  studentName: string;
  amount: number;
  type: 'Monthly' | 'Semester' | 'Annual';
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paymentDate?: string;
  method?: 'credit_card' | 'bank_transfer' | 'cash';
}

const initialPayments: Payment[] = [
  {
    id: 1,
    studentId: 'STU001',
    studentName: 'John Doe',
    amount: 500,
    type: 'Monthly',
    status: 'paid',
    dueDate: '2024-03-15',
    paymentDate: '2024-03-14',
    method: 'credit_card'
  },
  {
    id: 2,
    studentId: 'STU002',
    studentName: 'Jane Smith',
    amount: 2500,
    type: 'Semester',
    status: 'pending',
    dueDate: '2024-03-20'
  },
  {
    id: 3,
    studentId: 'STU003',
    studentName: 'Mike Johnson',
    amount: 750,
    type: 'Monthly',
    status: 'overdue',
    dueDate: '2024-03-10'
  }
];

export default function AdminPayment() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState<Partial<Payment>>({});

  const handleCreate = () => {
    setEditingPayment(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment);
    setFormData(payment);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      setPayments(payments.filter(payment => payment.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPayment) {
      setPayments(payments.map(payment => 
        payment.id === editingPayment.id ? { ...payment, ...formData } : payment
      ));
    } else {
      setPayments([...payments, { 
        ...formData as Payment,
        id: Math.max(...payments.map(p => p.id)) + 1
      }]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = filteredPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = filteredPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage student payments</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCreate} className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            Add Payment
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                ${totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="card hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Paid Amount</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                ${paidAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="card hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Amount</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                ${pendingAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400">
              <Calendar size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <select
              className="input-field pl-10 pr-8"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-900 dark:text-white">Student ID</th>
                <th className="pb-3 text-gray-900 dark:text-white">Name</th>
                <th className="pb-3 text-gray-900 dark:text-white">Amount</th>
                <th className="pb-3 text-gray-900 dark:text-white">Type</th>
                <th className="pb-3 text-gray-900 dark:text-white">Due Date</th>
                <th className="pb-3 text-gray-900 dark:text-white">Status</th>
                <th className="pb-3 text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-white">{payment.studentId}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{payment.studentName}</td>
                  <td className="py-4 text-gray-900 dark:text-white">${payment.amount}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {payment.type}
                    </span>
                  </td>
                  <td className="py-4 text-gray-900 dark:text-white">{payment.dueDate}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(payment)}
                        className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full transition-colors"
                      >
                        <Edit2 size={16} className="text-blue-600 dark:text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(payment.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors"
                      >
                        <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {editingPayment ? 'Edit Payment' : 'Add New Payment'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  value={formData.studentId || ''}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formData.studentName || ''}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  className="input-field"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Type
                </label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Payment['type'] })}
                  className="input-field"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Semester">Semester</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate || ''}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Payment['status'] })}
                  className="input-field"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              {formData.status === 'paid' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Date
                    </label>
                    <input
                      type="date"
                      value={formData.paymentDate || ''}
                      onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={formData.method || ''}
                      onChange={(e) => setFormData({ ...formData, method: e.target.value as Payment['method'] })}
                      className="input-field"
                    >
                      <option value="">Select Method</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </>
              )}
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
                  {editingPayment ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
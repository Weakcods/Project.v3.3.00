import { useState } from 'react';
import { Search, Filter, Download, CreditCard, DollarSign, Calendar, Plus, Edit2, Trash2, CheckCircle2, XCircle, Receipt, ArrowUpDown, History, Wallet } from 'lucide-react';

interface Payment {
  id: number;
  studentId: string;
  studentName: string;
  amount: number;
  type: 'Monthly' | 'Semester' | 'Annual';
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paymentDate?: string;
  method?: 'gcash' | 'maya' | 'credit_card' | 'bank_transfer' | 'cash';
  transactionId?: string;
}

interface PaymentHistory {
  id: number;
  date: string;
  amount: number;
  method: Payment['method'];
  status: 'success' | 'failed' | 'pending';
  transactionId: string;
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
    method: 'gcash',
    transactionId: 'GC123456789'
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

const paymentHistory: PaymentHistory[] = [
  {
    id: 1,
    date: '2024-03-14 09:30 AM',
    amount: 500,
    method: 'gcash',
    status: 'success',
    transactionId: 'GC123456789'
  },
  {
    id: 2,
    date: '2024-03-13 02:15 PM',
    amount: 750,
    method: 'maya',
    status: 'success',
    transactionId: 'MY987654321'
  },
  {
    id: 3,
    date: '2024-03-12 11:45 AM',
    amount: 1000,
    method: 'credit_card',
    status: 'failed',
    transactionId: 'CC456789123'
  }
];

export default function AdminPayment() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState<Partial<Payment>>({});
  const [activeTab, setActiveTab] = useState<'payments' | 'history'>('payments');

  const handleApprovePayment = (id: number) => {
    setPayments(payments.map(payment => 
      payment.id === id ? {
        ...payment,
        status: 'paid',
        paymentDate: new Date().toISOString().split('T')[0]
      } : payment
    ));
  };

  const handleRejectPayment = (id: number) => {
    if (confirm('Are you sure you want to reject this payment?')) {
      setPayments(payments.map(payment => 
        payment.id === id ? {
          ...payment,
          status: 'overdue'
        } : payment
      ));
    }
  };

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
    if (confirm('Are you sure you want to delete this payment?')) {
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
        id: Math.max(...payments.map(p => p.id)) + 1,
        status: 'pending'
      }]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: Payment['status'] | PaymentHistory['status']) => {
    switch (status) {
      case 'paid':
      case 'success':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400';
      case 'overdue':
      case 'failed':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const getMethodIcon = (method: Payment['method']) => {
    switch (method) {
      case 'gcash':
        return '💳 GCash';
      case 'maya':
        return '💰 Maya';
      case 'credit_card':
        return '💳 Credit Card';
      case 'bank_transfer':
        return '🏦 Bank Transfer';
      case 'cash':
        return '💵 Cash';
      default:
        return '💰 Other';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleCreate}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Payment
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">GCash</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  💳
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Connect GCash</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accept GCash payments</p>
                </div>
              </div>
              <button className="btn-primary">Configure</button>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
              <p className="font-medium text-gray-900 dark:text-white">0917-123-4567</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Maya</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                  💰
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Connect Maya</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accept Maya payments</p>
                </div>
              </div>
              <button className="btn-primary">Configure</button>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
              <p className="font-medium text-gray-900 dark:text-white">0918-765-4321</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'payments'
              ? 'bg-[#24FE41] text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-[#24FE41] text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          Payment History
        </button>
      </div>

      {activeTab === 'payments' ? (
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or ID..."
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
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
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
                    <td className="py-4 text-gray-900 dark:text-white">₱{payment.amount}</td>
                    <td className="py-4 text-gray-900 dark:text-white">{payment.type}</td>
                    <td className="py-4 text-gray-900 dark:text-white">{payment.dueDate}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {payment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprovePayment(payment.id)}
                              className="p-1 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors"
                              title="Approve Payment"
                            >
                              <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                            </button>
                            <button
                              onClick={() => handleRejectPayment(payment.id)}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
                              title="Reject Payment"
                            >
                              <XCircle size={20} className="text-red-600 dark:text-red-400" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleEdit(payment)}
                          className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                          title="Edit Payment"
                        >
                          <Edit2 size={20} className="text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(payment.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
                          title="Delete Payment"
                        >
                          <Trash2 size={20} className="text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="pb-3 text-gray-900 dark:text-white">Date</th>
                  <th className="pb-3 text-gray-900 dark:text-white">Transaction ID</th>
                  <th className="pb-3 text-gray-900 dark:text-white">Amount</th>
                  <th className="pb-3 text-gray-900 dark:text-white">Method</th>
                  <th className="pb-3 text-gray-900 dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((history) => (
                  <tr key={history.id} className="border-b dark:border-gray-700">
                    <td className="py-4 text-gray-900 dark:text-white">{history.date}</td>
                    <td className="py-4 text-gray-900 dark:text-white">{history.transactionId}</td>
                    <td className="py-4 text-gray-900 dark:text-white">₱{history.amount}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {getMethodIcon(history.method)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(history.status)}`}>
                        {history.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Modal */}
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
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="input-field"
                  required
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
                  {editingPayment ? 'Update' : 'Add'} Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
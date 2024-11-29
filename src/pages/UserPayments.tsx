import { useState } from 'react';
import { CreditCard, Wallet, Receipt, AlertCircle, Plus, X, Check } from 'lucide-react';

interface PaymentMethod {
  id: number;
  title: string;
  description: string;
  icon: any;
  status: 'available' | 'unavailable';
  info: string;
  isDefault?: boolean;
  lastUsed?: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: 1,
    title: 'Credit/Debit Card',
    description: 'Visa, MasterCard, etc.',
    icon: CreditCard,
    status: 'available',
    info: 'Secure payment processing with major card networks',
    isDefault: true,
    lastUsed: '2024-03-15'
  },
  {
    id: 2,
    title: 'GCash',
    description: 'Mobile wallet',
    icon: Wallet,
    status: 'available',
    info: 'Fast and convenient mobile payment',
    lastUsed: '2024-03-10'
  },
  {
    id: 3,
    title: 'Maya',
    description: 'Mobile wallet',
    icon: Wallet,
    status: 'available',
    info: 'Digital payment solution'
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: '2024-03-15',
    description: 'Gate Pass Fee',
    amount: 500,
    status: 'completed',
    paymentMethod: 'Credit Card'
  },
  {
    id: 2,
    date: '2024-03-10',
    description: 'Registration Fee',
    amount: 1000,
    status: 'completed',
    paymentMethod: 'GCash'
  }
];

export default function UserPayments() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState<Partial<PaymentMethod>>({});

  const handleCreate = () => {
    setEditingMethod(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData(method);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMethod) {
      setPaymentMethods(paymentMethods.map(method => 
        method.id === editingMethod.id ? { ...method, ...formData } : method
      ));
    } else {
      const newMethod: PaymentMethod = {
        ...formData as PaymentMethod,
        id: Math.max(...paymentMethods.map(m => m.id), 0) + 1,
        status: 'available'
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your payment methods and transactions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#24FE41] bg-opacity-10 text-[#24FE41]">
                  <method.icon size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{method.title}</h3>
                    {method.isDefault && (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
              </div>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{method.info}</p>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-sm text-[#24FE41] hover:text-[#1ee539] flex items-center gap-1"
                  >
                    <Check size={16} />
                    Set as Default
                  </button>
                )}
                {method.lastUsed && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last used: {method.lastUsed}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Receipt size={24} className="text-[#24FE41]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          </div>
          <button className="text-[#24FE41] hover:text-[#1ee539] font-medium">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-900 dark:text-white">Date</th>
                <th className="pb-3 text-gray-900 dark:text-white">Description</th>
                <th className="pb-3 text-gray-900 dark:text-white">Amount</th>
                <th className="pb-3 text-gray-900 dark:text-white">Payment Method</th>
                <th className="pb-3 text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-white">{transaction.date}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{transaction.description}</td>
                  <td className="py-4 text-gray-900 dark:text-white">₱{transaction.amount.toFixed(2)}</td>
                  <td className="py-4 text-gray-900 dark:text-white">{transaction.paymentMethod}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-600' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
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
                  Additional Information
                </label>
                <textarea
                  value={formData.info || ''}
                  onChange={(e) => setFormData({ ...formData, info: e.target.value })}
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
                  {editingMethod ? 'Update' : 'Add'} Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card bg-blue-50 dark:bg-blue-900/20">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Payment Security</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All payment transactions are secured with industry-standard encryption. We never store your complete card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
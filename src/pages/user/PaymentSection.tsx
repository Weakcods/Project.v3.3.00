import { CreditCard, Receipt, AlertCircle,  Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const payments = [
  {
    id: 1,
    type: 'Annual Fee',
    amount: 1500,
    status: 'paid',
    date: '2024-03-15',
    receipt: 'REC-2024-001',
  },
  {
    id: 2,
    type: 'Gate Pass Renewal',
    amount: 500,
    status: 'pending',
    date: '2024-03-20',
    receipt: 'REC-2024-002',
  },
];

export default function PaymentSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Payments & Billing
      </h2>

      {/* Payment Methods Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Payment Methods
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Credit Card Option */}
          <button className="flex items-center gap-3 p-4 border dark:border-gray-700 rounded-lg hover:border-[#24FE41] transition-colors">
            <CreditCard className="text-[#24FE41]" size={24} />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Add Credit/Debit Card</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visa, MasterCard, etc.</p>
            </div>
          </button>

          {/* GCash Option */}
          <button className="flex items-center gap-3 p-4 border dark:border-gray-700 rounded-lg hover:border-[#24FE41] transition-colors">
            <Wallet className="text-[#24FE41]" size={24} />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">GCash</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mobile wallet</p>
            </div>
          </button>

          {/* Maya Option */}
          <button className="flex items-center gap-3 p-4 border dark:border-gray-700 rounded-lg hover:border-[#24FE41] transition-colors">
            <Wallet className="text-[#24FE41]" size={24} />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white"> Maya</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mobile wallet</p>
            </div>
          </button>
        </div>
      </div>

      {/* Payment History Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Payment History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-900 dark:text-white">Type</th>
                <th className="pb-3 text-gray-900 dark:text-white">Amount</th>
                <th className="pb-3 text-gray-900 dark:text-white">Status</th>
                <th className="pb-3 text-gray-900 dark:text-white">Date</th>
                <th className="pb-3 text-gray-900 dark:text-white">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-white">{payment.type}</td>
                  <td className="py-4 text-gray-900 dark:text-white">₱{payment.amount}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-gray-900 dark:text-white">{payment.date}</td>
                  <td className="py-4">
                    {payment.status === 'paid' ? (
                      <button className="flex items-center gap-1 text-[#24FE41] hover:underline">
                        <Receipt size={16} />
                        {payment.receipt}
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Guidelines Section */}
      <div className="mt-8 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-[#24FE41]" size={24} />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Payment Information</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Annual fees are due at the start of each school year.</li>
              <li>• Gate pass renewals can be paid quarterly.</li>
              <li>• Late payments may incur additional fees.</li>
              <li>• Receipts are automatically generated for all payments.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { QrCode, Shield, Smartphone } from 'lucide-react';

export default function PreviewImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative hidden lg:block"
    >
      <div className="relative perspective-1000">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#24FE41]/20 to-[#1ee539]/20 dark:from-[#24FE41]/10 dark:to-[#1ee539]/10 blur-2xl" />
        
        {/* Main Preview Images */}
        <div className="relative grid grid-cols-2 gap-4">
          {/* Gate Pass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="col-span-2 relative"
          >
            <motion.div
              animate={{ 
                rotateX: [-2, 2, -2],
                rotateY: [-3, 3, -3]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Student Gate Pass</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Valid until Dec 2024-2027</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-[#24FE41]/20 p-2 rounded-lg"
                >
                  <QrCode className="w-8 h-8 text-[#24FE41]" />
                </motion.div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=150"
                  alt="Student Photo"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#24FE41]"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Joshua Bacay</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ID: STU2023456</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Computer Science</p>
                </div>
              </div>

              
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#24FE41]/20 p-2 rounded-lg">
                <Smartphone className="w-5 h-5 text-[#24FE41]" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">Mobile Access</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Always at hand</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#24FE41]/20 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-[#24FE41]" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">Secure Access</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Enhanced security</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute -top-6 -right-6 z-10"
        >
          
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2"
        >
          <div className="space-y-3">
            {[
              { label: "Instant QR Scan", delay: 0 },
              { label: "Real-time Updates", delay: 0.2 },
              { label: "24/7 Access Control", delay: 0.4 }
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8 + feature.delay }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-[#24FE41]"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
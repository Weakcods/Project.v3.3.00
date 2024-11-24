import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}

export default function StatsCard({ number, label, icon, index }: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut"
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          delay: index * 0.2 + 0.3,
          type: "spring",
          stiffness: 200,
          damping: 10
        }}
        className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full"
      >
        <div className="text-emerald-600 dark:text-emerald-400">
          {icon}
        </div>
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
      >
        {number}
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.6 }}
        className="text-gray-600 dark:text-gray-300 font-medium"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}
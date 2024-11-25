import React, { useState, FormEvent } from 'react';
import { MessageSquare, Send, Zap, HeartHandshake, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const FeedbackSection: React.FC = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setFeedback('');

    // Show the notification after submitting feedback
    setNotificationVisible(true);

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    { icon: Zap, text: 'Fast Response' },
    { icon: HeartHandshake, text: 'Always Listening' },
    { icon: TrendingUp, text: 'Continuous Improvement' }
  ];

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans"
      >
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <motion.div
              className="flex items-center gap-3 mb-8"
              variants={item}
            >
              <MessageSquare className="h-8 w-8 text-primary dark:text-darkPrimary" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Feedback Matters</h1>
            </motion.div>

            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8"
              variants={item}
            >
              We value your thoughts and suggestions. Help us improve by sharing your experience.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={item}
            >
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Share your thoughts
                </label>
                <motion.textarea
                  id="feedback"
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm focus:border-primary dark:focus:border-darkPrimary focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary focus:ring-opacity-50 resize-none p-4 transition-all duration-200"
                  placeholder="Tell us what you think..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  whileFocus={{ scale: 1.005 }}
                />
              </div>

              <motion.button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary dark:bg-darkPrimary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-darkPrimary transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="h-5 w-5 mr-2" />
                Send Feedback
              </motion.button>
            </motion.form>

            <motion.div 
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
              variants={container}
            >
              {features.map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary dark:hover:border-darkPrimary transition-colors duration-200"
                  variants={item}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary dark:text-darkPrimary" />
                  <p className="font-medium text-gray-900 dark:text-white">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Notification Toast */}
      {notificationVisible && (
        <motion.div
          className="fixed bottom-4 right-4 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-3"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="font-medium">Thanks for your feedback!</span>
        </motion.div>
      )}
    </div>
  );
};

export default FeedbackSection;

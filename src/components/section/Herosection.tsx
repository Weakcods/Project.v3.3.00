import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreviewImage from '../PreviewImage';

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-[#24FE41]/10 to-[#1ee539]/10 dark:from-[#24FE41]/5 dark:to-[#1ee539]/5"
      />
      <div className="absolute inset-0 bg-[url('/gate-pass-pattern.svg')] opacity-5 dark:opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left relative z-10"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="px-4 py-2 rounded-full bg-[#24FE41]/10 text-[#1ee539] dark:text-[#24FE41] text-sm font-medium mb-6 inline-block">
                Secure • Fast • Modern
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors ease-in-out duration-300"
              aria-label="Guardian Gate for Palawan State University"
            >
              {/* Gradient for Guardian Gate */}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#FDFC47] to-[#24FE41]"
              >
                Guardian Gate
              </span>
              
              {/* Gradient for Palawan State University */}
              <span 
                className="block mt-2 sm:mt-3 text-lg sm:text-xl"
                aria-label="Subtitle: for Palawan State University"
              >
                <span className="text-base sm:text-lg text-gray-900 dark:text-white">for</span> {/* Keep "for" small */}
                <span 
                  className="ml-1 text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#f12711] to-[#f5af19]"
                >
                  Palawan State University
                </span>
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0 transition-colors"
            >
              Streamline your campus entry/exit processes with our modern gate pass solution. 
              Enhanced security meets seamless accessibility.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Link 
                to="/register" 
                className="group bg-[#24FE41] hover:bg-[#1ee539] text-gray-900 flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#24FE41]/20"
              >
                Get Started 
                <ArrowRight className="inline-block transition-transform group-hover:translate-x-1" size={20} />
              </Link>
              <Link 
                to="/demo" 
                className="group px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-[#24FE41] hover:text-[#24FE41] transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
              >
                Live Demo
                <ChevronRight className="inline-block transition-transform group-hover:translate-x-1" size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Preview Image */}
          <PreviewImage />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
    </section>
  );
}

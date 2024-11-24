import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { KeyRound, Mail, ArrowLeft, UserCircle2, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'admin'], { required_error: 'Please select a role' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'user'
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = {
        id: '1',
        email: data.email,
        name: 'John Doe',
        role: data.role,
      };
      const token = 'dummy-token';
      
      login(user, token);
      const dashboardPath = data.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
      navigate(dashboardPath, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFC47] to-[#24FE41]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#24FE41] mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <motion.h2 
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#FDFC47] to-[#24FE41] bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Welcome Back
        </motion.h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-2.5 text-gray-400 group-hover:text-[#24FE41] transition-colors" size={20} />
              <input
                {...register('email')}
                type="email"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#24FE41] focus:border-transparent transition-all bg-white/50 dark:bg-gray-700/50"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Password</label>
            <div className="relative group">
              <KeyRound className="absolute left-3 top-2.5 text-gray-400 group-hover:text-[#24FE41] transition-colors" size={20} />
              <input
                {...register('password')}
                type="password"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#24FE41] focus:border-transparent transition-all bg-white/50 dark:bg-gray-700/50"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.password.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`relative flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${
                selectedRole === 'user' 
                  ? 'border-[#24FE41] bg-[#24FE41]/10' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                <input
                  type="radio"
                  value="user"
                  {...register('role')}
                  className="hidden"
                />
                <User className={`mr-2 ${
                  selectedRole === 'user' ? 'text-[#24FE41]' : 'text-gray-400'
                }`} size={20} />
                <span className={selectedRole === 'user' ? 'text-[#24FE41]' : 'text-gray-600 dark:text-gray-300'}>
                  User
                </span>
              </label>

              <label className={`relative flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${
                selectedRole === 'admin' 
                  ? 'border-[#24FE41] bg-[#24FE41]/10' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                <input
                  type="radio"
                  value="admin"
                  {...register('role')}
                  className="hidden"
                />
                <Shield className={`mr-2 ${
                  selectedRole === 'admin' ? 'text-[#24FE41]' : 'text-gray-400'
                }`} size={20} />
                <span className={selectedRole === 'admin' ? 'text-[#24FE41]' : 'text-gray-600 dark:text-gray-300'}>
                  Admin
                </span>
              </label>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#FDFC47] to-[#24FE41] text-gray-900 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <motion.p 
            className="text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Don't have an account?{' '}
            <Link to="/register" className="text-[#24FE41] hover:underline font-medium">
              Create one
            </Link>
          </motion.p>
          <motion.p 
            className="text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#" className="text-[#24FE41] hover:underline">
              Forgot your password?
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
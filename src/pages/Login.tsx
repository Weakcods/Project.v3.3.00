import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { KeyRound, Mail, ArrowLeft, UserCircle2, AlertCircle, QrCode } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'admin'], { required_error: 'Please select a role' }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy and terms'
  })
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'user',
      acceptTerms: false
    }
  });

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
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="card max-w-md w-full">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#24FE41] mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#24FE41]/10 p-3 rounded-full">
              <QrCode size={40} className="text-[#24FE41]" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Sign in to access your gate pass</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Form fields remain the same */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  {...register('email')}
                  type="email"
                  className="input-field pl-10"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  {...register('password')}
                  type="password"
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Account Type</label>
              <div className="relative">
                <UserCircle2 className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <select
                  {...register('role')}
                  className="input-field pl-10 appearance-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('acceptTerms')}
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#24FE41] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#24FE41] dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-light text-gray-600 dark:text-gray-400">
                  I accept the{' '}
                  <a href="#" className="font-medium text-[#24FE41] hover:underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#" className="font-medium text-[#24FE41] hover:underline">Terms of Service</a>
                </label>
              </div>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.acceptTerms.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#24FE41] hover:underline font-medium">
                Create one
              </Link>
            </p>
            <p className="text-sm">
              <a href="#" className="text-[#24FE41] hover:underline">
                Forgot your password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Home, UserPlus , Settings, Users, Shield, BarChart,MessageSquareText,FileText } from 'lucide-react';
import { CreditCard,MessageSquareDot,Receipt} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { user } = useAuthStore();

  const userNavigation = [
    { name: 'Dashboard', icon: Home, href: '/dashboard/user' },
    { name: 'Requirements', icon: FileText, href: '/requirements' },
    { name: 'Payments', icon: CreditCard, href: '/user-payments' },
    { name: 'Request Pass', icon: UserPlus, href: '/requests' },
    { name: 'View Passes', icon: CreditCard  , href: '/logs' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Feedback', icon: MessageSquareText, href: '/user-feedback' },

  ];

  const adminNavigation = [
    { name: 'Dashboard', icon: Home, href: '/dashboard/admin' },
    { name: 'Security', icon: Shield, href: '/security' },
    { name: 'Analytics', icon: BarChart, href: '/analytics' },
    { name: 'User Management', icon: Users, href: '/users' },
    { name: 'User Information', icon: MessageSquareDot, href: '/user-info' },
    { name: 'User Feedback', icon: MessageSquareDot, href: '/feedback' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Payment', icon: Receipt, href: '/payment' },
  ];

  const navigation = user?.role === 'admin' ? adminNavigation : userNavigation;

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-20 ${
      isOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
    }`}>
      <nav className="h-full overflow-y-auto">
        <div className="px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `sidebar-link group ${isActive ? 'active' : ''} text-gray-900 dark:text-white`
              }
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className={`${!isOpen && 'md:hidden'} transition-opacity duration-200`}>
                {item.name}
              </span>
              {!isOpen && (
                <div className="hidden md:block absolute left-20 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}
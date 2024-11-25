import { Sun, Moon, User, LogOut, Menu, Settings, UserCircle } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import LogoutDialog from './logwarning';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
    setIsUserMenuOpen(false);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              >
                <Menu size={20} />
              </button>
              <span className="text-2xl font-bold text-[#24FE41] ml-2">Gate Pass</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} className="text-white" />
                )}
              </button>
              
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#24FE41] text-white hover:bg-[#1F9A35] hover:scale-105 hover:shadow-md transition-all duration-200"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <User size={16} />
                </button>

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm text-gray-700 dark:text-gray-200">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/settings/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserCircle className="mr-2" size={16} />
                      Profile
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="mr-2" size={16} />
                      Settings
                    </Link>
                    
                    <button
                      onClick={handleLogoutDialogOpen}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <LogoutDialog 
        isOpen={isLogoutDialogOpen} 
        onClose={handleLogoutDialogClose} 
      />
    </>
  );
}

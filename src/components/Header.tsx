import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { useState, useEffect } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#Testimonials', label: 'Testimonials' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group z-50"
          >
            <div className="w-8 h-8 rounded-lg bg-[#24FE41] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#24FE41] transition-colors duration-300">
              Gate Pass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-600 dark:text-gray-300 hover:text-[#24FE41] dark:hover:text-[#24FE41] transition-colors duration-300 group py-2"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#24FE41] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
             

              <Link
                to="/login"
                className="relative group px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#24FE41] dark:hover:text-[#24FE41] transition-all duration-300 transform hover:scale-105"
              >
                Sign in
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#24FE41] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#24FE41] text-gray-900 font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#24FE41]/90 focus:outline-none focus:ring-2 focus:ring-[#24FE41]/50"
              >
                Create Account
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#24FE41]/50"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-gray-600 dark:text-white transition-colors duration-300" />
                ) : (
                  <Sun size={20} className="text-yellow-500 dark:text-white transition-colors duration-300" />
                )}
              </button>
              
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`
            fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-300 ease-in-out transform
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden
          `}>
            <div className="flex flex-col h-full pt-20 px-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-gray-900 dark:text-white hover:text-[#24FE41] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              
              <div className="mt-8 flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="w-full py-3 text-center text-gray-900 dark:text-white hover:text-[#24FE41] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="w-full py-3 text-center bg-[#24FE41] text-gray-900 rounded-lg font-medium hover:bg-[#24FE41]/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
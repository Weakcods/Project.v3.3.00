import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Loading from './Loading';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);

    // Simulate initial load
    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  if (isLoading) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} mt-16`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaNewspaper, 
  FaFolder, 
  FaImage, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaChartBar
} from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Check if on login page
  const isLoginPage = pathname === '/admin/login';

  // Handle redirect in useEffect instead of during render
  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [user, loading, isLoginPage, router]);

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-softLightGray dark:bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-deepCrimson mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-opensans">Loading...</p>
        </div>
      </div>
    );
  }

  // If on login page, just render children
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If no user and not on login page, show nothing (will redirect via useEffect)
  if (!user) {
    return null;
  }

  const navItems = [
    { href: '/admin/dashboard', icon: FaChartBar, label: 'Dashboard' },
    { href: '/admin/posts', icon: FaNewspaper, label: 'Posts' },
    { href: '/admin/categories', icon: FaFolder, label: 'Categories' },
    { href: '/admin/media', icon: FaImage, label: 'Media' },
    { href: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-softLightGray dark:bg-charcoal">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-charcoal dark:text-white"
        >
          {mobileSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-2xl border-r border-gray-100 dark:border-gray-700 z-40 transition-all duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Admin Panel Title */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <Link href="/admin/dashboard" className="block">
              <p className="text-sm font-semibold font-montserrat text-charcoal dark:text-white uppercase tracking-wider">
                Admin Panel
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-opensans mt-1">
                Manage your content
              </p>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium font-opensans transition-all duration-300 ${
                    isActive
                      ? 'bg-deepCrimson/10 text-deepCrimson dark:bg-deepCrimson/20 dark:text-deepCrimson'
                      : 'text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 font-medium font-opensans"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`lg:ml-64 min-h-screen p-4 md:p-6 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto pb-16">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}
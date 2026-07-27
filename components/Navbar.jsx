'use client';
import { useState, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import DarkModeToggle from './DarkModeToggle';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import SearchModal from './SearchModal';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  // Remove user and logout from here - they'll only be in admin sidebar
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show navbar on admin pages
  const isAdminPage = pathname?.startsWith('/admin');
  
  if (isAdminPage) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/latest', label: 'Latest' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-charcoal/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="News Sketch Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold font-montserrat text-deepCrimson group-hover:text-red-700 transition-colors duration-300 hidden sm:block">
              News Sketch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 rounded-lg font-medium font-opensans transition-all duration-300 ${
                  pathname === link.href
                    ? 'bg-deepCrimson/10 text-deepCrimson dark:bg-deepCrimson/20 dark:text-deepCrimson'
                    : 'text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-deepCrimson dark:hover:text-deepCrimson'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 text-charcoal dark:text-white"
              aria-label="Search"
            >
              <FaSearch size={18} />
            </button>
            
            <DarkModeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 text-charcoal dark:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white dark:bg-charcoal border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium font-opensans transition-all duration-300 ${
                      pathname === link.href
                        ? 'bg-deepCrimson/10 text-deepCrimson dark:bg-deepCrimson/20 dark:text-deepCrimson'
                        : 'text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
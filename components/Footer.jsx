'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setSubscribing(true);
    
    try {
      // Call your newsletter API endpoint
      // const res = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) throw new Error('Subscription failed');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubscribed(true);
      toast.success('🎉 Subscribed successfully!');
      setEmail('');
      
      // Reset subscribed state after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16">
      {/* Decorative top border with gradient */}
      <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-deepCrimson to-transparent"></div>
      
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          
          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-deepCrimson/10 via-deepCrimson/5 to-transparent dark:from-deepCrimson/20 dark:via-deepCrimson/10 dark:to-transparent p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-4xl mb-3">📬</span>
                <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-charcoal dark:text-white mb-2">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-600 dark:text-gray-400 font-opensans mb-6">
                  Get the latest stories, exclusive content, and updates delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <div className="flex-1 relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-charcoal dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-300 font-opensans"
                      disabled={subscribing || subscribed}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subscribing || subscribed}
                    className="bg-deepCrimson hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold font-montserrat transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2 min-w-[130px]"
                  >
                    {subscribing ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Subscribing...
                      </>
                    ) : subscribed ? (
                      <>
                        <FaCheckCircle />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </button>
                </form>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-opensans">
                  ✦ No spam, unsubscribe anytime ✦
                </p>
              </motion.div>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 md:p-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="text-2xl font-bold font-montserrat text-deepCrimson hover:text-red-700 transition-colors duration-300">
                News Sketch
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 font-opensans leading-relaxed">
                Telling stories that matter with integrity, depth, and a commitment to truth.
              </p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-deepCrimson hover:text-white transition-all duration-300">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-deepCrimson hover:text-white transition-all duration-300">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-deepCrimson hover:text-white transition-all duration-300">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-deepCrimson hover:text-white transition-all duration-300">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold font-montserrat text-charcoal dark:text-white uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 font-opensans">
                <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">Home</Link></li>
                <li><Link href="/latest" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">Latest News</Link></li>
                <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">Contact</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold font-montserrat text-charcoal dark:text-white uppercase tracking-wider mb-4">
                Categories
              </h3>
              <ul className="space-y-3 font-opensans">
                <li><Link href="/category/technology" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">Technology</Link></li>
                <li><Link href="/category/development" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">Development</Link></li>
                <li><Link href="/category/design" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">Design</Link></li>
                <li><Link href="/category/business" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">Business</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold font-montserrat text-charcoal dark:text-white uppercase tracking-wider mb-4">
                Get in Touch
              </h3>
              <ul className="space-y-3 font-opensans">
                <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                  <FaEnvelope className="text-deepCrimson mt-1 flex-shrink-0" />
                  <span>info@newssketch.com</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                  <FaPhone className="text-deepCrimson mt-1 flex-shrink-0" />
                  <span>+234 (810) 650-9069</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                  <FaMapMarkerAlt className="text-deepCrimson mt-1 flex-shrink-0" />
                  <span>123 News Street, Media City, MC 12345</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-100 dark:border-gray-700 px-8 py-6 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-opensans">
                &copy; {currentYear} News Sketch. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm font-opensans">
                <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-500 dark:text-gray-400 hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
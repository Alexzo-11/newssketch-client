'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section className="bg-softLightGray dark:bg-charcoal/50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
            <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
            Get in Touch
            <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Have questions, feedback, or story ideas? We'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-deepCrimson mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@newssketch.com" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson transition-colors">
                        info@newssketch.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-deepCrimson mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-deepCrimson transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-deepCrimson mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 News Street<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaClock className="text-deepCrimson mt-1" />
                    <div>
                      <p className="font-medium">Working Hours</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Mon - Fri: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-deepCrimson outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-deepCrimson outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Message</label>
                    <textarea
                      rows="4"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-deepCrimson outline-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-deepCrimson text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
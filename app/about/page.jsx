'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaNewspaper, FaUsers, FaAward, FaGlobe, FaCheckCircle, FaRocket, FaHeart, FaStar } from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { icon: FaNewspaper, value: '10K+', label: 'Articles Published' },
    { icon: FaUsers, value: '50K+', label: 'Monthly Readers' },
    { icon: FaAward, value: '25+', label: 'Awards Won' },
    { icon: FaGlobe, value: '120+', label: 'Countries Reached' },
  ];

  const values = [
    {
      icon: FaCheckCircle,
      title: 'Truth & Accuracy',
      description: 'We are committed to delivering fact-checked, verified, and unbiased news.',
    },
    {
      icon: FaHeart,
      title: 'Community First',
      description: 'Our readers are at the heart of everything we do. We value your trust.',
    },
    {
      icon: FaRocket,
      title: 'Innovation',
      description: 'We embrace new technologies to bring you the best news experience.',
    },
    {
      icon: FaStar,
      title: 'Excellence',
      description: 'We strive for excellence in journalism and storytelling.',
    },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Editor-in-Chief',
      bio: '15+ years of journalism experience',
      image: '/placeholder.svg',
    },
    {
      name: 'Sarah Williams',
      role: 'Senior Editor',
      bio: 'Award-winning investigative journalist',
      image: '/placeholder.svg',
    },
    {
      name: 'Michael Chen',
      role: 'Tech Editor',
      bio: 'Former software engineer turned tech journalist',
      image: '/placeholder.svg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director',
      bio: 'UI/UX expert with a passion for visual storytelling',
      image: '/placeholder.svg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-charcoal to-deepCrimson text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6">
              Telling Stories That Matter
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              News Sketch is a modern news platform dedicated to delivering 
              accurate, insightful, and engaging journalism to readers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
              <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
              Our Mission
              <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              To empower our readers with trustworthy news that informs, inspires, 
              and connects communities. We believe in the power of storytelling to 
              drive positive change and foster understanding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-softLightGray dark:bg-charcoal/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <stat.icon className="text-deepCrimson text-4xl mx-auto mb-3" />
                <div className="text-3xl font-bold text-charcoal dark:text-white">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
              <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
              Our Values
              <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-softLightGray dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow group"
              >
                <div className="bg-deepCrimson/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-deepCrimson/20 transition-colors">
                  <value.icon className="text-deepCrimson text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-softLightGray dark:bg-charcoal/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
              <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
              Meet the Team
              <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              The passionate people behind News Sketch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-gradient-to-r from-deepCrimson/20 to-charcoal/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-deepCrimson/10 flex items-center justify-center">
                      <span className="text-4xl font-bold text-deepCrimson">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-deepCrimson text-sm font-medium">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-charcoal to-deepCrimson text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss a story that matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-deepCrimson px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
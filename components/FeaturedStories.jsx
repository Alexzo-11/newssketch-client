'use client';
import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { getPosts } from '@/services/post';
import { motion } from 'framer-motion';

export default function FeaturedStories() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getPosts({ limit: 4, featured: true });
        setPosts(res.posts || []);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
        <p className="text-gray-500">No featured stories available.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
          Featured Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NewsCard post={post} featured />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
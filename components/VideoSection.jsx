'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaPlay, FaStar } from 'react-icons/fa';
import { getVideos } from '@/services/video';
import Link from 'next/link';

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos({ limit: 6 });
        console.log('📹 Videos fetched:', data);
        setVideos(data.videos || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-video animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  // Get featured videos
  const featuredVideos = videos.filter(v => v.featured === true);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold font-montserrat text-charcoal dark:text-white flex items-center gap-3">
            <FaYoutube className="text-red-500" />
            Latest Videos
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-opensans mt-1">
            Watch our latest video content
          </p>
        </div>
      </div>

      {/* Featured Video */}
      {featuredVideos.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FaStar className="text-yellow-500" />
            <span className="text-sm font-semibold text-charcoal dark:text-white font-montserrat">
              Featured Video
            </span>
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 group">
            <div className="aspect-video relative">
              <img
                src={featuredVideos[0].thumbnail || `https://img.youtube.com/vi/${featuredVideos[0].youtubeId}/maxresdefault.jpg`}
                alt={featuredVideos[0].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${featuredVideos[0].youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <a
                  href={`https://www.youtube.com/watch?v=${featuredVideos[0].youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-deepCrimson/90 text-white p-5 rounded-full hover:bg-deepCrimson transition-all duration-300 transform hover:scale-110"
                >
                  <FaPlay size={30} />
                </a>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-2xl font-bold font-montserrat">
                  {featuredVideos[0].title}
                </h3>
                {featuredVideos[0].description && (
                  <p className="text-white/70 font-opensans mt-1 line-clamp-2">
                    {featuredVideos[0].description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 6).map((video, index) => (
          <motion.div
            key={video._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative aspect-video bg-gray-900">
              <img
                src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-deepCrimson/90 text-white p-4 rounded-full hover:bg-deepCrimson transition-all duration-300 transform hover:scale-110"
                >
                  <FaPlay size={20} />
                </a>
              </div>
              {video.featured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <FaStar size={10} /> Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold font-montserrat text-charcoal dark:text-white text-base line-clamp-2">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-gray-500 dark:text-gray-400 text-sm font-opensans line-clamp-2 mt-1">
                  {video.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-3 text-xs text-gray-400 font-opensans">
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                <span>{video.views || 0} views</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
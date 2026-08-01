'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaPlay, FaStar } from 'react-icons/fa';
import { getVideos } from '@/services/video';
import Link from 'next/link';

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos({ limit: 20 });
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
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-video animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-montserrat text-charcoal dark:text-white mb-2">
        📹 Videos
      </h1>
      <p className="text-gray-500 dark:text-gray-400 font-opensans mb-8">
        Watch all our video content
      </p>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No videos available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
                    href={video.youtubeUrl}
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
                {video.type === 'youtube' && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <FaYoutube size={10} /> YouTube
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
      )}
    </div>
  );
}
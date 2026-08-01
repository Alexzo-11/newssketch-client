'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaYoutube, FaTimes } from 'react-icons/fa';

export default function FeaturedVideo({ video }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!video) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-deepCrimson/90 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
              <FaPlay className="text-white text-3xl ml-1" />
            </div>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <FaYoutube className="text-red-500" />
              <span className="text-xs font-semibold text-white/80 bg-black/50 px-2 py-1 rounded-full">
                Featured Video
              </span>
            </div>
            <h3 className="text-white text-xl font-bold font-montserrat line-clamp-2">
              {video.title}
            </h3>
            {video.description && (
              <p className="text-white/70 text-sm font-opensans mt-1 line-clamp-2">
                {video.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-red-500 transition-colors duration-300"
            >
              <FaTimes size={28} />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-gray-900">
              <h2 className="text-white text-2xl font-bold font-montserrat">
                {video.title}
              </h2>
              {video.description && (
                <p className="text-gray-300 font-opensans mt-2">
                  {video.description}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
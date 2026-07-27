'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  
  // Sample video data - you can replace with your own
  const videos = [
    {
      id: 1,
      title: 'Building a News Platform with Next.js',
      embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    {
      id: 2,
      title: 'React 19 Features Explained',
      embed: 'https://www.youtube.com/embed/8pDqJVdNa44',
      thumbnail: 'https://img.youtube.com/vi/8pDqJVdNa44/maxresdefault.jpg',
    },
    {
      id: 3,
      title: 'Tailwind CSS Best Practices',
      embed: 'https://www.youtube.com/embed/C92cI7Dm8bE',
      thumbnail: 'https://img.youtube.com/vi/C92cI7Dm8bE/maxresdefault.jpg',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="bg-deepCrimson w-1 h-8 rounded-full"></span>
          Video Highlights
        </h2>

        {/* Main Video Player */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
          <iframe
            src={activeVideo}
            title="Video player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveVideo(video.embed)}
              className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                activeVideo === video.embed 
                  ? 'ring-4 ring-deepCrimson shadow-lg scale-105' 
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-deepCrimson/90 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800">
                <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
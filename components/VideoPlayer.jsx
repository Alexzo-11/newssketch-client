'use client';
import { useState } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress } from 'react-icons/fa';

export default function VideoPlayer({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!video) return null;

  if (video.type === 'youtube') {
    return (
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
      <video
        src={video.fileUrl}
        className="w-full h-full object-contain"
        controls
        poster="/video-placeholder.jpg"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
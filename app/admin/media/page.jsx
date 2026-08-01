'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getVideos, deleteVideo } from '@/services/video';
import { FaVideo, FaYoutube, FaTrash, FaPlay, FaUpload, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MediaLibrary() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchVideos();
  }, [filter]);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const params = filter !== 'all' ? { type: filter } : {};
      const data = await getVideos(params);
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast.error('Failed to load videos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      await deleteVideo(id);
      toast.success('Video deleted successfully');
      fetchVideos();
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-deepCrimson mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading media library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-charcoal dark:text-white">
            📹 Media Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-opensans mt-1">
            Manage your uploaded videos and YouTube content
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/media/upload?type=youtube"
            className="bg-deepCrimson text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
          >
            <FaYoutube /> Add YouTube Video
          </Link>
          <Link
            href="/admin/media/upload"
            className="bg-charcoal text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
          >
            <FaUpload /> Upload Video
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-opensans transition-all duration-300 ${
            filter === 'all'
              ? 'bg-deepCrimson text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-charcoal dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('upload')}
          className={`px-4 py-2 rounded-lg font-opensans transition-all duration-300 ${
            filter === 'upload'
              ? 'bg-deepCrimson text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-charcoal dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <FaVideo className="inline mr-2" /> Uploaded
        </button>
        <button
          onClick={() => setFilter('youtube')}
          className={`px-4 py-2 rounded-lg font-opensans transition-all duration-300 ${
            filter === 'youtube'
              ? 'bg-deepCrimson text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-charcoal dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <FaYoutube className="inline mr-2" /> YouTube
        </button>
      </div>

      {/* Video Grid */}
      {videos.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-6xl mb-4">📹</div>
          <h3 className="text-xl font-semibold font-montserrat text-charcoal dark:text-white mb-2">
            No Videos Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 font-opensans mb-6">
            Add your first YouTube video or upload a file
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/admin/media/upload?type=youtube"
              className="bg-deepCrimson text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
            >
              <FaYoutube /> Add YouTube
            </Link>
            <Link
              href="/admin/media/upload"
              className="bg-charcoal text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
            >
              <FaUpload /> Upload Video
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-900">
                {video.type === 'youtube' ? (
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                ) : (
                  <video
                    src={video.fileUrl}
                    className="w-full h-full object-cover"
                    poster="/video-placeholder.jpg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="flex items-center justify-center h-full bg-gray-800 text-white">
                          <div class="text-center">
                            <div class="text-4xl mb-2">🎬</div>
                            <p>Video unavailable</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {video.type === 'youtube' ? (
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-deepCrimson/90 text-white p-4 rounded-full hover:bg-deepCrimson transition-all duration-300"
                    >
                      <FaPlay size={24} />
                    </a>
                  ) : (
                    <button className="bg-deepCrimson/90 text-white p-4 rounded-full hover:bg-deepCrimson transition-all duration-300">
                      <FaPlay size={24} />
                    </button>
                  )}
                </div>
                {video.type === 'youtube' && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <FaYoutube /> YouTube
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold font-montserrat text-charcoal dark:text-white text-lg mb-1 line-clamp-1">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-opensans line-clamp-2 mb-3">
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center text-xs text-gray-400 font-opensans">
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  <span>{video.views || 0} views</span>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="flex-1 text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center justify-center gap-1 text-sm font-opensans"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
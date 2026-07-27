'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { uploadVideo, addYouTubeVideo } from '@/services/video';
import { FaUpload, FaYoutube, FaArrowLeft, FaPlay } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function UploadVideo() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'upload';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setIsSubmitting(true);

    try {
      if (type === 'youtube') {
        if (!youtubeUrl.trim()) {
          toast.error('Please enter a YouTube URL');
          setIsSubmitting(false);
          return;
        }
        await addYouTubeVideo({ title, description, youtubeUrl });
        toast.success('🎬 YouTube video added successfully!');
      } else {
        if (!videoFile) {
          toast.error('Please select a video file');
          setIsSubmitting(false);
          return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', videoFile);
        await uploadVideo(formData);
        toast.success('🎬 Video uploaded successfully!');
      }
      
      router.push('/admin/media');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload video');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-deepCrimson mx-auto mb-4"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/media"
          className="text-charcoal dark:text-white hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300"
        >
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold font-montserrat text-charcoal dark:text-white">
          {type === 'youtube' ? 'Add YouTube Video' : 'Upload Video'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description (optional)"
            rows="4"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
            disabled={isSubmitting}
          />
        </div>

        {/* YouTube URL or File Upload */}
        {type === 'youtube' ? (
          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
              YouTube URL *
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <FaYoutube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Supports: youtube.com/watch, youtu.be, youtube.com/embed
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
              Video File *
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-deepCrimson transition-all duration-300">
              {previewUrl ? (
                <div>
                  <video
                    src={previewUrl}
                    controls
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setPreviewUrl(null);
                    }}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove video
                  </button>
                </div>
              ) : (
                <div>
                  <FaUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400 font-opensans">
                    Click or drag to upload a video
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    MP4, WebM, OGG, MOV, AVI, MKV (Max 500MB)
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="video-upload"
                    className="inline-block mt-4 bg-deepCrimson text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 cursor-pointer"
                  >
                    Choose Video
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-deepCrimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                {type === 'youtube' ? 'Adding...' : 'Uploading...'}
              </>
            ) : (
              <>
                {type === 'youtube' ? <FaYoutube /> : <FaUpload />}
                {type === 'youtube' ? 'Add YouTube Video' : 'Upload Video'}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/media')}
            className="bg-gray-200 dark:bg-gray-700 text-charcoal dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
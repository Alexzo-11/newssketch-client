'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostBySlug } from '@/services/post';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaWhatsapp,
  FaRegBookmark,
  FaBookmark,
  FaRegClock,
  FaRegUser,
  FaRegCalendarAlt,
  FaEye,
  FaArrowLeft,
  FaShareAlt
} from 'react-icons/fa';
import CommentSection from '@/components/CommentSection';
import RelatedPosts from '@/components/RelatedPosts';
// Remove: import Newsletter from '@/components/Newsletter';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ArticlePage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Article not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || 'News Sketch Article';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleCopyLink = () => {
  if (typeof window !== 'undefined' && document.hasFocus()) {
    navigator.clipboard.writeText(shareUrl)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
  } else {
    // Fallback: show the link in a prompt
    prompt('Copy this link:', shareUrl);
  }
  setShowShareMenu(false);
};

  if (loading) {
    return (
      <div className="min-h-screen bg-softLightGray dark:bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-deepCrimson mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-opensans">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-softLightGray dark:bg-charcoal flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-3xl font-bold font-montserrat text-charcoal dark:text-white mb-2">Article Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 font-opensans">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-deepCrimson text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = post.readingTime || Math.ceil(post.content?.length / 1000) || 3;
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-softLightGray dark:bg-charcoal">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-charcoal dark:text-white hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300 font-opensans"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden">
        <Image
          src={post.image?.url || '/placeholder.jpg'}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        
        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-5xl">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                href={`/category/${post.category?.slug}`}
                className="inline-block bg-deepCrimson/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold font-montserrat hover:bg-deepCrimson transition-colors duration-300 mb-4"
              >
                {post.category?.name || 'Uncategorized'}
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-montserrat text-white leading-tight mb-4"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 font-opensans text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <FaRegUser className="text-deepCrimson" />
                <span className="font-semibold">{post.author?.name || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-deepCrimson" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegClock className="text-deepCrimson" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEye className="text-deepCrimson" />
                <span>{post.views || 0} views</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 mt-6"
            >
              <button
                onClick={handleBookmark}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 font-opensans text-sm"
              >
                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 font-opensans text-sm"
                >
                  <FaShareAlt />
                  <span>Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-2 min-w-[200px] animate-fadeIn">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-charcoal dark:text-white font-opensans"
                    >
                      <FaFacebook className="text-blue-600 text-xl" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-charcoal dark:text-white font-opensans"
                    >
                      <FaTwitter className="text-blue-400 text-xl" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-charcoal dark:text-white font-opensans"
                    >
                      <FaLinkedin className="text-blue-700 text-xl" />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-charcoal dark:text-white font-opensans"
                    >
                      <FaWhatsapp className="text-green-500 text-xl" />
                      <span>WhatsApp</span>
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-charcoal dark:text-white font-opensans"
                    >
                      <span>📋</span>
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="bg-white dark:bg-gray-800 text-charcoal dark:text-white px-3 py-1.5 rounded-full text-sm font-opensans shadow-sm hover:shadow-md transition-all duration-300 hover:text-deepCrimson dark:hover:text-deepCrimson"
                >
                  #{tag}
                </Link>
              ))}
            </motion.div>
          )}

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none font-opensans prose-headings:font-montserrat prose-headings:text-charcoal dark:prose-headings:text-white prose-p:text-charcoal dark:prose-p:text-gray-200 prose-a:text-deepCrimson prose-a:no-underline hover:prose-a:underline prose-blockquote:border-deepCrimson prose-blockquote:bg-white dark:prose-blockquote:bg-gray-800 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-deepCrimson/10 flex items-center justify-center text-2xl font-bold text-deepCrimson font-montserrat flex-shrink-0">
                {post.author?.name?.[0] || 'A'}
              </div>
              <div>
                <h3 className="text-lg font-bold font-montserrat text-charcoal dark:text-white">
                  {post.author?.name || 'Admin'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-opensans">
                  Published on {formattedDate}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2 font-opensans">
                  {post.author?.bio || 'Passionate about sharing meaningful stories that matter.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <CommentSection postId={post._id} />
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <RelatedPosts categoryId={post.category?._id} currentId={post._id} />
          </motion.div>

          {/* Newsletter section removed - now only in footer */}
        </div>
      </div>
    </div>
  );
}
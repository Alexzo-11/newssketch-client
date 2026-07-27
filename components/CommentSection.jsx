'use client';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getComments, addComment } from '@/services/comment';
import toast from 'react-hot-toast';
import { FaUser, FaComment, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function CommentSection({ postId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) {
        console.log('⚠️ No postId provided to CommentSection');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        console.log('📡 Fetching comments for post:', postId);
        const data = await getComments(postId);
        console.log('✅ Comments received:', data);
        setComments(data || []);
      } catch (error) {
        console.error('❌ Error fetching comments:', error);
        // Don't show error toast for 404, just set empty comments
        if (error.response?.status === 404) {
          console.log('ℹ️ Comments endpoint not available yet');
          setComments([]);
        } else {
          toast.error('Failed to load comments');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to comment');
      return;
    }
    if (!content.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    try {
      console.log('📡 Submitting comment for post:', postId);
      const newComment = await addComment({ postId, content });
      console.log('✅ Comment added:', newComment);
      setComments([newComment, ...comments]);
      setContent('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('❌ Error adding comment:', error);
      toast.error(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold font-montserrat mb-6 text-charcoal dark:text-white">
          Comments
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm animate-pulse">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold font-montserrat mb-6 text-charcoal dark:text-white flex items-center gap-3">
        <FaComment className="text-deepCrimson" />
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      {user ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-deepCrimson/10 flex items-center justify-center text-deepCrimson font-bold flex-shrink-0">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="3"
                placeholder="Write a comment..."
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-softLightGray dark:bg-charcoal text-charcoal dark:text-white font-opensans focus:outline-none focus:ring-2 focus:ring-deepCrimson transition-all duration-200"
                disabled={submitting}
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={submitting || !content.trim()}
                  className="bg-deepCrimson text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-opensans flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Posting...
                    </>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-opensans">
            Please{' '}
            <Link href="/admin/login" className="text-deepCrimson hover:underline font-semibold">
              login
            </Link>
            {' '}to join the conversation.
          </p>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 font-opensans">
          <p className="text-4xl mb-2">💬</p>
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-deepCrimson/10 flex items-center justify-center text-deepCrimson font-bold flex-shrink-0">
                  {comment.author?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold font-montserrat text-charcoal dark:text-white">
                      {comment.author?.name || 'Anonymous'}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400 font-opensans">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-charcoal dark:text-gray-200 font-opensans leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Add missing import
import Link from 'next/link';
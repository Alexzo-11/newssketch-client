'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getPosts, deletePost } from '@/services/post';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

export default function AdminPosts() {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect handled by layout
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await getPosts({ page, limit: 10 });
        setPosts(res.posts || []);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p._id !== id));
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete post');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Posts</h1>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Total: {total} posts
          </p>
        </div>
        <Link 
          href="/admin/posts/new" 
          className="bg-deepCrimson text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
        >
          <FaPlus /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No posts found. Create your first post!</p>
          <Link 
            href="/admin/posts/new" 
            className="inline-block mt-4 bg-deepCrimson text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Create Post
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium line-clamp-1">{post.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                            {post.category?.name || 'Uncategorized'} • {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                          {post.category?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.published 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link 
                            href={`/article/${post.slug}`} 
                            target="_blank"
                            className="p-1.5 text-gray-500 hover:text-blue-600 transition"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          <Link 
                            href={`/admin/posts/edit/${post._id}`}
                            className="p-1.5 text-gray-500 hover:text-blue-600 transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id, post.title)}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
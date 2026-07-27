'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getPostById, updatePost } from '@/services/post';
import { getCategories } from '@/services/category';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const Editor = dynamic(() => import('@/components/Editor'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
});

export default function EditPost() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [existingImage, setExistingImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seo, setSeo] = useState({ 
    metaTitle: '', 
    metaDescription: '', 
    slug: '' 
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !user) return;
      
      setIsLoading(true);
      try {
        // Fetch post and categories in parallel
        const [postData, catData] = await Promise.all([
          getPostById(id),
          getCategories()
        ]);
        
        console.log('📄 Post data:', postData);
        console.log('📂 Categories:', catData);
        
        setTitle(postData.title || '');
        setContent(postData.content || '');
        setCategory(postData.category?._id || '');
        setTags(postData.tags ? postData.tags.join(', ') : '');
        setExistingImage(postData.image?.url || '');
        setSeo({
          metaTitle: postData.metaTitle || '',
          metaDescription: postData.metaDescription || '',
          slug: postData.slug || '',
        });
        setCategories(catData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load post data');
        router.push('/admin/posts');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content);
      formData.append('category', category);
      formData.append('tags', tags.split(',').map(t => t.trim()).filter(t => t));
      formData.append('metaTitle', seo.metaTitle || title);
      formData.append('metaDescription', seo.metaDescription || content.replace(/<[^>]*>/g, '').slice(0, 160));
      formData.append('slug', seo.slug || '');
      
      if (image) {
        formData.append('image', image);
      }
      
      await updatePost(id, formData);
      toast.success('✅ Post updated successfully!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-deepCrimson mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/posts"
          className="text-charcoal dark:text-white hover:text-deepCrimson dark:hover:text-deepCrimson transition-colors duration-300"
        >
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold font-montserrat text-charcoal dark:text-white">
          Edit Post
        </h1>
      </div>

      {/* Current Image Preview */}
      {existingImage && (
        <div className="mb-4">
          <p className="text-sm font-medium text-charcoal dark:text-gray-300 mb-1">Current Image:</p>
          <img 
            src={existingImage} 
            alt="Current" 
            className="h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
            Post Title *
          </label>
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
            required
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. nextjs, react, tailwind"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
            Content *
          </label>
          <Editor value={content} onChange={setContent} />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
            Replace Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-deepCrimson file:text-white hover:file:bg-red-700 transition-all duration-200"
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Leave empty to keep current image
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <h3 className="text-lg font-semibold font-montserrat text-charcoal dark:text-white mb-4">
            SEO Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                placeholder="SEO title (leave empty for auto)"
                value={seo.metaTitle}
                onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
                Meta Description
              </label>
              <input
                type="text"
                placeholder="SEO description (leave empty for auto)"
                value={seo.metaDescription}
                onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1">
                Custom Slug
              </label>
              <input
                type="text"
                placeholder="custom-url-slug (leave empty for auto)"
                value={seo.slug}
                onChange={(e) => setSeo({ ...seo, slug: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-deepCrimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
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
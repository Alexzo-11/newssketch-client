'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createPost } from '@/services/post';
import { getCategories } from '@/services/category';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FaArrowLeft, FaUpload, FaTags, FaImage, FaSearch } from 'react-icons/fa';

// Dynamically import Editor with no SSR
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-deepCrimson mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 font-opensans">Loading editor...</p>
      </div>
    </div>
  )
});

export default function NewPost() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seo, setSeo] = useState({
    metaTitle: '',
    metaDescription: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
        toast.error('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchCategories();
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

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

      if (image) {
        formData.append('image', image);
      }

      await createPost(formData);
      toast.success('🎉 Post published successfully!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      const message = error.response?.data?.message || 'Failed to create post. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-deepCrimson mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-opensans">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/posts"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 text-charcoal dark:text-white"
        >
          <FaArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-charcoal dark:text-white">
            Create New Post
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-opensans text-sm mt-1">
            Write and publish your article
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1.5 font-opensans">
            Post Title <span className="text-deepCrimson">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your article title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-charcoal dark:text-white text-lg font-medium focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1.5 font-opensans">
              Category <span className="text-deepCrimson">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200 appearance-none"
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
            {categories.length === 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 font-opensans">
                ⚠️ No categories found. Please create a category first.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1.5 font-opensans">
              <FaTags className="inline mr-1.5" /> Tags
            </label>
            <input
              type="text"
              placeholder="e.g. nextjs, react, tailwind"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-opensans">
              Separate tags with commas
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1.5 font-opensans">
            Content <span className="text-deepCrimson">*</span>
          </label>
          <Editor value={content} onChange={setContent} />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1.5 font-opensans">
            <FaImage className="inline mr-1.5" /> Featured Image
          </label>
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-deepCrimson transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={isSubmitting}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <FaUpload className="text-3xl text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400 font-opensans">
                  Click to upload an image
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-opensans">
                  JPG, PNG, GIF, WebP (Max 10MB)
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <h3 className="text-lg font-semibold font-montserrat text-charcoal dark:text-white mb-4 flex items-center gap-2">
            <FaSearch /> SEO Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1.5 font-opensans">
                Meta Title
              </label>
              <input
                type="text"
                placeholder="SEO title (leave empty for auto)"
                value={seo.metaTitle}
                onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                className="w-full p-3.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-opensans">
                Recommended: 50-60 characters. Leave empty to use the post title.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-1.5 font-opensans">
                Meta Description
              </label>
              <input
                type="text"
                placeholder="SEO description (leave empty for auto)"
                value={seo.metaDescription}
                onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                className="w-full p-3.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-charcoal dark:text-white focus:ring-2 focus:ring-deepCrimson focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-opensans">
                Recommended: 150-160 characters. Leave empty to auto-generate from content.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-deepCrimson text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-montserrat"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Publishing...
              </>
            ) : (
              'Publish Post'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="flex-1 sm:flex-none bg-gray-200 dark:bg-gray-700 text-charcoal dark:text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-montserrat"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import { getPostsByCategory } from '@/services/post';

export default function CategoryPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getPostsByCategory(slug);
        setPosts(data.posts);
        setCategory(data.category);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">{category?.name || 'Category'}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{category?.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
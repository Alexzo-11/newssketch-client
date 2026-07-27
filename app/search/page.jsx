'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import { searchPosts } from '@/services/post';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await searchPosts(q);
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [q]);

  if (loading) return <div className="container mx-auto px-4 py-12">Searching...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Results for "{q}"</h1>
      {results.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
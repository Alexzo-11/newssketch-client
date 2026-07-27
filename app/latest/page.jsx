'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import { getPosts } from '@/services/post';
import Pagination from '@/components/Pagination';

export default function LatestPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getPosts({ page, limit: 9 });
        setPosts(res.posts);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page]);

  if (loading) return <div className="container mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 font-montserrat">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
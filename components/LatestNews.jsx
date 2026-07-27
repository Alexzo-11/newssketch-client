'use client';
import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { getPosts } from '@/services/post';

export default function LatestNews({ limit = 6 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  const nextPage = page + 1;
  const res = await getPosts({ limit, page: nextPage });
  if (res.posts.length) {
    setPosts([...posts, ...res.posts]);
    setPage(nextPage);
  } else {
    setHasMore(false);
  }
};




  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getPosts({ limit });
        setPosts(res.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [limit]);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 animate-pulse"></div>
          ))}
          
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Latest News</h2>
        <p className="text-gray-500">No posts available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
// In the JSX
// {hasMore && (
//   <div className="text-center mt-8">
//     <button 
//       onClick={loadMore}
//       className="bg-deepCrimson text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
//     >
//       Load More
//     </button>
//   </div>
// )}
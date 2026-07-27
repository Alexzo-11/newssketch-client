'use client';
import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { getRelatedPosts } from '@/services/post';

export default function RelatedPosts({ categoryId, currentId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getRelatedPosts(categoryId, currentId);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (categoryId) fetch();
  }, [categoryId, currentId]);

  if (!posts.length) return null;

  return (
    <div className="mt-12">
      <h4 className="text-2xl font-bold mb-6">Related Articles</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
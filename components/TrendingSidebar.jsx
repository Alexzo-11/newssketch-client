'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts } from '@/services/post';

export default function TrendingSidebar() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPosts({ limit: 5, sort: '-views' });
        setPosts(res.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Trending</h3>
      <ul className="space-y-4">
        {posts.map((post, idx) => (
          <li key={post._id} className="flex gap-3">
            <span className="text-deepCrimson font-bold text-lg">{idx + 1}.</span>
            <Link href={`/article/${post.slug}`} className="hover:text-deepCrimson transition">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
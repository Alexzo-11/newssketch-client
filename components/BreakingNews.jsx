'use client';
import { useEffect, useState } from 'react';
import { getPosts } from '@/services/post';
import Link from 'next/link';

export default function BreakingNews() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPosts({ limit: 1, sort: '-createdAt' });
        if (res.posts.length) setLatest(res.posts[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  if (!latest) return null;

  return (
    <div className="bg-deepCrimson text-white py-2 px-4 overflow-hidden">
      <div className="container mx-auto flex items-center gap-4">
        <span className="font-bold uppercase text-sm">Breaking</span>
        <div className="flex-1 truncate">
          <Link href={`/article/${latest.slug}`} className="hover:underline">
            {latest.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
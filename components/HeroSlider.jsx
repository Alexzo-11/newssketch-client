'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from '@/services/post';

export default function HeroSlider() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getPosts({ limit: 5 });
        setPosts(res.posts || []);
      } catch (error) {
        console.error('HeroSlider error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>;
  }

  if (!posts.length) {
    return (
      <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No posts available</p>
      </div>
    );
  }

  const getImageUrl = (url) => {
    if (!url) return '/placeholder.svg';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads/')) return url;
    return '/placeholder.svg';
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className="rounded-xl overflow-hidden h-96"
    >
      {posts.map((post) => (
        <SwiperSlide key={post._id}>
          <Link href={`/article/${post.slug}`}>
            <div className="relative w-full h-96">
              <Image
                src={getImageUrl(post.image?.url)}
                alt={post.title}
                fill
                sizes="100vw"
                className="object-cover"
                unoptimized
                priority
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold font-montserrat">{post.title}</h2>
                <p className="text-sm mt-2 font-opensans">{post.excerpt || ''}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
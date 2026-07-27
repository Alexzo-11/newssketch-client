'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '@/services/category';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Categories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/category/${cat.slug}`}
            className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow hover:shadow-lg transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
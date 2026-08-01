import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/imageHelper';

export default function NewsCard({ post }) {
  const imageUrl = getImageUrl(post.image?.url);

  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <Link href={`/article/${post.slug}`}>
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            unoptimized
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 font-montserrat text-charcoal dark:text-white">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 font-opensans">
            {post.excerpt || ''}
          </p>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 font-opensans">
            {new Date(post.createdAt).toLocaleDateString()} · {post.readingTime || 2} min read
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
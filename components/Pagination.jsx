import Link from 'next/link';

export default function Pagination({ currentPage, totalPages }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-8">
      {pages.map((p) => (
        <Link
          key={p}
          href={`?page=${p}`}
          className={`px-4 py-2 rounded-lg ${
            p === currentPage ? 'bg-deepCrimson text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {p}
        </Link>
      ))}
    </div>
  );
}
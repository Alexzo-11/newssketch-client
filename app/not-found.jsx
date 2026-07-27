import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <h1 className="text-6xl font-bold text-deepCrimson">404</h1>
      <p className="text-2xl font-montserrat mt-4">Page not found</p>
      <Link href="/" className="mt-6 bg-deepCrimson text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
        Go Home
      </Link>
    </div>
  );
}
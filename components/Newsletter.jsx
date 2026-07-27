'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST to /api/subscribe
      toast.success('Subscribed!');
      setEmail('');
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <section className="bg-deepCrimson text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
        <p className="mb-6">Get the latest stories delivered to your inbox.</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 rounded-lg text-charcoal"
            required
          />
          <button type="submit" className="bg-white text-deepCrimson px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
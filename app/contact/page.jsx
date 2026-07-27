'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6 font-montserrat">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border border-lightSlate rounded-lg dark:bg-charcoal dark:border-gray-700"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border border-lightSlate rounded-lg dark:bg-charcoal dark:border-gray-700"
          required
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-3 border border-lightSlate rounded-lg dark:bg-charcoal dark:border-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-deepCrimson text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
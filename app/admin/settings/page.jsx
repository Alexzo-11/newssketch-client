'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('News Sketch');
  const [tagline, setTagline] = useState('Telling Stories That Matter...');

  const handleSave = () => {
    toast.success('Settings saved (mock)');
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Site Name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <button onClick={handleSave} className="bg-deepCrimson text-white px-6 py-3 rounded-lg">Save Settings</button>
      </div>
    </div>
  );
}
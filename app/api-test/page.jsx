'use client';
import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function ApiTestPage() {
  const [status, setStatus] = useState('Testing...');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        setStatus('Testing API connection...');
        const response = await api.get('/test');
        setData(response.data);
        setStatus('✅ API is working!');
      } catch (err) {
        setError(err.message);
        setStatus('❌ API connection failed');
        console.error('API test error:', err);
      }
    };
    testApi();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
      <div className={`p-4 rounded-lg mb-4 ${
        status.includes('✅') ? 'bg-green-100 dark:bg-green-900/20' :
        status.includes('❌') ? 'bg-red-100 dark:bg-red-900/20' :
        'bg-gray-100 dark:bg-gray-700'
      }`}>
        <p className="font-semibold">{status}</p>
      </div>
      
      {data && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Response:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
          <h2 className="font-semibold text-red-600 dark:text-red-400 mb-2">Error:</h2>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <div className="mt-6 space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          API URL: {process.env.NEXT_PUBLIC_API_URL}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-deepCrimson text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Retry Test
        </button>
      </div>
    </div>
  );
}

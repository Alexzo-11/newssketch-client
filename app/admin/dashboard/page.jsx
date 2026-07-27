'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import StatsCard from '@/components/StatsCard';
import { FaUsers, FaNewspaper, FaComments, FaEye, FaArrowRight } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDashboardStats } from '@/services/post';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    posts: 0,
    views: 0,
    comments: 0,
    visitors: 0,
    mostRead: [],
    categories: [],
    chartData: { views: [0, 0, 0, 0, 0, 0, 0] }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const data = await getDashboardStats();
        console.log('📊 Stats received:', data);
        setStats(data);
      } catch (error) {
        console.error('❌ Error fetching stats:', error);
        setError('Failed to load dashboard stats. Please try again.');
        toast.error('Failed to load dashboard stats');
        // Set default values so the page still renders
        setStats({
          posts: 0,
          views: 0,
          comments: 0,
          visitors: 0,
          mostRead: [],
          categories: [],
          chartData: { views: [0, 0, 0, 0, 0, 0, 0] }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  // Show loading state
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-softLightGray dark:bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-deepCrimson mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-opensans">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-softLightGray dark:bg-charcoal flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-white mb-2">
            Something Went Wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-opensans mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-deepCrimson text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Chart data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Views',
        data: stats.chartData?.views || [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#C5232A',
        borderRadius: 4,
        borderColor: '#C5232A',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: document?.documentElement?.classList?.contains('dark') ? '#e0e0e0' : '#3C4043',
          font: {
            family: 'Open Sans',
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: document?.documentElement?.classList?.contains('dark') ? '#e0e0e0' : '#3C4043',
          font: {
            family: 'Open Sans',
          }
        }
      },
      x: {
        ticks: {
          color: document?.documentElement?.classList?.contains('dark') ? '#e0e0e0' : '#3C4043',
          font: {
            family: 'Open Sans',
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-softLightGray dark:bg-charcoal p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-charcoal dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-opensans mt-1">
            Welcome back, {user?.name || 'Admin'}! Here's what's happening.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Link
            href="/admin/posts/new"
            className="bg-deepCrimson text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center gap-2 font-opensans"
          >
            <span>+</span> New Post
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatsCard
          icon={FaNewspaper}
          title="Total Posts"
          value={stats.posts || 0}
          color="blue"
        />
        <StatsCard
          icon={FaEye}
          title="Total Views"
          value={stats.views || 0}
          color="green"
        />
        <StatsCard
          icon={FaComments}
          title="Comments"
          value={stats.comments || 0}
          color="yellow"
        />
        <StatsCard
          icon={FaUsers}
          title="Visitors"
          value={stats.visitors || 0}
          color="purple"
        />
      </div>

      {/* Chart and Most Read */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold font-montserrat mb-4 text-charcoal dark:text-white">
            📊 Traffic Overview
          </h2>
          <div className="h-64 md:h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Most Read Posts */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold font-montserrat mb-4 text-charcoal dark:text-white">
            🔥 Most Read
          </h2>
          {stats.mostRead && stats.mostRead.length > 0 ? (
            <ul className="space-y-3">
              {stats.mostRead.slice(0, 5).map((post, index) => (
                <li key={post.slug || index} className="flex items-center justify-between gap-2 p-2 hover:bg-softLightGray dark:hover:bg-charcoal rounded-lg transition-colors duration-200">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-sm font-bold text-deepCrimson min-w-[20px]">
                      #{index + 1}
                    </span>
                    <Link
                      href={`/article/${post.slug}`}
                      className="text-sm font-opensans text-charcoal dark:text-gray-200 hover:text-deepCrimson dark:hover:text-deepCrimson truncate"
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                  </div>
                  <span className="text-sm font-semibold text-deepCrimson whitespace-nowrap">
                    {post.views}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-4xl mb-2">📝</p>
              <p className="font-opensans">No posts published yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold font-montserrat mb-4 text-charcoal dark:text-white">
          📂 Categories
        </h2>
        {stats.categories && stats.categories.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {stats.categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-softLightGray dark:bg-charcoal px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-md transition-shadow duration-200"
              >
                <span className="font-opensans text-charcoal dark:text-white">{cat.name}</span>
                <span className="bg-deepCrimson text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="font-opensans">No categories created yet</p>
          </div>
        )}
      </div>

      {/* Last Updated */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-opensans">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}
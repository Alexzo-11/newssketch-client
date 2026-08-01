/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'newssketch-api.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
    // Allow unoptimized images for external URLs
    unoptimized: true,
  },
  // Proxy all uploads to Render
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'https://newssketch-api.onrender.com/uploads/:path*',
      },
      {
        source: '/api/videos/:path*',
        destination: 'https://newssketch-api.onrender.com/api/videos/:path*',
      },
    ];
  },
  // Configure Turbopack to handle TinyMCE
  turbopack: {
    resolveAlias: {
      'tinymce/models/dom': 'tinymce/models/dom/model.js',
      'tinymce/icons/default': 'tinymce/icons/default/icons.js',
    },
  },
};

module.exports = nextConfig;
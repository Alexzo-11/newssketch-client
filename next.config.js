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
    // Disable image optimization for external images
    unoptimized: true,
  },
  // Proxy image requests to your backend
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'https://newssketch-api.onrender.com/uploads/:path*',
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
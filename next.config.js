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
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
    ],
    // Disable optimization for external images
    unoptimized: true,
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
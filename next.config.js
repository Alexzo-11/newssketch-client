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
    ],
  },
  // Configure webpack for TinyMCE
  webpack: (config) => {
    // Handle TinyMCE static assets
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules\/tinymce/,
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   // Configure webpack for TinyMCE
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(js|mjs)$/,
//       include: /node_modules\/tinymce/,
//       resolve: {
//         fullySpecified: false,
//       },
//     });
//     return config;
//   },
// };




// // module.exports = nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   // Add this empty turbopack config to silence the error
//   turbopack: {},
//   // Keep your webpack config if needed for production builds
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(js|mjs)$/,
//       include: /node_modules\/tinymce/,
//       resolve: {
//         fullySpecified: false,
//       },
//     });
//     return config;
//   },
// };

// module.exports = nextConfig;


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
    // Add this to handle unoptimized images
    unoptimized: process.env.NODE_ENV === 'production' ? false : true,
  },
  // Add rewrites to proxy image requests to your backend
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
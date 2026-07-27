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
//   // Configure webpack to handle TinyMCE assets
//   webpack: (config) => {
//     // Handle TinyMCE's dynamic imports
//     config.module.rules.push({
//       test: /\.(js|mjs)$/,
//       include: /node_modules\/tinymce/,
//       resolve: {
//         fullySpecified: false,
//       },
//     });
//     return config;
//   },
//   // Explicitly set Turbopack config
//   turbopack: {
//     resolveAlias: {
//       // Map tinymce models to correct path
//       'tinymce/models/dom': 'tinymce/models/dom/model.js',
//       'tinymce/icons/default': 'tinymce/icons/default/icons.js',
//     },
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
    ],
  },
  // Important: Remove turbopack config for production
  // Vercel uses its own build system
};

module.exports = nextConfig;
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
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
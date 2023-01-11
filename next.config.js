/** @type {import('next').NextConfig} */

// eslint-disable-next-line
const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  output: 'standalone',

  reactStrictMode: true,

  productionBrowserSourceMaps: false,

  env: {
    APP_PASSWORD: process.env.APP_PASSWORD,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_URI: process.env.DB_URI,
  },
};

module.exports =
  process.env.NODE_ENV === 'production' ? withPWA(nextConfig) : nextConfig;

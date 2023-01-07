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
    APP_PASSWORD: process.env.APP_PASSWORD ?? 'password',
    DB_PASSWORD: process.env.DB_PASSWORD ?? 'password',
    DB_USER: process.env.DB_USER ?? 'neo4j',
    DB_URI: process.env.DB_URI ?? 'bolt://localhost:7687',
  },
};

module.exports =
  process.env.NODE_ENV === 'production' ? withPWA(nextConfig) : nextConfig;

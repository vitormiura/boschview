/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.jsdelivr.net', "apeview-api-dev-back.herokuapp.com", "apeview-api-dev.herokuapp.com"],
  },
};

module.exports = nextConfig;

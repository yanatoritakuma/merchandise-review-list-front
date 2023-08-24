/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    domains: ["item-shopping.c.yimg.jp"],
  },
};

module.exports = nextConfig;

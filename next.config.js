/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["item-shopping.c.yimg.jp", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "item-shopping.c.yimg.jp",
      "thumbnail.image.rakuten.co.jp",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;

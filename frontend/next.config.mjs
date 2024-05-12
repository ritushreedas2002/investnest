/** @type {import('next').NextConfig} */
import withVideos from 'next-videos';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["www.bing.com"], // Add other domains as needed
  },
};

// export default nextConfig;
export default withVideos(nextConfig);
//const withVideos = require("next-videos");

// module.exports = withVideos();

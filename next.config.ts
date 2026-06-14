import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/remedies',
        destination: '/clean-picks',
        permanent: true,
      },
      {
        source: '/remedies/:slug',
        destination: '/clean-picks',
        permanent: true,
      },
      {
        source: '/conditions',
        destination: '/clean-picks',
        permanent: true,
      },
      {
        source: '/conditions/:slug',
        destination: '/clean-picks',
        permanent: true,
      },
      {
        source: '/brands',
        destination: '/clean-picks',
        permanent: true,
      },
      {
        source: '/brands/:slug',
        destination: '/clean-picks/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
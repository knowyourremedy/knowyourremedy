import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/remedies',
        destination: '/conditions',
        permanent: true,
      },
      {
        source: '/remedies/:slug',
        destination: '/conditions/:slug',
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
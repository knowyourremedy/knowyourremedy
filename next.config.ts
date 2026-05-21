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
    ];
  },
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/U4U62Gysku',
        permanent: false,
      },
      {
        source: '/bot',
        destination: 'https://discord.com/oauth2/authorize?client_id=963248774132662322',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

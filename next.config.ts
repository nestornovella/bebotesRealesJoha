import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "d1on8qs0xdu5jz.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "acdn.mitiendanube.com",
      },
      {
        protocol: "https",
        hostname: "maxiconsumo.com",
      },
      {
        protocol: "https",
        hostname: "previews.123rf.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com"
      }
    ],
  },
};

export default nextConfig;

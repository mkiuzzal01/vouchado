import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "whatevvaaa.thewarriors.team",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/broadcasting/auth",
        destination: "https://whatevvaaa.thewarriors.team/broadcasting/auth",
      },
    ];
  },
};

export default nextConfig;

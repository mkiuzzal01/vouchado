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
      {
        protocol: "https",
        hostname: "admin.vouchado.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/broadcasting/auth",
        destination: "https://admin.vouchado.com/broadcasting/auth",
      },
      {
        source: "/uploads/deals/:path*",
        destination: "https://admin.vouchado.com/uploads/deals/:path*",
      },
      {
        source: "/uploads/categories/:path*",
        destination: "https://admin.vouchado.com/uploads/categories/:path*",
      },
      {
        source: "/uploads/promos/:path*",
        destination: "https://admin.vouchado.com/uploads/promos/:path*",
      },
    ];
  },
};

export default nextConfig;

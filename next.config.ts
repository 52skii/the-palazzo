import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**", // Allow all image paths from postimg.cc
      },
    ],
  },
};

export default nextConfig;

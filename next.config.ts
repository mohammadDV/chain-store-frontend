import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "boofstore.s3.ir-thr-at1.arvanstorage.ir",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

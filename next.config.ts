import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["www.ishwarditransport.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ishwarditransport.com",
        pathname: "/storage/uploads/**",
      },
    ],
  },
};

export default nextConfig;

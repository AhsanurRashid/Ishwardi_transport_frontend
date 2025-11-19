import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME || "", //can't I get this from env?
        pathname: "/storage/**",
      },
    ],
  },
};


export default nextConfig;

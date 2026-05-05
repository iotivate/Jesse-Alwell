import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev HMR over the LAN so the site can be tested on a phone.
  allowedDevOrigins: ["172.20.10.4"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;

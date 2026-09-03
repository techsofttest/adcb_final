import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 80, 90],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.adcbind.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adcb.janamithrasociety.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "adcb.janamithrasociety.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

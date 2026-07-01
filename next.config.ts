import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Mobile-friendly and Capacitor-ready configuration */

  // Export as static HTML for easier mobile packaging
  output: process.env.MOBILE_BUILD === "true" ? "export" : undefined,

  // Image optimization
  images: {
    unoptimized: process.env.MOBILE_BUILD === "true" ? true : false,
  },

  // Optimize build
  compress: true,

  // Security headers for mobile
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

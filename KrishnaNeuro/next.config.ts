import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2_592_000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-icons"],
  },
  async redirects() {
    return [
      { source: "/about-doctor", destination: "/doctor/pamarthi-krishna-das", statusCode: 301 },
      { source: "/faqs", destination: "/faq", statusCode: 301 },
      { source: "/best-psychiatrist-in-vijayawada", destination: "/psychiatrist-in-vijayawada", statusCode: 301 },
      { source: "/testimonials", destination: "/about", statusCode: 301 },
      { source: "/te/about-doctor", destination: "/te/doctor/pamarthi-krishna-das", statusCode: 301 },
      { source: "/te/faqs", destination: "/te/faq", statusCode: 301 },
      { source: "/te/best-psychiatrist-in-vijayawada", destination: "/te/psychiatrist-in-vijayawada", statusCode: 301 },
      { source: "/te/testimonials", destination: "/te/about", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;

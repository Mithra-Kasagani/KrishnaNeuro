import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""} https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com`,
  "frame-src https://www.google.com https://maps.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "media-src 'self'",
  ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
].join("; ");

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
      { source: "/doctor", destination: "/doctor/pamarthi-krishna-das", statusCode: 301 },
      { source: "/doctor/dr-pamarthi-krishna-das", destination: "/doctor/pamarthi-krishna-das", statusCode: 301 },
      { source: "/psychiatrist-vijayawada", destination: "/psychiatrist-in-vijayawada", statusCode: 301 },
      { source: "/clinic", destination: "/clinic-vijayawada", statusCode: 301 },
      { source: "/articles", destination: "/blog", statusCode: 301 },
      { source: "/about-doctor", destination: "/doctor/pamarthi-krishna-das", statusCode: 301 },
      { source: "/faqs", destination: "/faq", statusCode: 301 },
      { source: "/best-psychiatrist-in-vijayawada", destination: "/psychiatrist-in-vijayawada", statusCode: 301 },
      { source: "/testimonials", destination: "/about", statusCode: 301 },
      { source: "/te/doctor", destination: "/te/doctor/pamarthi-krishna-das", statusCode: 301 },
      { source: "/te/doctor/dr-pamarthi-krishna-das", destination: "/te/doctor/pamarthi-krishna-das", statusCode: 301 },
      { source: "/te/psychiatrist-vijayawada", destination: "/te/psychiatrist-in-vijayawada", statusCode: 301 },
      { source: "/te/clinic", destination: "/te/clinic-vijayawada", statusCode: 301 },
      { source: "/te/articles", destination: "/te/blog", statusCode: 301 },
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
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=(), usb=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
    ];
  },
};

export default nextConfig;

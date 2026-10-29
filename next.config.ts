import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/**
 * `npm run build:static` (STATIC_EXPORT=1) writes a plain HTML/CSS/JS site to `out/` for ordinary shared hosting
 * (cPanel/FTP). Image optimisation and custom headers need a Node host, so they are skipped there;
 * deploy/.htaccess supplies caching and security headers instead.
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isStatic && { output: "export", trailingSlash: true }),
  images: {
    ...(isStatic && { unoptimized: true }),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  ...(!isStatic && { async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  } }),
};

export default nextConfig;

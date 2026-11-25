/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];
    return [
      { source: "/assets/:path*", headers: cache },
      { source: "/banners/:path*", headers: cache },
    ];
  },
};

export default nextConfig;

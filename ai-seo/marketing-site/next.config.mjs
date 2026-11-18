/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [];
  },
  // Per-company Baromètre fiches are sent to each organisation by email. They are
  // one-page variants of the same template, so they stay out of the index.
  async headers() {
    return [
      {
        source: '/barometre/fiches/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;

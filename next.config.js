// Eğitim sitesi ayrı bir projede yayınlanır; kayra.technology/egitim altında buradan sunulur.
const EGITIM_ORIGIN = process.env.EGITIM_ORIGIN || 'https://kayra-egitim.vercel.app'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/egitim', destination: `${EGITIM_ORIGIN}/egitim/index.html` },
      { source: '/egitim/:path*', destination: `${EGITIM_ORIGIN}/egitim/:path*` },
    ]
  },
  images: {
    domains: ['localhost'],
    // Image optimization enabled for production
  },
  // Production optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig

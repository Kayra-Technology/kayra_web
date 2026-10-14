// Eğitim sitesi ayrı bir projede yayınlanır; kayra.technology/egitim altında buradan sunulur.
const EGITIM_ORIGIN = process.env.EGITIM_ORIGIN || 'https://kayra-egitim.vercel.app'
// Kariyer sayfası da ayrı projede (kayra-kariyer); kayra.technology/kariyer altında sunulur.
const KARIYER_ORIGIN = process.env.KARIYER_ORIGIN || 'https://kayra-kariyer.vercel.app'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/egitim', destination: `${EGITIM_ORIGIN}/egitim/index.html` },
      { source: '/egitim/:path*', destination: `${EGITIM_ORIGIN}/egitim/:path*` },
      { source: '/kariyer', destination: `${KARIYER_ORIGIN}/kariyer/index.html` },
      { source: '/kariyer/:path*', destination: `${KARIYER_ORIGIN}/kariyer/:path*` },
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

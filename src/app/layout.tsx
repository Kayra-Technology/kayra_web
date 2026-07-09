import type { Metadata } from 'next'
import { Exo_2, Inter } from 'next/font/google'
import './globals.css'

/* Self-hosted at build time by next/font — no render-blocking request to
   Google Fonts at runtime. latin-ext covers the Turkish strings (İTÜ etc.). */
const exo2 = Exo_2({ subsets: ['latin', 'latin-ext'], variable: '--font-exo2', display: 'swap' })
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://kayra.technology'),
  title: 'Kayra Technology | Autonomous Mastery of the Seas',
  description: 'Cutting-edge autonomous maritime systems by Kayra Technology',
  keywords: 'USV, Unmanned Surface Vehicle, Maritime Technology, Autonomous Vessels, Marine Technology, Defense Systems',
  openGraph: {
    title: 'Kayra Technology | Autonomous Mastery of the Seas',
    description: 'Cutting-edge autonomous maritime systems by Kayra Technology',
    url: 'https://kayra.technology',
    siteName: 'Kayra Technology',
    images: [{ url: '/images/hero-bg.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${exo2.variable} ${inter.variable}`}>
      <body className="antialiased lacquer-navy-full">
        {children}
      </body>
    </html>
  )
}

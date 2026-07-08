import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body className="antialiased lacquer-navy-full">
        {children}
      </body>
    </html>
  )
}

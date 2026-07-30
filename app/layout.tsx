import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/shared/NavBar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Infinite Architecture — Biophilic Design & Project Coordination',
    template: '%s — Infinite Architecture',
  },
  description:
    'Biophilic concept design, 3D visualization, and coordinated project delivery for Airbnbs, glamping retreats, off-grid properties, landowners, and real-estate teams in Puerto Vallarta.',
  keywords: [
    'biophilic design Puerto Vallarta',
    'Airbnb design Puerto Vallarta',
    'glamping design Mexico',
    'off-grid design',
    '3D real estate visualization',
    'project coordination Puerto Vallarta',
    'dome design',
    'natural building',
    'climate-responsive architecture',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Infinite Architecture',
    title: 'Infinite Architecture — Build Places People Remember',
    description:
      'Biophilic concepts, 3D visualization, and coordinated delivery for Airbnbs, glamping retreats, and off-grid living.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Architecture — Build Places People Remember',
    description:
      'Biophilic concepts and coordinated project delivery in Puerto Vallarta.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-bg-base font-sans text-ia-text antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

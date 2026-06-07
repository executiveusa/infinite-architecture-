import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/shared/NavBar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Infinite Architecture',
    template: '%s — Infinite Architecture',
  },
  description:
    'Free open-source construction knowledge for foam, ferrocement, thin-shell concrete, and climate-aware DIY infrastructure. Puerto Vallarta material laboratory.',
  keywords: [
    'ferrocement',
    'foam construction',
    'XPS panels',
    'thin shell concrete',
    'barrel roof',
    'DIY construction',
    'Puerto Vallarta',
    'low cost building',
    'architecture',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Infinite Architecture',
    title: 'Infinite Architecture',
    description: 'Free construction knowledge. Open-source build systems. Puerto Vallarta material laboratory.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Architecture',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg-base text-ia-text antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

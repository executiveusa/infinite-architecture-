import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/shared/NavBar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Infinite Architecture — Site-to-Stay Strategy in Puerto Vallarta',
    template: '%s — Infinite Architecture',
  },
  description:
    'Turn land near Puerto Vallarta and Riviera Nayarit into a coherent nature-based hospitality concept before disconnected decisions get expensive.',
  keywords: [
    'biophilic design Puerto Vallarta',
    'glamping property strategy Puerto Vallarta',
    'glamping design Mexico',
    'off-grid design',
    'nature stay development Mexico',
    'site opportunity scan',
    'biophilic hospitality design',
    'climate-responsive architecture',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Infinite Architecture',
    title: 'Infinite Architecture — Know What Your Land Can Become',
    description:
      'Site-to-Stay strategy for nature-based hospitality properties in Puerto Vallarta and Riviera Nayarit.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Architecture — Site-to-Stay Strategy',
    description:
      'Know what your property can become before you build.',
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

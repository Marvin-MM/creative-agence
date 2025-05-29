// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { PageTransition } from '@/components/animations/page-transition'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Lumina Creative - Premium Design Agency',
    template: '%s | Lumina Creative'
  },
  description: 'Award-winning creative design agency specializing in branding, visual storytelling, and digital experiences that captivate and convert.',
  keywords: ['design agency', 'branding', 'visual storytelling', 'graphic design', 'creative studio'],
  authors: [{ name: 'Lumina Creative Team' }],
  creator: 'Lumina Creative',
  publisher: 'Lumina Creative',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lumina-creative.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lumina-creative.com',
    title: 'Lumina Creative - Premium Design Agency',
    description: 'Award-winning creative design agency specializing in branding, visual storytelling, and digital experiences.',
    siteName: 'Lumina Creative',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumina Creative - Premium Design Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumina Creative - Premium Design Agency',
    description: 'Award-winning creative design agency specializing in branding, visual storytelling, and digital experiences.',
    images: ['/images/twitter-image.jpg'],
    creator: '@luminacreative',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            <div className="relative min-h-screen bg-background">
              <Navigation />
              <PageTransition>
                <main className="relative">
                  {children}
                </main>
              </PageTransition>
              <Footer />
              <ScrollToTop />
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
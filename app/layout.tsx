import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'minilink',
  description: 'Fast, secure, and simple URL shortening service',
  url: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
  applicationCategory: 'UtlityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: 'minilink',
  },
};

export const metadata: Metadata = {
  title: 'minilink - Fast URL Shortener | Shorten Links Instantly',
  description:
    'Transform long URLs into short, shareable links in seconds. Fast, secure, and simple URL shortening service with click tracking and analytics.',
  keywords: [
    'URL shortener',
    'link shortener',
    'short links',
    'minilink',
    'shorten URL',
    'link management',
    'URL compression',
    'tiny URL',
    'short URL generator',
  ],
  authors: [{ name: 'minilink' }],
  creator: 'minilink',
  publisher: 'minilink',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: 'minilink - Fast URL Shortener',
    description: 'Transform long URLs into short, shareable links in seconds. Fast, secure, and simple.',
    siteName: 'minilink',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'minilink - URL Shortener', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@minilink',
    creator: '@minilink',
    title: 'minilink - Fast URL Shortener',
    description: 'Transform long URLs into short, shareable links in seconds. Fast, secure, and simple.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'minilink - URL Shortener', type: 'image/png' }],
  },
  icons: {
    icon: [
      { url: '/icon1.png', type: 'image/png' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  category: 'technology',
  classification: 'Business',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'minilink',
    'application-name': 'minilink',
    'msapplication-TileColor': '#000000',
    'theme-color': '#ffffff',
    sitemap: '/sitemap.xml',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position='top-center' richColors />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

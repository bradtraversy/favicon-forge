import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'FaviconForge – Free Favicon Generator (ICO & PNG) with Live Preview',
  description:
    'Instantly create beautiful, multi-size favicons from any PNG, JPG, SVG, or WEBP. Download as ICO or PNG. Live preview, transparent background, and modern UI. 100% free.',
  keywords:
    'favicon generator, free favicon, create favicon, favicon png, favicon ico, favicon preview, favicon download, favicon online, favicon tool, favicon maker',
  openGraph: {
    title:
      'FaviconForge – Free Favicon Generator (ICO & PNG) with Live Preview',
    description:
      'Instantly create beautiful, multi-size favicons from any PNG, JPG, SVG, or WEBP. Download as ICO or PNG. Live preview, transparent background, and modern UI. 100% free.',
    url: 'https://faviconforge.io',
    siteName: 'FaviconForge',
    images: [
      {
        url: 'https://faviconforge.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FaviconForge – Free Favicon Generator',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'FaviconForge – Free Favicon Generator (ICO & PNG) with Live Preview',
    description:
      'Instantly create beautiful, multi-size favicons from any PNG, JPG, SVG, or WEBP. Download as ICO or PNG. Live preview, transparent background, and modern UI. 100% free.',
    images: ['https://faviconforge.io/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

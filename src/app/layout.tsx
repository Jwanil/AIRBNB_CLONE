import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Mirashya Boutique Villa · Forest View Suite - Airbnb',
  description: 'Guesthouse in Panaji, Goa',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/AirbnbCerealVF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <Suspense>
          {children}
        </Suspense>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}

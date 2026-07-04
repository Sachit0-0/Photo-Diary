import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Navigation } from '@/components/navigation'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Photo Diary — Nepal Photography',
  description: 'A small, unsorted collection of photographs from Nepal and beyond.',
  keywords: ['photography', 'nepal', 'landscape', 'travel', 'documentary'],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} >
      <body className="font-sans antialiased bg-background text-foreground">
        <SmoothScroll>

          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}

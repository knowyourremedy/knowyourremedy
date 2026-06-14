import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import QuickNav from '@/components/QuickNav'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KnowYourRemedy — From the shelf to the root and everything in between',
  description: 'Clean ratings for everyday medicines, supplements, and remedies — plus essential oil safety. Honest always. No agenda.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
     <body style={{
        margin: 0,
        padding: 0,
        paddingBottom: '60px',
        backgroundColor: '#faf7f2',
        fontFamily: 'var(--font-inter), sans-serif',
        color: '#2d2d2d',
        lineHeight: '1.6'
      }}>
        <Nav />
        {children}
        <QuickNav />
      </body>
    </html>
  )
}
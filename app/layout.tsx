import { fonts } from './fonts'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodeCraft Studios',
  description: 'Building the future of digital experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fonts.sans.className}>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import CombinedProviders from '@/components/providers/combined-providers'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Foodhub',
  description: 'Foodhub - Restaurant & Supplier Management'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <CombinedProviders>
            {children}
            <Toaster />
          </CombinedProviders>
        </div>
      </body>
    </html>
  )
}

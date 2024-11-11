import Footer from '@/components/footer'
import Header from '@/domains/supplier/header'
import Navigation from '@/domains/supplier/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Foodhub - Supplier',
  description: 'Foodhub - Supplier Management'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      <div className="mt-16 ml-64">
        <main className="p-4">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

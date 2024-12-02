import Footer from '@/components/footer'
import Header from '@/domains/supplier/header'
import Navigation from '@/domains/supplier/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Foodhub - Supplier',
  description: 'Foodhub - Supplier Management'
}

export default async function SupplierLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      <div className="mt-16 lg:ml-64 min-h-[calc(100vh-4rem)] flex flex-col">
        <main className="p-4 bg-gray-100 flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

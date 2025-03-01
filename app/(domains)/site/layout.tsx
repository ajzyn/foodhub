import Footer from '@/components/footer'
import Header from './components/header'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-grow mt-10">{children}</main>
      <Footer />
    </>
  )
}

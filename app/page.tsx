import HeroSection from '@/domains/main/hero-section'
import RegisterSection from '@/domains/main/register-section'

export default async function Home() {
  return (
    <div className="mt-10">
      <RegisterSection />
      <HeroSection />
    </div>
  )
}

import HeroSection from '@/app/(domains)/site/components/hero-section'
import AboutSection from '@/app/(domains)/site/components/about-section'
import BenefitsSection from '@/app/(domains)/site/components/benefits-section'
import KeyFeaturesSection from '@/app/(domains)/site/components/key-features-section'

export default async function Home() {
  return (
    <main className="flex-grow pt-16">
      <HeroSection />
      <AboutSection />
      <KeyFeaturesSection />
      <BenefitsSection />
    </main>
  )
}

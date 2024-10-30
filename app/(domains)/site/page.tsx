import HeroSection from '@/domains/site/components/hero-section'
import AboutSection from '@/domains/site/components/about-section'
import BenefitsSection from '@/domains/site/components/benefits-section'
import KeyFeaturesSection from '@/domains/site/components/key-features-section'

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

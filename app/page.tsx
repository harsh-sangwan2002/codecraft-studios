import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import PortfolioGallery from "@/components/PortfolioGallery"
import PricingCalculator from "@/components/PricingCalculator"
import ServiceShowcase from "@/components/ServiceShowcase"
import TechStack from "@/components/TechStack"
import ThreeDShowcase from "@/components/ThreeDShowcase"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServiceShowcase />
      <TechStack />
      <PortfolioGallery />
      <ThreeDShowcase />
      <PricingCalculator />
      <ContactForm />
      <Footer />
    </main>
  )
}

import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import ServiceShowcase from "@/components/ServiceShowcase"
import TechStack from "@/components/TechStack"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServiceShowcase />
      <TechStack />
    </main>
  )
}

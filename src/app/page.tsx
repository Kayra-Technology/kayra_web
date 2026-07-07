import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FleetShowcase from '@/components/FleetShowcase'
import FleetGallery from '@/components/FleetGallery'
import TechSpecsBento from '@/components/TechSpecsBento'
import AutonomousEcosystem from '@/components/AutonomousEcosystem'
import MissionScenarios from '@/components/MissionScenarios'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <FleetShowcase />
      <FleetGallery />
      <AutonomousEcosystem />
      <TechSpecsBento />
      <MissionScenarios />
      <Footer />
    </main>
  )
}

import Navbar from '../components/shared/Navbar.jsx'
import Footer from '../components/shared/Footer.jsx'
import Hero from '../components/home/Hero.jsx'
import WhatIsRadiantAI from '../components/home/WhatIsRadiantAI.jsx'
import Platform from '../components/home/Platform.jsx'
import Solutions from '../components/home/Solutions.jsx'
import Infrastructure from '../components/home/Infrastructure.jsx'
import Enablers from '../components/home/Enablers.jsx'
import CaseStudy from '../components/home/CaseStudy.jsx'
import SocialProof from '../components/home/SocialProof.jsx'
import MarketCarousel from '../components/home/MarketCarousel.jsx'
import WhyRadiant from '../components/home/WhyRadiant.jsx'
import CTA from '../components/home/CTA.jsx'

const Divider = () => <div className="divider" />

export default function Index() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <Hero />
      <Divider />
      <WhatIsRadiantAI />
      <Divider />
      <Solutions />
      <Divider />
      <Platform />
      <Divider />
      <Infrastructure />
      <Divider />
      <Enablers />
      <Divider />
      <MarketCarousel />
      <Divider />
      <CaseStudy />
      <Divider />
      <SocialProof />
      <Divider />
      <WhyRadiant />
      <Divider />
      <CTA />
      <Footer variant="home" />
    </div>
  )
}

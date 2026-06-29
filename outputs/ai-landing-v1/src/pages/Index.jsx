import Navbar from '../components/shared/Navbar.jsx'
import Footer from '../components/shared/Footer.jsx'
import SectionNav from '../components/shared/SectionNav.jsx'
import Hero from '../components/home/Hero.jsx'
import WhatIsRadiantAI from '../components/home/WhatIsRadiantAI.jsx'
import Platform from '../components/home/Platform.jsx'
import Solutions from '../components/home/Solutions.jsx'
import Infrastructure from '../components/home/Infrastructure.jsx'
import Enablers from '../components/home/Enablers.jsx'
import CaseStudy from '../components/home/CaseStudy.jsx'
import SocialProof from '../components/home/SocialProof.jsx'
import MarketCarousel from '../components/home/MarketCarousel.jsx'
import CTA from '../components/home/CTA.jsx'
import AssessmentEntry from '../components/home/AssessmentEntry.jsx'

const Divider = () => <div className="divider" />

export default function Index() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <SectionNav />
      <Hero />
      <Divider />
      <AssessmentEntry />
      <Divider />
      <WhatIsRadiantAI />
      <Divider />
      <Solutions />
      <Divider />
      <Enablers />
      <Divider />
      <CaseStudy />
      <Divider />
      <SocialProof />
      <Divider />
      <MarketCarousel />
      <Divider />
      <Platform />
      <Divider />
      <Infrastructure />
      {/* CTA section hidden for now — re-enable by uncommenting */}
      {/* <Divider />
      <CTA /> */}
      <Footer variant="home" />
    </div>
  )
}

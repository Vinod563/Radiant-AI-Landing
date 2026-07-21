import Navbar from '../components/shared/Navbar.jsx'
import Footer from '../components/shared/Footer.jsx'
import SectionNav from '../components/shared/SectionNav.jsx'
import Hero from '../components/home/Hero.jsx'
import WhatIsRadiantAI from '../components/home/WhatIsRadiantAI.jsx'
import Platform from '../components/home/Platform.jsx'
import ProblemsWeSolve from '../components/home/ProblemsWeSolve.jsx'
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
      {/* 2. Problems We Solve */}
      <Divider />
      <ProblemsWeSolve />
      {/* 3. AI Fabric */}
      <Divider />
      <Enablers />
      {/* 4. Results: case study + proof stats */}
      <Divider />
      <CaseStudy />
      <Divider />
      <SocialProof />
      {/* 5. Industries */}
      <Divider />
      <MarketCarousel />
      {/* 6. Why Radiant Digital (moved below Industries) */}
      <Divider />
      <WhatIsRadiantAI />
      {/* 7. Free Assessment (moved down from position 2) */}
      <Divider />
      <AssessmentEntry />
      {/* 7. Platform */}
      <Divider />
      <Platform />
      <Divider />
      <Infrastructure />
      {/* 8. Contact routes to /chat (CTA section remains disabled) */}
      {/* <Divider />
      <CTA /> */}
      <Footer variant="home" />
    </div>
  )
}

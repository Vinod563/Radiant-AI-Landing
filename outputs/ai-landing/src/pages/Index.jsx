import Navbar from '../components/shared/Navbar.jsx'
import Footer from '../components/shared/Footer.jsx'
import Hero from '../components/home/Hero.jsx'
import WhatIsRadiantAI from '../components/home/WhatIsRadiantAI.jsx'
import Platform from '../components/home/Platform.jsx'
import Solutions from '../components/home/Solutions.jsx'
import Infrastructure from '../components/home/Infrastructure.jsx'
import CaseStudy from '../components/home/CaseStudy.jsx'
import SocialProof from '../components/home/SocialProof.jsx'
import CTA from '../components/home/CTA.jsx'

export default function Index() {
  return (
    <div className="bg-mag-black min-h-screen">
      <Navbar />
      <Hero />
      <div className="divider" />
      <WhatIsRadiantAI />
      <div className="divider" />
      <Solutions />
      <div className="divider" />
      <Platform />
      <div className="divider" />
      <Infrastructure />
      <CaseStudy />
      <SocialProof />
      <CTA />
      <Footer variant="home" />
    </div>
  )
}

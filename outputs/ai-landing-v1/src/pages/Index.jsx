import Navbar         from '../components/shared/Navbar.jsx'
import Footer         from '../components/shared/Footer.jsx'
import SectionNav     from '../components/shared/SectionNav.jsx'
import Hero           from '../components/home/Hero.jsx'
import WhatIsRadiantAI from '../components/home/WhatIsRadiantAI.jsx'
import Platform       from '../components/home/Platform.jsx'
import Solutions      from '../components/home/Solutions.jsx'
import Infrastructure from '../components/home/Infrastructure.jsx'
import Enablers       from '../components/home/Enablers.jsx'
import CaseStudy      from '../components/home/CaseStudy.jsx'
import SocialProof    from '../components/home/SocialProof.jsx'
import MarketCarousel from '../components/home/MarketCarousel.jsx'
import CTA            from '../components/home/CTA.jsx'
import { useSectionVisibility } from '../hooks/useSectionVisibility'

const Divider = () => <div className="divider" />

// Map section keys → components
const SECTION_MAP = {
  hero:            Hero,
  whatIsRadiantAI: WhatIsRadiantAI,
  solutions:       Solutions,
  enablers:        Enablers,
  caseStudy:       CaseStudy,
  socialProof:     SocialProof,
  marketCarousel:  MarketCarousel,
  platform:        Platform,
  infrastructure:  Infrastructure,
  cta:             CTA,
}

export default function Index() {
  const { ordered, ready } = useSectionVisibility()

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <SectionNav />

      {/* Show all sections until visibility config loads (avoids flash of empty) */}
      {!ready ? (
        Object.keys(SECTION_MAP).map((key, i) => {
          const Section = SECTION_MAP[key]
          return (
            <div key={key}>
              <Section />
              {i < Object.keys(SECTION_MAP).length - 1 && <Divider />}
            </div>
          )
        })
      ) : (
        ordered.map((key, i) => {
          const Section = SECTION_MAP[key]
          if (!Section) return null
          return (
            <div key={key}>
              <Section />
              {i < ordered.length - 1 && <Divider />}
            </div>
          )
        })
      )}

      <Footer variant="home" />
    </div>
  )
}

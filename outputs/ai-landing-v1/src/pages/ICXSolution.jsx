import { useEffect } from 'react'
import Navbar from '../components/shared/Navbar.jsx'
import Footer from '../components/shared/Footer.jsx'
import ICXHero from '../components/icx/ICXHero.jsx'
import ICXSocialProof from '../components/icx/ICXSocialProof.jsx'
import ICXProblem from '../components/icx/ICXProblem.jsx'
import ICXPlatform from '../components/icx/ICXPlatform.jsx'
import ICXMetrics from '../components/icx/ICXMetrics.jsx'
import ICXProcess from '../components/icx/ICXProcess.jsx'
import ICXArchitecture from '../components/icx/ICXArchitecture.jsx'
import ICXSPOG from '../components/icx/ICXSPOG.jsx'
import ICXExecutive from '../components/icx/ICXExecutive.jsx'
import ICXCaseStudy from '../components/icx/ICXCaseStudy.jsx'
import ICXSecurity from '../components/icx/ICXSecurity.jsx'
import ICXCTA from '../components/icx/ICXCTA.jsx'

const Divider = () => <div className="divider" />

export default function ICXSolution() {
  useEffect(() => {
    document.title = 'Enterprise ICX — 360° CX Intelligence | Radiant Digital'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <ICXHero />
      <Divider />
      <ICXSocialProof />
      <Divider />
      <ICXProblem />
      <Divider />
      <ICXPlatform />
      <Divider />
      <ICXMetrics />
      <Divider />
      <ICXProcess />
      <Divider />
      <ICXArchitecture />
      <Divider />
      <ICXSPOG />
      <Divider />
      <ICXExecutive />
      <Divider />
      <ICXCaseStudy />
      <Divider />
      <ICXSecurity />
      <Divider />
      <ICXCTA />
      <Footer variant="icx" />
    </div>
  )
}

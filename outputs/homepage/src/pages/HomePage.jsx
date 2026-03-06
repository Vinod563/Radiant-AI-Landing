import Navbar from '@/components/HomePage/Navbar';
import Hero from '@/components/HomePage/Hero';
import LogoMarquee from '@/components/HomePage/LogoMarquee';
import Services from '@/components/HomePage/Services';
import Stats from '@/components/HomePage/Stats';
import TransformationFramework from '@/components/HomePage/TransformationFramework';
import Accelerators from '@/components/HomePage/Accelerators';
import CaseStudies from '@/components/HomePage/CaseStudies';
import ClientLogos from '@/components/HomePage/ClientLogos';
import Testimonials from '@/components/HomePage/Testimonials';
import CTA from '@/components/HomePage/CTA';
import Footer from '@/components/HomePage/Footer';

const HomePage = () => {
  return (
    <main className="min-h-screen font-primary text-content-primary">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Stats />
      <Services />
      <TransformationFramework />
      <Accelerators />
      <CaseStudies />
      <ClientLogos />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default HomePage;

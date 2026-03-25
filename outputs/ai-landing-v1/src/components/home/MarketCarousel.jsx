import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Building2,
  Landmark,
  GraduationCap,
  HeartPulse,
  Radio,
  Fuel,
  ChevronLeft,
  ChevronRight,
  Shield,
  Banknote,

} from 'lucide-react'

const markets = [
  {
    title: 'Technology, Media and Telecom',
    icon: Radio,
    accent: '#596AE0',
    gradientFrom: '#1e2a6e',
    gradientTo: '#596AE0',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=900&fit=crop&q=80',
    clients: 'Major tier-1 carriers',
    desc: 'Radiant Digital has mapped 29 AI use cases across the full telecom operating model: from revenue assurance to network operations to sales velocity. Built on deep carrier context, not generic telecommunications patterns.',
    metrics: [
      { value: '29', label: 'AI Use Cases' },
      { value: '40%', label: 'Faster Deployment' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
  },
  {
    title: 'Healthcare and Life Sciences',
    icon: HeartPulse,
    accent: '#e05990',
    gradientFrom: '#7a2050',
    gradientTo: '#e05990',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=900&fit=crop&q=80',
    clients: 'NIH, MD Anderson, CHOP',
    desc: 'Privacy-first AI that scales clinical workflows and research operations: with HIPAA governance built in, not bolted on.',
    metrics: [
      { value: '35%', label: 'Cost Reduction' },
      { value: '70%', label: 'Less Manual Work' },
      { value: '30%', label: 'Ops Efficiency Gain' },
    ],
  },
  {
    title: 'Financial Services',
    icon: Banknote,
    accent: '#F0974E',
    gradientFrom: '#7a4a10',
    gradientTo: '#F0974E',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=900&fit=crop&q=80',
    clients: 'Navy Federal Credit Union, major BFSI enterprises',
    desc: 'AI for fraud detection, compliance automation, and customer journey transformation: with audit trails from day one.',
    metrics: [
      { value: '40%', label: 'Conversion Lift' },
      { value: '25%', label: 'CSAT Improvement' },
      { value: '70%', label: 'Sync Time Reduced' },
    ],
  },
  {
    title: 'Federal Government',
    icon: Landmark,
    accent: '#596AE0',
    gradientFrom: '#1a2060',
    gradientTo: '#596AE0',
    image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=600&h=900&fit=crop&q=80',
    clients: 'DoD, HHS, DHS, Treasury, Commerce, Interior',
    desc: 'Mission-critical enterprise transformation with program-grade delivery, human-in-the-loop governance, and federal compliance alignment.',
    metrics: [
      { value: '45%', label: 'Infra Cost Reduction' },
      { value: '40%', label: 'Faster Delivery' },
      { value: '70%', label: 'Ops Efficiency Gain' },
    ],
  },
  {
    title: 'State and Local Government',
    icon: Building2,
    accent: '#91C46B',
    gradientFrom: '#2a5018',
    gradientTo: '#91C46B',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=900&fit=crop&q=80',
    clients: 'FL DCF, FL DEO, FL DOT',
    desc: 'Citizen-centric transformation that delivers better outcomes on constrained budgets. Faster permitting, benefits processing, and case management: at scale.',
    metrics: [
      { value: '30%', label: 'Cost Savings' },
      { value: '70%', label: 'Faster Processing' },
      { value: '25%', label: 'Citizen CSAT Lift' },
    ],
  },
  {
    title: 'Education',
    icon: GraduationCap,
    accent: '#a855f7',
    gradientFrom: '#4a1880',
    gradientTo: '#a855f7',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=900&fit=crop&q=80',
    clients: 'UT Austin, Baylor University, research institutions',
    desc: 'AI-first campus transformation: research analytics, student outcomes, and FERPA-compliant data governance at scale.',
    metrics: [
      { value: '35%', label: 'Cost Reduction' },
      { value: '50%', label: 'Faster Data Access' },
      { value: '70%', label: 'Engagement Lift' },
    ],
  },
  {
    title: 'Oil and Gas',
    icon: Fuel,
    accent: '#F0974E',
    gradientFrom: '#5a3000',
    gradientTo: '#F0974E',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=900&fit=crop&q=80',
    clients: 'Halliburton, Noble Corporation, offshore operators',
    desc: 'Connected worker safety, predictive maintenance, and digital asset intelligence across remote and field operations.',
    metrics: [
      { value: '60%', label: 'Maintenance Uplift' },
      { value: '70%', label: 'Downtime Reduced' },
      { value: '99.9%', label: 'Safety Uptime' },
    ],
  },
  {
    title: 'Defense and Intelligence',
    icon: Shield,
    accent: '#2DD4BF',
    gradientFrom: '#0a3028',
    gradientTo: '#2DD4BF',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&h=900&fit=crop&q=80',
    clients: 'Department of Defense',
    desc: 'Mission-critical AI with zero-trust governance: humans orchestrate, never autonomous decisions in classified environments.',
    metrics: [
      { value: '40%', label: 'Faster Deployment' },
      { value: '99.9%', label: 'System Uptime' },
      { value: '35%', label: 'Infra Cost Savings' },
    ],
  },
]

export default function MarketCarousel() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [scrollPos, setScrollPos] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      setScrollPos(track.scrollLeft)
      setMaxScroll(track.scrollWidth - track.clientWidth)
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="bg-brand-dark py-32 lg:py-44 relative overflow-x-clip overflow-y-visible">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-brand-green font-body text-sm font-semibold tracking-widest uppercase mb-5">
            Industries
          </p>
          <h2 className="font-display font-bold text-display-xl text-text-primary mb-5">
            Built for Your{' '}
            <span className="text-brand-green">Domain</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Every industry has its own rules, risks, and opportunities.
            We bring enterprise transformation shaped by deep sector expertise:
            so you scale faster, with governance built in from the start.
          </p>
        </motion.div>

      </div>

      {/* Carousel track */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto overflow-y-visible py-10 px-6 lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {markets.map((market, i) => (
            <MarketCard key={market.title} market={market} index={i} />
          ))}
        </div>
      </motion.div>

      <style>{`
        div[style*="scrollbarWidth"]::-webkit-scrollbar { display: none; }
        .flip-card { perspective: 1000px; }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flip-card:hover {
          transform: scale(1.12);
          z-index: 10;
        }
        .flip-card:hover .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-front, .flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1.5rem;
          overflow: hidden;
        }
        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Navigation arrows — bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-center gap-4 mt-10"
      >
        <button
          onClick={() => scroll(-1)}
          disabled={scrollPos <= 5}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
            disabled:opacity-20 disabled:cursor-not-allowed"
          style={{
            background: scrollPos <= 5 ? 'rgba(255,255,255,0.05)' : 'rgba(145,196,107,0.15)',
            border: `1px solid ${scrollPos <= 5 ? 'rgba(255,255,255,0.08)' : 'rgba(145,196,107,0.3)'}`,
          }}
        >
          <ChevronLeft size={22} className={scrollPos <= 5 ? 'text-white/30' : 'text-brand-green'} />
        </button>
        <button
          onClick={() => scroll(1)}
          disabled={scrollPos >= maxScroll - 5}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
            disabled:opacity-20 disabled:cursor-not-allowed"
          style={{
            background: scrollPos >= maxScroll - 5 ? 'rgba(255,255,255,0.05)' : 'rgba(145,196,107,0.15)',
            border: `1px solid ${scrollPos >= maxScroll - 5 ? 'rgba(255,255,255,0.08)' : 'rgba(145,196,107,0.3)'}`,
          }}
        >
          <ChevronRight size={22} className={scrollPos >= maxScroll - 5 ? 'text-white/30' : 'text-brand-green'} />
        </button>
      </motion.div>
    </section>
  )
}

function MarketCard({ market }) {
  const Icon = market.icon

  return (
    <div
      className="flex-shrink-0 w-[320px] lg:w-[340px] h-[480px] lg:h-[520px] flip-card cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="flip-inner">
        {/* FRONT — Title, Icon, Cutout Image */}
        <div className="flip-front">
          <div
            className="w-full h-full flex flex-col"
            style={{
              background: `linear-gradient(160deg, ${market.gradientFrom} 0%, ${market.gradientTo} 100%)`,
            }}
          >
            {/* Top content */}
            <div className="relative z-10 p-7 lg:p-8">
              <h3 className="font-display font-bold text-white text-xl lg:text-2xl leading-snug mb-5 max-w-[240px] drop-shadow-sm">
                {market.title}
              </h3>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md"
                style={{
                  background: `${market.accent}25`,
                  border: `1.5px solid ${market.accent}50`,
                  boxShadow: `0 4px 20px ${market.accent}15`,
                }}
              >
                <Icon size={30} style={{ color: market.accent }} />
              </div>
            </div>

            {/* Cutout image area */}
            <div className="flex-1 relative mt-auto">
              {/* Curved cutout shape */}
              <div className="absolute inset-0 overflow-hidden">
                <svg
                  viewBox="0 0 340 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <clipPath id={`cutout-${market.title.replace(/\s+/g, '-')}`}>
                      <path d="M0 60 C80 0, 260 0, 340 60 L340 280 L0 280 Z" />
                    </clipPath>
                  </defs>
                </svg>
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'ellipse(85% 100% at 50% 100%)',
                  }}
                >
                  <img
                    src={market.image}
                    alt={market.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  {/* Subtle gradient overlay at top for blending */}
                  <div
                    className="absolute top-0 left-0 right-0 h-24"
                    style={{
                      background: `linear-gradient(to bottom, ${market.gradientTo}cc, transparent)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK — Metrics-driven with description & clients */}
        <div className="flip-back">
          <div
            className="w-full h-full flex flex-col p-7 lg:p-8"
            style={{
              background: `linear-gradient(160deg, ${market.gradientFrom} 0%, ${market.gradientFrom}ee 40%, ${market.gradientTo}88 100%)`,
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15"
              style={{ background: market.accent }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-10"
              style={{ background: market.accent }}
            />

            {/* Icon + Title */}
            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${market.accent}30`,
                  border: `1.5px solid ${market.accent}50`,
                }}
              >
                <Icon size={22} style={{ color: market.accent }} />
              </div>

              <h3 className="font-display font-bold text-white text-lg lg:text-xl leading-snug mb-3">
                {market.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                {market.desc}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="relative z-10 grid grid-cols-3 gap-2 mb-5">
              {market.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: `1px solid ${market.accent}30`,
                  }}
                >
                  <div
                    className="font-display font-bold text-xl lg:text-2xl leading-none mb-1"
                    style={{ color: market.accent }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-white/60 text-[10px] uppercase tracking-wider font-medium leading-tight">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Clients */}
            <div className="relative z-10">
              <div
                className="px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1 font-semibold">
                  Key Clients
                </div>
                <div className="text-white text-sm font-medium">
                  {market.clients}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

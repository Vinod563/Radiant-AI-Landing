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
  Banknote,
} from 'lucide-react'
import { markets as marketsData } from '../../data/siteContent.js'

/* Resolve icon string names to Lucide components */
const iconMap = { Radio, HeartPulse, Banknote, Landmark, Building2, GraduationCap, Fuel }

/* Component-only visual overrides */
const gradientOverrides = {
  'Technology, Media and Telecom': { gradientFrom: '#1e2a6e', gradientTo: '#596AE0' },
  'Healthcare and Life Sciences': { gradientFrom: '#7a2050', gradientTo: '#e05990' },
  'Financial Services': { gradientFrom: '#7a4a10', gradientTo: '#F0974E' },
  'Federal Government': { gradientFrom: '#1a2060', gradientTo: '#596AE0' },
  'State and Local Government': { gradientFrom: '#2a5018', gradientTo: '#91C46B' },
  'Education': { gradientFrom: '#4a1880', gradientTo: '#a855f7' },
  'Oil and Gas': { gradientFrom: '#5a3000', gradientTo: '#F0974E' },
}

const markets = marketsData.map(m => ({
  ...m,
  icon: iconMap[m.icon] || Radio,
  ...gradientOverrides[m.title],
}))

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
    <section id="industries" ref={sectionRef} className="bg-brand-dark py-32 lg:py-44 relative overflow-x-clip overflow-y-visible">
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
          <ChevronLeft size={22} className={scrollPos <= 5 ? 'text-white/50' : 'text-brand-green'} />
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
          <ChevronRight size={22} className={scrollPos >= maxScroll - 5 ? 'text-white/50' : 'text-brand-green'} />
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
            <div className="relative z-10 grid grid-cols-3 gap-1.5 mb-5">
              {market.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg px-1.5 py-2.5 text-center"
                  style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: `1px solid ${market.accent}30`,
                  }}
                >
                  <div
                    className="font-display font-bold text-base leading-none mb-1"
                    style={{ color: market.accent }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-white/60 text-[7px] uppercase tracking-wider font-semibold leading-[1.3]"
                    style={{ wordBreak: 'break-word', hyphens: 'auto' }}>
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
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1 font-semibold">
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

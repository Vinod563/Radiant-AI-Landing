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
    title: 'Telecom, Media & Technology',
    icon: Radio,
    accent: '#596AE0',
    gradientFrom: '#1e2a6e',
    gradientTo: '#596AE0',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=900&fit=crop&q=80',
    clients: 'Verizon, Major TMT Enterprises',
    desc: 'AI-driven network intelligence, service capacity scaling, and outage response optimization.',
  },
  {
    title: 'Healthcare & Life Science',
    icon: HeartPulse,
    accent: '#e05990',
    gradientFrom: '#7a2050',
    gradientTo: '#e05990',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=900&fit=crop&q=80',
    clients: 'NIH, MD Anderson, CHOP',
    desc: 'Clinical data analytics, patient experience platforms, and health management applications.',
  },
  {
    title: 'Financial Services & Insurance',
    icon: Banknote,
    accent: '#F0974E',
    gradientFrom: '#7a4a10',
    gradientTo: '#F0974E',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=900&fit=crop&q=80',
    clients: 'Navy Federal Credit Union',
    desc: 'Fraud detection, regulatory compliance automation, and customer experience transformation.',
  },
  {
    title: 'Federal Government',
    icon: Landmark,
    accent: '#596AE0',
    gradientFrom: '#1a2060',
    gradientTo: '#596AE0',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=900&fit=crop&q=80',
    clients: 'DoD, HHS, DHS, Treasury',
    desc: 'Mission-critical AI solutions with FedRAMP compliance and security clearance operations.',
  },
  {
    title: 'State & Local Government',
    icon: Building2,
    accent: '#91C46B',
    gradientFrom: '#2a5018',
    gradientTo: '#91C46B',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=900&fit=crop&q=80',
    clients: 'FL DCF, FL DEO, FL DOT',
    desc: 'Modernized citizen services, accountability systems, and disaster recovery planning.',
  },
  {
    title: 'Education',
    icon: GraduationCap,
    accent: '#a855f7',
    gradientFrom: '#4a1880',
    gradientTo: '#a855f7',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=900&fit=crop&q=80',
    clients: 'UT Austin, Baylor University',
    desc: 'Digital campus transformation, student experience platforms, and research data systems.',
  },
  {
    title: 'Oil & Gas',
    icon: Fuel,
    accent: '#F0974E',
    gradientFrom: '#5a3000',
    gradientTo: '#F0974E',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=900&fit=crop&q=80',
    clients: 'Halliburton',
    desc: 'Industrial IoT with Tracklynk, connected worker safety, and real-time asset tracking.',
  },
  {
    title: 'Defense & Intelligence',
    icon: Shield,
    accent: '#2DD4BF',
    gradientFrom: '#0a3028',
    gradientTo: '#2DD4BF',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&h=900&fit=crop&q=80',
    clients: 'Department of Defense',
    desc: 'Secure AI operations, classified environment automation, and mission support systems.',
  },
]

const CARD_WIDTH = 280
const GAP = 20

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
    const amount = (CARD_WIDTH + GAP) * 2
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="bg-mag-black py-28 lg:py-36 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(89,106,224,0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <span className="label label-dark">Industries We Serve</span>
            <h2 className="font-heading font-extrabold text-title text-white">
              Customized by{' '}
              <span className="text-brand-green">Market</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              disabled={scrollPos <= 5}
              className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center
                text-white/60 hover:text-white hover:border-brand-green/50 transition-all duration-300
                disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={scrollPos >= maxScroll - 5}
              className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center
                text-white/60 hover:text-white hover:border-brand-green/50 transition-all duration-300
                disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Carousel track */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide px-6 lg:px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]"
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .flip-card { perspective: 1000px; }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-front, .flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1rem;
          overflow: hidden;
        }
        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}

function MarketCard({ market }) {
  const Icon = market.icon

  return (
    <div
      className="flex-shrink-0 w-[280px] flip-card cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="h-[380px] flip-inner">
        {/* FRONT — Title, Icon, Cutout Image */}
        <div className="flip-front">
          <div
            className="w-full h-full flex flex-col"
            style={{
              background: `linear-gradient(160deg, ${market.gradientFrom} 0%, ${market.gradientTo} 100%)`,
            }}
          >
            <div className="relative z-10 p-6">
              <h3 className="font-heading font-bold text-white text-lg leading-snug mb-4 max-w-[200px]">
                {market.title}
              </h3>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm"
                style={{
                  background: `${market.accent}30`,
                  border: `1px solid ${market.accent}40`,
                }}
              >
                <Icon size={26} style={{ color: market.accent }} />
              </div>
            </div>

            {/* Cutout image */}
            <div className="flex-1 relative mt-auto">
              <div className="absolute inset-0 overflow-hidden">
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
                  <div
                    className="absolute top-0 left-0 right-0 h-20"
                    style={{
                      background: `linear-gradient(to bottom, ${market.gradientTo}cc, transparent)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK — Flat gradient with description & clients */}
        <div className="flip-back">
          <div
            className="w-full h-full flex flex-col p-6"
            style={{
              background: `linear-gradient(160deg, ${market.gradientFrom} 0%, ${market.gradientFrom}ee 40%, ${market.gradientTo}88 100%)`,
            }}
          >
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-15"
              style={{ background: market.accent }}
            />
            <div
              className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-10"
              style={{ background: market.accent }}
            />

            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: `${market.accent}30`,
                  border: `1px solid ${market.accent}50`,
                }}
              >
                <Icon size={22} style={{ color: market.accent }} />
              </div>

              <h3 className="font-heading font-bold text-white text-lg leading-snug mb-4">
                {market.title}
              </h3>

              <p className="text-white/90 text-sm leading-relaxed mb-6">
                {market.desc}
              </p>
            </div>

            <div className="flex-1" />

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
                <div className="text-white text-xs font-medium">
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

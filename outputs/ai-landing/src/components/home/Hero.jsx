import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Play, X } from 'lucide-react'
import { SparklesCore } from '@/components/ui/sparkles'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    setIsPlaying(true)
    setTimeout(() => videoRef.current?.play(), 100)
  }

  const handleClose = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <section className="relative flex flex-col bg-mag-black overflow-hidden">
      {/* Sparkles background */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          particleColor="#91C46B"
          speed={1}
          className="w-full h-full"
        />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(145,196,107,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Main content — centered single column */}
      <div className="flex-1 flex items-center pt-32 pb-16 lg:pt-40 lg:pb-20 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="label justify-center">Enterprise AI Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-extrabold text-hero text-white mb-8"
            >
              Deploy AI<br />
              in <span className="text-brand-green">6 Weeks.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mb-10"
            >
              Enterprise-grade AI built for scalability, compliance, and measurable impact — from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap justify-center gap-4 mb-14"
            >
              <a href="#solutions" className="btn-primary group">
                <span>Explore Solutions</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="btn-outline">Book a Demo</a>
            </motion.div>

            {/* Video section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10
                shadow-[0_32px_80px_rgba(0,0,0,0.5)] group">
                {/* Video thumbnail / gradient background */}
                <div className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(160deg, #141210 0%, #1a2a1e 30%, #2a4030 55%, #91C46B 100%)',
                  }}
                />

                {/* Wave decoration on thumbnail */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 960 540"
                  preserveAspectRatio="xMidYMid slice" fill="none">
                  <path d="M-50 350 Q200 150 450 280 Q700 410 960 200"
                    stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <path d="M-50 420 Q250 200 500 340 Q750 480 1010 260"
                    stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <ellipse cx="480" cy="270" rx="200" ry="200"
                    fill="rgba(145,196,107,0.06)" />
                </svg>

                {/* Video element (hidden until playing) */}
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isPlaying ? 'opacity-100 z-20' : 'opacity-0'
                  }`}
                  controls={isPlaying}
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/platform-demo.mp4" type="video/mp4" />
                </video>

                {/* Play button overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer"
                    onClick={handlePlay}>
                    {/* Play button */}
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 backdrop-blur-md
                      border border-white/20 flex items-center justify-center
                      group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 mb-6">
                      <Play size={32} className="text-white ml-1" fill="white" />
                    </div>
                    <span className="text-white/70 text-sm font-medium tracking-wide">
                      See How the Platform Works
                    </span>
                  </div>
                )}

                {/* Close button when playing */}
                {isPlaying && (
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60
                      backdrop-blur-sm flex items-center justify-center
                      hover:bg-black/80 transition-colors"
                  >
                    <X size={18} className="text-white" />
                  </button>
                )}
              </div>

              {/* Video caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-white/40 text-xs text-center mt-4 tracking-wide"
              >
                2 min overview — No sign-up required
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pb-8 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/30"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

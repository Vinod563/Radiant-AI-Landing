import { ArrowRight } from 'lucide-react'

/**
 * Recommended next step + CTA. The CTA deep-links into the chat experience and
 * opens in a new tab so the user keeps their report open.
 * Props: nextStep { section, text, chat }  accent
 */
export default function NextStepCard({ nextStep, accent = '#91C46B' }) {
  return (
    <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${accent}26` }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 0%, ${accent}0c 0%, transparent 60%)` }} />
      <div className="relative z-10">
        <span className="kicker mb-4">Your Recommended Next Step</span>
        <div className="text-[11px] font-display font-semibold uppercase tracking-widest text-text-muted mb-3">
          Priority: {nextStep.section}
        </div>
        <p className="text-text-secondary text-base lg:text-lg leading-[1.8] max-w-2xl mb-8">{nextStep.text}</p>

        <a href={`/chat?q=${encodeURIComponent(nextStep.chat)}`} target="_blank" rel="noopener noreferrer"
          className="btn-primary !px-7 !py-3.5 justify-center w-full sm:w-auto inline-flex">
          {nextStep.chat} <ArrowRight size={15} />
        </a>
      </div>
    </div>
  )
}

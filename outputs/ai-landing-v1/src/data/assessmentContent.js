/**
 * Shared assessment marketing content.
 *
 * Lifted from the orphaned AIReadinessWidget in components/home/CTA.jsx so the
 * homepage entry section, the assessment hub, and the chat options all draw
 * from one source.
 */
import { Brain, Sparkles, BarChart3, Target, TrendingUp, Shield } from 'lucide-react'

// Five maturity levels (used as the homepage scale + AI stage-meter framing)
export const readinessLevels = [
  { label: 'Reactive', desc: 'Manual processes, siloed data', color: '#F05030' },
  { label: 'Emerging', desc: 'Basic analytics, some automation', color: '#F0974E' },
  { label: 'Defined', desc: 'Unified data, journey mapping', color: '#596AE0' },
  { label: 'Optimized', desc: 'AI-driven, proactive CX', color: '#91C46B' },
  { label: 'Leading', desc: 'Agentic AI, outcome-linked', color: '#00c87d' },
]

export const readinessBenefits = [
  { icon: BarChart3, text: 'Benchmark against industry leaders' },
  { icon: Target, text: 'Identify your biggest gaps' },
  { icon: TrendingUp, text: 'Get a prioritized roadmap' },
  { icon: Shield, text: 'Receive your score in minutes' },
]

// The two assessments — single source for hub cards, homepage buttons, chat options.
export const assessments = [
  {
    key: 'ai',
    icon: Brain,
    accent: '#91C46B',
    route: '/assessment/ai',
    eyebrow: 'AI Adoption Assessment',
    title: 'How AI-ready is your organization?',
    desc: 'A role-adaptive diagnostic across strategy, data, people, and adoption. Get your stage, per-dimension scores, specific findings, and a recommended next step.',
    duration: '10–15 min',
    meta: ['Role-adaptive', '6 stages', 'Instant report'],
    chatQuery: 'How AI-ready is my organization?',
  },
  {
    key: 'cx',
    icon: Sparkles,
    accent: '#596AE0',
    route: '/assessment/cx',
    eyebrow: 'CX Maturity Assessment',
    title: 'How mature is your customer experience?',
    desc: 'Evaluate CX maturity across vision & strategy, governance & metrics, and culture. Get your maturity level and practical insights to guide your next steps.',
    duration: '3–5 min',
    meta: ['3 dimensions', 'Maturity level', 'Tailored solution'],
    chatQuery: 'Assess my CX maturity',
  },
]

export const entryContent = {
  eyebrow: 'Free Assessment',
  headline: 'Where does your enterprise stand?',
  subtext: 'Two short diagnostics — AI adoption and CX maturity. No signup. A prioritized read on where you are, where the gaps are, and which moves produce the fastest results.',
  note: 'Free · No signup required · Results in minutes',
}

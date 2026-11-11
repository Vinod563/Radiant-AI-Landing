import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import RadiantLogo from '../shared/RadiantLogo'

/**
 * Stripped header shown while someone is taking an assessment: logo plus an
 * exit link. The full marketing nav (including its "Assess Your AI and CX
 * Readiness" CTA) is only shown on the results screen.
 * Progress is saved as the person answers (useAssessmentProgress), so the exit
 * link can honestly say "Save and exit" once questions have started.
 */
export default function AssessmentHeader({ exitLabel = 'Exit' }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4 bg-brand-dark/[0.96] backdrop-blur-2xl border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center no-underline" aria-label="Radiant AI home">
          <RadiantLogo height={22} />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/"
            className="inline-flex items-center gap-2 text-sm font-display font-semibold text-text-secondary hover:text-ink transition-colors no-underline px-3 py-2 rounded-lg hover:bg-ink/[0.04]">
            {exitLabel} <LogOut size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  )
}

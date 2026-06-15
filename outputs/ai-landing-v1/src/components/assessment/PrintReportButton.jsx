import { Printer } from 'lucide-react'

/**
 * Print / Save-as-PDF button for assessment results.
 * Marked no-print so it doesn't appear in the printed report itself.
 */
export default function PrintReportButton({ className = '' }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`no-print inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-semibold text-text-secondary hover:text-white transition-colors ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Printer size={15} /> Print / Save PDF
    </button>
  )
}

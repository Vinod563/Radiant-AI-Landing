import { motion } from 'framer-motion'
import { Lock, FileText, Sparkles, CheckCircle2, Plus } from 'lucide-react'

/**
 * ReportPreviewTeaser: sits directly above the lead-capture gate.
 *
 * Purpose: make the gated report look (and read) like it contains
 * substantially more value than the free preview above it, so the
 * lead form feels like a fair trade rather than a paywall.
 *
 * Two parts:
 *   1. A visual "thumbnail" mockup of the full report, a shrunken,
 *      partially-blurred document preview with a lock badge. This is
 *      illustrative chrome (not a live render) so it works identically
 *      for every visitor regardless of their actual score.
 *   2. A side-by-side "What you've seen / What's in the full report"
 *      comparison, ending in a line that quantifies the gap.
 *
 * Props:
 *   kind          'ai' | 'cx'
 *   accent        hex color string
 *   stageLabel    e.g. "Stage 3, Adopt" or "Developing"
 *   previewItems  string[]: what's already visible above (optional, has defaults)
 *   fullItems     string[]: what unlocks in the full report (optional, has defaults)
 */
export default function ReportPreviewTeaser({
  kind = 'ai',
  accent = '#91C46B',
  stageLabel = '',
  previewItems,
  fullItems,
}) {
  const isAi = kind === 'ai'

  const defaultPreview = isAi
    ? [
        'Your stage on the 6-stage AI autonomy scale',
        'Headline scores across 4 dimensions',
        'Where you sit vs. AI leaders (snapshot)',
      ]
    : [
        'Your overall CX maturity level',
        'Headline scores across 3 dimensions',
      ]

  const defaultFull = isAi
    ? [
        'Full write-up of your top 3 strengths and top 3 gaps, dimension by dimension',
        "Radiant's editorial read on exactly what your stage means and what tends to go wrong next",
        'One prioritized next step with the reasoning behind it, not a generic checklist',
        'Competitive positioning detail vs. AI leaders in your specific sector',
        'Saved as a PDF you can share with your leadership team',
      ]
    : [
        'Per-dimension breakdown across Vision, Governance, and Culture',
        "Radiant's read on what your maturity level means in practice",
        'A solution recommendation matched to where you are today',
        'Relevant case studies from organizations at your stage',
        'Saved as a PDF you can share with your leadership team',
      ]

  const preview = previewItems || defaultPreview
  const full = fullItems || defaultFull

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="mag-card p-6 lg:p-8"
    >
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={14} style={{ color: accent }} />
        <span className="kicker" style={{ color: accent }}>What's behind the form</span>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-7 lg:gap-9 items-start">
        {/* ── Thumbnail mockup ──────────────────────────────────────────── */}
        <div className="mx-auto lg:mx-0 w-[180px] lg:w-full max-w-[220px] select-none">
          <ReportThumbnail accent={accent} stageLabel={stageLabel} isAi={isAi} />
          <div className="text-center mt-3">
            <span
              className="text-[11px] font-display font-semibold px-2.5 py-1 rounded-full inline-block"
              style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}30` }}
            >
              {isAi ? '6-section full report' : '5-section full report'}
            </span>
          </div>
        </div>

        {/* ── Comparison copy ───────────────────────────────────────────── */}
        <div>
          <h3 className="font-display font-black text-white text-lg lg:text-xl tracking-tight mb-2">
            The preview above is a fraction of what you get.
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xl">
            Everything you've seen on this page is the headline version. The full report goes
            dimension-by-dimension with Radiant's actual analysis of your answers, most readers
            tell us the free preview is maybe a fifth of the detail.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* What you've seen */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[11px] font-display font-bold uppercase tracking-widest text-text-muted mb-3">
                Free preview (above)
              </div>
              <ul className="space-y-2.5">
                {preview.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                    <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5 opacity-60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's in the full report */}
            <div
              className="rounded-xl p-4"
              style={{ background: `${accent}0d`, border: `1px solid ${accent}35` }}
            >
              <div className="text-[11px] font-display font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                Full report (unlocks below)
              </div>
              <ul className="space-y-2.5">
                {full.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/85 leading-relaxed">
                    <Plus size={13} className="flex-shrink-0 mt-0.5" style={{ color: accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Thumbnail mockup ─────────────────────────────────────────────────────────
// A static illustrative preview of the report document, not a live render,
// used purely as a visual cue that a longer, more detailed document exists.
function ReportThumbnail({ accent, stageLabel, isAi }) {
  return (
    <div className="relative">
      {/* Drop shadow card behind, for stacked-pages depth */}
      <div
        className="absolute inset-0 rounded-lg translate-x-2 translate-y-2 -rotate-2"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      />
      <div
        className="relative rounded-lg overflow-hidden rotate-[-1deg]"
        style={{ background: '#fff', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 32px -12px rgba(0,0,0,0.55)' }}
      >
        {/* mini header band */}
        <div style={{ background: '#010F1E' }} className="px-3 pt-3 pb-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
              <div className="h-1.5 w-10 rounded-full bg-white/70" />
            </div>
            <div className="h-1.5 w-5 rounded-full bg-white/20" />
          </div>
          <div className="h-2.5 w-[85%] rounded-full bg-white/90 mb-1.5" />
          <div className="h-2.5 w-[55%] rounded-full" style={{ background: accent }} />
        </div>

        {/* mock score bars */}
        <div className="px-3 pt-3 space-y-2">
          {[0.8, 0.55, 0.7, 0.4].map((w, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <div className="h-1 w-8 rounded-full bg-slate-300" />
                <div className="h-1 w-3 rounded-full bg-slate-300" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${w * 100}%`, background: accent, opacity: 0.85 }} />
              </div>
            </div>
          ))}
        </div>

        {/* blurred lower content, fading to a lock */}
        <div className="relative mt-3 px-3 pb-3 pt-2">
          <div className="space-y-1.5" style={{ filter: 'blur(2.5px)', opacity: 0.55 }}>
            <div className="h-1.5 w-full rounded-full bg-slate-200" />
            <div className="h-1.5 w-[90%] rounded-full bg-slate-200" />
            <div className="h-1.5 w-full rounded-full bg-slate-200" />
            <div className="h-1.5 w-[70%] rounded-full bg-slate-200" />
            <div className="h-1.5 w-[80%] rounded-full bg-slate-200" />
            <div className="h-1.5 w-[60%] rounded-full bg-slate-200" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 70%)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mt-4"
              style={{ background: `${accent}1a`, border: `1.5px solid ${accent}55` }}
            >
              <Lock size={13} style={{ color: accent }} />
            </div>
          </div>
        </div>
      </div>

      {/* "more pages behind it" cue */}
      <div className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: '#0B1726', border: `1.5px solid ${accent}`, boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
        <FileText size={12} style={{ color: accent }} />
      </div>
    </div>
  )
}

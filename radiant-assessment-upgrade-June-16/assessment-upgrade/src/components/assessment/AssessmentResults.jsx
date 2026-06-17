import { useMemo, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle2, ExternalLink, Download } from 'lucide-react'
import StageReveal from './StageReveal'
import ScoreBars from './ScoreBars'
import DimensionTable from './DimensionTable'
import MaturityStaircase from './MaturityStaircase'
import GartnerPositioningView from './GartnerPositioningView'
import WhatAILeadersDo from './WhatAILeadersDo'
import ReportPreviewTeaser from './ReportPreviewTeaser'
import AssessmentLeadForm from './AssessmentLeadForm'
import HTMLReportViewer from './HTMLReportViewer'
import { buildEmailSafeReportHtml } from '../../utils/emailSafeReport.js'
import { getAQ, scoreAssessment, buildFindings, recommendNextStep } from '../../data/aiAssessment.js'
import { scoreCx, cxLevels } from '../../data/cxAssessment.js'

/**
 * AssessmentResults — shared results component for both AI Adoption and CX Maturity.
 *
 * FREE preview (visible to all):
 *   AI:  StageReveal → ScoreBars → MaturityStaircase → GartnerPositioningView → WhatAILeadersDo → teaser → gate
 *   CX:  StageReveal (level) → DimensionTable → teaser → gate
 *
 * GATED (unlocked after lead form):
 *   - PDF generated client-side and downloaded immediately (primary, guaranteed delivery —
 *     doesn't depend on the email backend at all)
 *   - Backend also receives the lead + an email-safe HTML version of the report
 *     (table-based, inline-styled) so it can be embedded directly in the email body —
 *     this is the practical fallback for email providers like Web3Forms that can't
 *     send attachments. The raw PDF bytes (base64) are sent too, for providers that
 *     *can* attach files.
 *   - "View report online" still opens the richer in-app HTMLReportViewer modal as a bonus.
 *
 * Props: kind ('ai'|'cx'), profile, answers
 */
export default function AssessmentResults({ kind, profile, answers }) {
  const isAi = kind === 'ai'
  const ACCENT = isAi ? '#91C46B' : '#596AE0'

  const [submitted, setSubmitted] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [sentTo, setSentTo] = useState('')
  const [emailDelivered, setEmailDelivered] = useState(false)
  const [redownloading, setRedownloading] = useState(false)

  const gateRef = useRef(null)

  // ── Scoring ───────────────────────────────────────────────────────────────
  const result = useMemo(() => {
    if (isAi) {
      const scored = scoreAssessment(answers, getAQ(profile.role))
      return {
        ...scored,
        findings: buildFindings(scored.sectionAverages),
        nextStep: recommendNextStep(scored.sectionAverages),
      }
    }
    const scored = scoreCx(answers)
    const lvl = cxLevels[scored.overallKey]
    return {
      ...scored,
      reveal: { name: lvl.name, index: lvl.index, tagline: lvl.tagline, description: lvl.description },
    }
  }, [isAi, profile, answers])

  const assessment = isAi ? 'AI Adoption' : 'CX Maturity'
  const headline = isAi
    ? `Your result: Stage ${result.stage.index} — ${result.stage.name}.`
    : `Your result: ${result.overallLevel}.`
  const teaserStageLabel = isAi
    ? `Stage ${result.stage.index} — ${result.stage.name}`
    : result.overallLevel

  const scrollToGate = () =>
    gateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  // ── Report delivery ───────────────────────────────────────────────────────
  // PDF is the primary deliverable — it's generated and downloaded client-side,
  // so it works even if the email backend is down or can't carry attachments.
  // The backend call is best-effort: it gets the lead, the raw PDF (base64, for
  // providers that support attachments), and an email-safe HTML fallback (for
  // providers like Web3Forms that only support text/HTML in the message body).
  const sendReport = async (lead) => {
    const { getReportPdfBase64, generateReportPdf } = await import('../../utils/generateReportPdf.js')
    const { base64, filename } = getReportPdfBase64({ kind, profile, answers })
    const emailHtml = buildEmailSafeReportHtml({ kind, profile, result })

    let delivered = false
    try {
      const apiUrl = import.meta.env.VITE_CHAT_API_URL || ''
      const res = await fetch(`${apiUrl}/api/assessment-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          assessment,
          headline,
          // Preferred: real attachment, for backends/providers that support it.
          pdfBase64: base64,
          pdfFilename: filename,
          // Fallback: full report embedded directly in the email body —
          // this is what Web3Forms (text-only) should use today.
          emailHtml,
          emailHtmlFilename: `radiant-${kind}-assessment-report.html`,
        }),
      })
      delivered = res.ok
    } catch {
      delivered = false
    }

    // Guaranteed path: trigger the PDF download locally right now, regardless
    // of whether the email backend succeeded. This is what makes PDF the real
    // primary output instead of something that only works if email does.
    generateReportPdf({ kind, profile, answers })

    setSentTo(lead.email)
    setEmailDelivered(delivered)
    setSubmitted(true)
  }

  const redownloadPdf = async () => {
    setRedownloading(true)
    try {
      const { generateReportPdf } = await import('../../utils/generateReportPdf.js')
      generateReportPdf({ kind, profile, answers })
    } finally {
      setRedownloading(false)
    }
  }

  const defaults = {
    name: profile?.fullName || '',
    email: profile?.workEmail || '',
    company: profile?.companyName || '',
    sector: profile?.sector || '',
    orgSize: profile?.orgSize || '',
    department: profile?.department || '',
  }

  return (
    <>
      {/* ── HTML Report Modal (secondary "view online" option) ───────────── */}
      <HTMLReportViewer
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        kind={kind}
        profile={profile}
        result={result}
        sentTo={emailDelivered ? sentTo : ''}
      />

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between no-print">
          <span className="text-text-muted text-xs font-display font-semibold uppercase tracking-widest">
            {isAi ? 'AI Adoption Report' : 'CX Maturity Report'}
          </span>
          {!submitted && (
            <button
              type="button"
              onClick={scrollToGate}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-semibold transition-colors"
              style={{ background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40`, color: ACCENT }}
            >
              <FileText size={15} /> Get full report
            </button>
          )}
          {submitted && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={redownloadPdf}
                disabled={redownloading}
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-display font-semibold transition-colors text-text-muted hover:text-white disabled:opacity-50"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <Download size={15} /> PDF
              </button>
              <button
                type="button"
                onClick={() => setReportOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-semibold transition-colors"
                style={{ background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40`, color: ACCENT }}
              >
                <ExternalLink size={15} /> View online
              </button>
            </div>
          )}
        </div>

        {/* ── FREE PREVIEW ─────────────────────────────────────────────── */}

        {/* Card 1 — maturity reveal */}
        {isAi
          ? <StageReveal stage={result.stage} accent={ACCENT} />
          : <StageReveal stage={result.reveal} accent={ACCENT} total={3} kicker="Your CX Maturity Level" prefix="" />}

        {/* Card 2 — score breakdown */}
        {isAi
          ? <ScoreBars sectionAverages={result.sectionAverages} />
          : <DimensionTable dimensions={result.dimensions} compact />}

        {/* AI-only: Staircase + Positioning + Leader Guidance */}
        {isAi && (
          <>
            {/* Card 3 — 5-stage staircase */}
            <MaturityStaircase currentIndex={result.stage.index} accent={ACCENT} />

            {/* Card 4 — Gartner positioning */}
            <GartnerPositioningView
              sectionAverages={result.sectionAverages}
              companyName={profile?.companyName || 'Your Organization'}
              accent={ACCENT}
            />

            {/* Card 5 — What AI leaders do */}
            <WhatAILeadersDo currentIndex={result.stage.index} accent={ACCENT} />
          </>
        )}

        {/* Card 6 — preview vs. full report teaser (only before the gate is unlocked) */}
        {!submitted && (
          <ReportPreviewTeaser kind={kind} accent={ACCENT} stageLabel={teaserStageLabel} />
        )}

        {/* ── GATE ─────────────────────────────────────────────────────── */}
        <div ref={gateRef} className="scroll-mt-24">
          {submitted ? (
            <ConfirmationCard
              accent={ACCENT}
              assessment={assessment}
              sentTo={sentTo}
              emailDelivered={emailDelivered}
              onOpenReport={() => setReportOpen(true)}
              onRedownload={redownloadPdf}
              redownloading={redownloading}
            />
          ) : (
            <AssessmentLeadForm
              accent={ACCENT}
              title="Get your full assessment report"
              body={
                isAi
                  ? "Unlock a complete read of your AI maturity — your specific strengths, gap analysis, Radiant's strategic perspective, and the highest-leverage action to take next."
                  : "Unlock a complete read of your CX maturity — dimension-level analysis, recommended solution, and case studies matched to your context."
              }
              bullets={
                isAi
                  ? [
                      'Full findings: your top 3 strengths and top 3 gaps by dimension',
                      'Radiant\'s strategic read — editorial perspective on your stage',
                      'One prioritized next step with rationale',
                      'Competitive positioning vs. AI leaders in your sector',
                      'Downloaded instantly as a PDF, with a copy by email',
                    ]
                  : [
                      'Per-dimension breakdown: Vision, Governance, Culture',
                      'Radiant\'s read at your maturity level',
                      'Experience AI recommendation tailored to where you are',
                      'Relevant case studies matched to your context',
                      'Downloaded instantly as a PDF, with a copy by email',
                    ]
              }
              defaults={defaults}
              submitLabel="Get my full PDF report"
              onSend={sendReport}
            />
          )}
        </div>
      </div>
    </>
  )
}

// ── Confirmation card ─────────────────────────────────────────────────────────

function ConfirmationCard({ accent, assessment, sentTo, emailDelivered, onOpenReport, onRedownload, redownloading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mag-card p-8 lg:p-10 text-center"
    >
      <div
        className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
        style={{ background: `${accent}1f`, border: `1px solid ${accent}40` }}
      >
        <CheckCircle2 size={26} style={{ color: accent }} />
      </div>

      <h3 className="font-display font-black text-white text-xl lg:text-2xl tracking-tight mb-2">
        Your full PDF report is downloading
      </h3>

      <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto mb-6">
        It should land in your downloads folder now.{' '}
        {sentTo ? (
          emailDelivered ? (
            <>A copy is also on its way to <span className="text-white font-semibold">{sentTo}</span>.</>
          ) : (
            <>We couldn't confirm delivery to <span className="text-white font-semibold">{sentTo}</span> — use the buttons below if you need another copy.</>
          )
        ) : null}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRedownload}
          disabled={redownloading}
          className="btn-primary !px-8 !py-3.5 text-sm inline-flex items-center gap-2 disabled:opacity-60"
          style={{ background: accent, borderColor: accent }}
        >
          <Download size={15} />
          {redownloading ? 'Preparing…' : 'Download PDF again'}
        </button>
        <button
          type="button"
          onClick={onOpenReport}
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-display font-semibold transition-colors text-white"
          style={{ border: '1px solid rgba(255,255,255,0.16)' }}
        >
          <ExternalLink size={15} />
          View report online
        </button>
      </div>

      <p className="text-text-muted text-xs mt-5">
        Prefer to read it in-browser first? "View report online" opens the same findings without leaving the page.
      </p>
    </motion.div>
  )
}

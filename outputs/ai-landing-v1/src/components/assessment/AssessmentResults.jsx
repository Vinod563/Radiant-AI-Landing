import { useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, X } from 'lucide-react'
import StageReveal from './StageReveal'
import ScoreBars from './ScoreBars'
import { STAGES as AI_STAGES } from './MaturityStaircase'
import GartnerPositioningView from './GartnerPositioningView'
import WhatAILeadersDo from './WhatAILeadersDo'
import AssessmentLeadForm from './AssessmentLeadForm'
import LockedReport from './LockedReport'
import { buildEmailSafeReportHtml } from '../../utils/emailSafeReport.js'
import { getAQ, scoreAssessment, buildFindings, recommendNextStep } from '../../data/aiAssessment.js'
import { suggestedNextSteps } from '../../data/reportEditorial.js'
import {
  getCxQuestions, scoreCx, buildCxFindings, recommendCxNextStep, cxPositioningRead,
  sections as cxSections, departments as cxDepartments, STAGE_LADDER as CX_STAGES, TOTAL_STAGES as CX_TOTAL, CX_POSITION_CLUSTERS,
} from '../../data/cxAssessment.js'
import { cxSuggestedNextSteps, CX_LEADER_CONTENT } from '../../data/cxReportEditorial.js'

// Lead-form copy per assessment (the CX list mirrors the AI one).
const LEAD_BULLETS = {
  ai: [
    'Full findings: your top 3 strengths and top 3 gaps by dimension',
    'Radiant Digital\'s strategic read, editorial perspective on your stage',
    'One prioritized next step with rationale',
    'Competitive positioning vs. AI leaders in your sector',
  ],
  cx: [
    'Full findings: your strengths and gaps across all four CX dimensions',
    'Radiant Digital\'s strategic read, editorial perspective on your stage',
    'One prioritized next step, with a 60-day sprint plan',
    'Competitive positioning vs. CX leaders',
  ],
}

/**
 * AssessmentResults: shared results component for both AI Maturity and CX Maturity.
 *
 * FREE preview (visible to all):
 *   Both: StageReveal (with inline stage staircase) → ScoreBars → GartnerPositioningView → WhatAILeadersDo → gate
 *   (CX passes its own stages, dimensions, positioning read, and leader content)
 *
 * GATED (unlocked after lead form):
 *   - PDF generated client-side and downloaded immediately (primary, guaranteed delivery,
 *     doesn't depend on the email backend at all)
 *   - Backend also receives the lead + an email-safe HTML version of the report
 *     (table-based, inline-styled) so it can be embedded directly in the email body,
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
  const [unlockOpen, setUnlockOpen] = useState(false)
  const [sentTo, setSentTo] = useState('')
  const [emailDelivered, setEmailDelivered] = useState(false)

  const gateRef = useRef(null)

  // ── Scoring ───────────────────────────────────────────────────────────────
  const result = useMemo(() => {
    if (isAi) {
      const scored = scoreAssessment(answers, getAQ(profile.role))
      return {
        ...scored,
        findings: buildFindings(scored.sectionAverages),
        nextStep: recommendNextStep(scored.sectionAverages),
        suggested: suggestedNextSteps({
          role: profile.role,
          stageIndex: scored.stage.index,
          sectionAverages: scored.sectionAverages,
        }),
      }
    }
    const scored = scoreCx(answers, getCxQuestions(profile.role))
    return {
      ...scored,
      findings: buildCxFindings(scored.sectionAverages),
      nextStep: recommendCxNextStep(scored.sectionAverages),
      suggested: cxSuggestedNextSteps({ sectionAverages: scored.sectionAverages }),
      positioning: cxPositioningRead({ sectionAverages: scored.sectionAverages, stageIndex: scored.stage.index }),
    }
  }, [isAi, profile, answers])

  const assessment = isAi ? 'AI Maturity' : 'CX Maturity'
  const headline = `Your result: Stage ${result.stage.index}, ${result.stage.name}.`

  // ── Report delivery (email-only) ──────────────────────────────────────────
  // The full report is delivered by email as a well-formatted PDF (the vector
  // report from generateReportPdf, paginated with clean page breaks). Nothing is
  // downloaded in the browser, on submit we POST the lead + the PDF (base64) +
  // an email-safe HTML fallback to the backend, which emails it to the
  // respondent and notifies the Radiant team.
  const sendReport = async (lead) => {
    const { getReportPdfBase64 } = await import('../../utils/generateReportPdf.js')
    const { base64, filename } = await getReportPdfBase64({ kind, profile, answers })
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
          pdfBase64: base64,
          pdfFilename: filename,
          // HTML fallback for text-only email providers
          emailHtml,
          emailHtmlFilename: `radiant-${kind}-assessment-report.html`,
        }),
      })
      delivered = res.ok
    } catch {
      delivered = false
    }

    setSentTo(lead.email)
    setEmailDelivered(delivered)
    setSubmitted(true)
    setUnlockOpen(false)
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
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between no-print">
          <span className="text-text-muted text-xs font-display font-semibold uppercase tracking-widest">
            {isAi ? 'AI Maturity Assessment' : 'CX Maturity Assessment'}
          </span>
          {!submitted && (
            <button
              type="button"
              onClick={() => setUnlockOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-semibold transition-colors"
              style={{ background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40`, color: ACCENT }}
            >
              <FileText size={15} /> Get full report
            </button>
          )}
        </div>

        {/* ── FREE PREVIEW ─────────────────────────────────────────────── */}

        {/* Card 1: maturity reveal with the ascending stage staircase inline */}
        {isAi
          ? <StageReveal stage={result.stage} accent={ACCENT} stages={AI_STAGES} />
          : <StageReveal stage={result.stage} accent={ACCENT} stages={CX_STAGES} kicker="Your CX Maturity"
              note={result.stage.index < CX_TOTAL
                ? `Most organizations take 6-12 months to move from Stage ${result.stage.index} to Stage ${result.stage.index + 1}.`
                : "You're at the top of the CX maturity curve: the focus now is sustaining and compounding the advantage."} />}

        {/* Card 2: score breakdown */}
        {isAi
          ? <ScoreBars sectionAverages={result.sectionAverages} />
          : <ScoreBars sectionAverages={result.sectionAverages} sections={cxSections} />}

        {/* Card 3: Gartner positioning */}
        {isAi
          ? <GartnerPositioningView
              sectionAverages={result.sectionAverages}
              stageIndex={result.stage.index}
              companyName={profile?.companyName || 'Your Organization'}
              accent={ACCENT}
            />
          : <GartnerPositioningView
              sectionAverages={result.sectionAverages}
              stageIndex={result.stage.index}
              companyName={profile?.companyName || 'Your Organization'}
              accent={ACCENT}
              read={result.positioning}
              clusters={CX_POSITION_CLUSTERS}
              subtitle="Where your organization sits relative to CX leaders and the broader market."
            />}

        {/* Card 4: What leaders at the next stage do */}
        {isAi
          ? <WhatAILeadersDo currentIndex={result.stage.index} accent={ACCENT} />
          : <WhatAILeadersDo currentIndex={result.stage.index} accent={ACCENT}
              content={CX_LEADER_CONTENT} kicker="What CX Leaders Do" maxStage={CX_TOTAL} />}

        {/* ── LOCKED FULL REPORT (blurred → modal form → unlocked) ──────── */}
        <div ref={gateRef} className="scroll-mt-24">
          <LockedReport
            kind={kind}
            result={result}
            accent={ACCENT}
            unlocked={submitted}
            emailDelivered={emailDelivered}
            sentTo={sentTo}
            form={
              <AssessmentLeadForm
                accent={ACCENT}
                title="Unlock your full PDF report"
                body="Enter your details and we'll email you the complete PDF: your strengths and gaps dimension by dimension, Radiant Digital's read on your stage, and your prioritized next step."
                bullets={LEAD_BULLETS[kind]}
                defaults={defaults}
                submitLabel="Unlock & email me the PDF"
                onSend={sendReport}
                {...(isAi ? {} : { departments: cxDepartments })}
                bare
              />
            }
          />
        </div>
      </div>

      {/* ── Unlock modal, lead form ─────────────────────────────────────── */}
      <AnimatePresence>
        {unlockOpen && !submitted && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setUnlockOpen(false)} />
            <motion.div
              className="relative z-10 w-full max-w-2xl my-auto"
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setUnlockOpen(false)}
                className="absolute -top-2 -right-2 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: 'rgba(2,16,30,0.95)', border: '1px solid rgba(255,255,255,0.16)' }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <AssessmentLeadForm
                accent={ACCENT}
                title="Get your full assessment report"
                body={`We'll email you a complete read of your ${isAi ? 'AI' : 'CX'} maturity: your specific strengths, gap analysis, Radiant Digital's strategic perspective, and the highest-impact action to take next.`}
                bullets={[...LEAD_BULLETS[kind], 'Delivered to your inbox as a PDF']}
                defaults={defaults}
                submitLabel="Email me my full report"
                onSend={sendReport}
                {...(isAi ? {} : { departments: cxDepartments })}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

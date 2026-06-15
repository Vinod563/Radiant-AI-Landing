import { useMemo, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle2, Download, Mail } from 'lucide-react'
import StageReveal from './StageReveal'
import ScoreBars from './ScoreBars'
import DimensionTable from './DimensionTable'
import AssessmentLeadForm from './AssessmentLeadForm'
import { getAQ, scoreAssessment, buildFindings, recommendNextStep } from '../../data/aiAssessment.js'
import { scoreCx, cxLevels } from '../../data/cxAssessment.js'

/**
 * Shared assessment results — used by the standalone pages AND the chat.
 *
 * The page shows only two cards: maturity reveal + score breakdown. The full
 * report (findings, next steps, recommended solution) is delivered as a PDF by
 * email, gated behind a dedicated lead form. If the email backend isn't
 * configured (or fails), it falls back to a direct PDF download so the user
 * always gets their report.
 *
 * Props: kind ('ai'|'cx'), profile, answers
 */
export default function AssessmentResults({ kind, profile, answers }) {
  const isAi = kind === 'ai'
  const ACCENT = isAi ? '#91C46B' : '#596AE0'
  const [submitted, setSubmitted] = useState(false)
  const [delivery, setDelivery] = useState('email') // 'email' | 'download'
  const [sentTo, setSentTo] = useState('')
  const gateRef = useRef(null)

  const result = useMemo(() => {
    if (isAi) {
      const scored = scoreAssessment(answers, getAQ(profile.role))
      return { ...scored, findings: buildFindings(scored.sectionAverages), nextStep: recommendNextStep(scored.sectionAverages) }
    }
    const scored = scoreCx(answers)
    const lvl = cxLevels[scored.overallKey]
    return { ...scored, reveal: { name: lvl.name, index: lvl.index, tagline: lvl.tagline, description: lvl.description } }
  }, [isAi, profile, answers])

  const assessment = isAi ? 'AI Adoption' : 'CX Maturity'
  const headline = isAi
    ? `Your result: Stage ${result.stage.index} — ${result.stage.name}.`
    : `Your result: ${result.overallLevel}.`

  const scrollToGate = () => gateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const downloadPdf = async () => {
    const { generateReportPdf } = await import('../../utils/generateReportPdf.js')
    generateReportPdf({ kind, profile, answers })
  }

  // Build the PDF, email it via the backend; fall back to a direct download.
  const sendReport = async (lead) => {
    const { getReportPdfBase64, generateReportPdf } = await import('../../utils/generateReportPdf.js')
    const { base64, filename } = getReportPdfBase64({ kind, profile, answers })
    let mode = 'download'
    try {
      const apiUrl = import.meta.env.VITE_CHAT_API_URL || ''
      const res = await fetch(`${apiUrl}/api/assessment-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, assessment, headline, pdfBase64: base64, filename }),
      })
      if (res.ok) mode = 'email'
      else generateReportPdf({ kind, profile, answers }) // backend unavailable → download
    } catch {
      generateReportPdf({ kind, profile, answers })
    }
    setDelivery(mode)
    setSentTo(lead.email)
    setSubmitted(true)
    window.requestAnimationFrame(scrollToGate)
  }

  const defaults = {
    name: profile?.fullName || '', email: profile?.workEmail || '', company: profile?.companyName || '',
    sector: profile?.sector || '', orgSize: profile?.orgSize || '', department: profile?.department || '',
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between no-print">
        <span className="text-text-muted text-xs font-display font-semibold uppercase tracking-widest">
          {isAi ? 'AI Adoption Report' : 'CX Maturity Report'}
        </span>
        {!submitted && (
          <button type="button" onClick={scrollToGate}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-semibold transition-colors"
            style={{ background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40`, color: ACCENT }}>
            <FileText size={15} /> View full report
          </button>
        )}
      </div>

      {/* Card 1 — maturity reveal */}
      {isAi
        ? <StageReveal stage={result.stage} accent={ACCENT} />
        : <StageReveal stage={result.reveal} accent={ACCENT} total={3} kicker="Your CX Maturity Level" prefix="" />}

      {/* Card 2 — score breakdown */}
      {isAi
        ? <ScoreBars sectionAverages={result.sectionAverages} />
        : <DimensionTable dimensions={result.dimensions} compact />}

      {/* Gate — dedicated lead form, then confirmation */}
      <div ref={gateRef} className="scroll-mt-24">
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mag-card p-8 lg:p-10 text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}40` }}>
              <CheckCircle2 size={26} style={{ color: ACCENT }} />
            </div>
            <h3 className="font-display font-black text-white text-xl lg:text-2xl tracking-tight mb-2">
              {delivery === 'email' ? 'Your report is on its way' : 'Your report is ready'}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto mb-6">
              {delivery === 'email'
                ? <>We've emailed your full {assessment} report as a PDF{sentTo ? <> to <span className="text-white font-semibold">{sentTo}</span></> : ''}. Check your inbox in the next few minutes — it covers your findings and recommended next steps.</>
                : <>Your full {assessment} report has downloaded as a PDF — it covers your findings and recommended next steps. We've recorded your details and our team will follow up.</>}
            </p>
            <button type="button" onClick={downloadPdf} className="btn-primary !px-7 !py-3 text-sm">
              <Download size={15} /> Download the PDF
            </button>
            {delivery === 'email' && (
              <p className="text-text-muted text-xs mt-4 flex items-center justify-center gap-1.5">
                <Mail size={13} /> Didn't arrive? Download it directly above.
              </p>
            )}
          </motion.div>
        ) : (
          <AssessmentLeadForm
            accent={ACCENT}
            title={defaults.email ? 'Email me the full report' : 'Get your full report by email'}
            body={defaults.email
              ? "We've got your details — confirm below and we'll email your full report as a PDF, with your findings and recommended next steps."
              : "Add a few details and we'll email your full report as a PDF, with your findings and recommended next steps."}
            bullets={isAi
              ? ['Your specific strengths and gaps by dimension', 'A prioritized recommended next step', 'Delivered to your inbox as a PDF']
              : ['Your read across all three CX dimensions', 'A recommended solution to reach the next level', 'Delivered to your inbox as a PDF']}
            defaults={defaults}
            submitLabel="Email me the full report"
            onSend={sendReport}
          />
        )}
      </div>
    </div>
  )
}

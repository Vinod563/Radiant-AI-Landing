import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import StageReveal from './StageReveal'
import ScoreBars from './ScoreBars'
import FindingsPanel from './FindingsPanel'
import NextStepCard from './NextStepCard'
import DimensionTable from './DimensionTable'
import { getAQ, scoreAssessment, buildFindings, recommendNextStep } from '../../data/aiAssessment.js'
import { scoreCx, recommendedSolution } from '../../data/cxAssessment.js'

/**
 * Assessment report rendered as a chat card. Computes the result from the
 * collected profile + answers and reuses the standalone result components.
 *
 * Props: kind ('ai'|'cx'), profile, answers, onSubmit (chat handleSubmit for CTAs)
 */
export default function AssessmentReport({ kind, profile, answers, onSubmit }) {
  const isAi = kind === 'ai'
  const ACCENT = isAi ? '#91C46B' : '#596AE0'

  const result = useMemo(() => {
    if (isAi) {
      const scored = scoreAssessment(answers, getAQ(profile.role))
      return { ...scored, findings: buildFindings(scored.sectionAverages), nextStep: recommendNextStep(scored.sectionAverages) }
    }
    return scoreCx(answers)
  }, [isAi, profile, answers])

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="space-y-4">
      {isAi ? (
        <>
          <StageReveal stage={result.stage} accent={ACCENT} />
          <ScoreBars sectionAverages={result.sectionAverages} />
          <FindingsPanel findings={result.findings} />
          <NextStepCard nextStep={result.nextStep} accent={ACCENT} />
        </>
      ) : (
        <>
          <div className="mag-card p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 0% 0%, ${ACCENT}0d 0%, transparent 55%)` }} />
            <div className="relative z-10">
              <span className="kicker mb-3">Your CX Maturity Level</span>
              <h3 className="font-display font-black text-white tracking-tight leading-[0.9]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
                <span style={{ color: ACCENT }}>{result.overallLevel}</span>
              </h3>
            </div>
          </div>
          <DimensionTable dimensions={result.dimensions} />
          <div className="rounded-3xl p-6 lg:p-8" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${ACCENT}26` }}>
            <span className="kicker mb-3">Recommended Solution</span>
            <h4 className="font-display font-black text-white text-xl tracking-tight mb-2">{recommendedSolution.name}</h4>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">{recommendedSolution.lede}</p>
            <button type="button" onClick={() => onSubmit?.(recommendedSolution.learnMoreQuery)} className="btn-outline !px-6 !py-3 text-sm">
              Learn more about the CX Accelerator <ArrowRight size={14} />
            </button>
          </div>
        </>
      )}

      {/* Closing action */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button type="button" onClick={() => onSubmit?.("I'd rather talk to a real person.")} className="btn-primary !px-6 !py-3 text-sm">
          <MessageSquare size={15} /> Talk to our team
        </button>
      </div>
    </motion.div>
  )
}

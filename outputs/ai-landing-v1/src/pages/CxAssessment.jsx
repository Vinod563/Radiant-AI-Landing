import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Sparkles, CheckCircle2, Clock, RotateCcw } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import ProfileForm from '../components/assessment/ProfileForm'
import QuestionRunner from '../components/assessment/QuestionRunner'
import AssessmentResults from '../components/assessment/AssessmentResults'
import { cxSections, cxSampleAnswers } from '../data/cxAssessment.js'

const ACCENT = '#596AE0'

export default function CxAssessment() {
  const [searchParams] = useSearchParams()
  const isSample = searchParams.get('view') === 'sample'

  const [step, setStep] = useState(isSample ? 'results' : 'intro')
  const [answers, setAnswers] = useState(isSample ? cxSampleAnswers : {})
  const [profile, setProfile] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [step])

  const questions = useMemo(
    () => cxSections.flatMap(s => s.questions.map(q => ({ ...q, sectionLabel: s.label, accent: s.accent }))),
    [],
  )

  const reset = () => { setAnswers({}); setProfile(null); setStep('intro') }

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <main className="pt-28 pb-28 lg:pt-36 lg:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(89,106,224,0.1) 0%, transparent 55%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

          {step === 'intro' && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}33` }}>
                <Sparkles size={28} style={{ color: ACCENT }} />
              </div>
              <span className="kicker justify-center">CX Maturity Assessment</span>
              <h1 className="font-display font-black text-white leading-[0.95] tracking-tight mt-4 mb-5"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
                How mature is your <span className="grad-text">customer experience?</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                Evaluate your organization across three dimensions — Vision &amp; Strategy, Governance &amp; Metrics,
                and Organizational Culture — and get your personalized CX maturity level with practical next steps.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted mb-9">
                <span className="flex items-center gap-1.5"><Clock size={14} /> 3–5 minutes</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> 9 questions · 3 sections</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> No signup</span>
              </div>
              <button onClick={() => setStep('profile')} className="btn-primary !px-10 !py-4 text-base">
                Start the assessment <ArrowRight size={17} />
              </button>
            </motion.div>
          )}

          {step === 'profile' && (
            <ProfileForm
              showRole={false}
              heading="First, a little context"
              subtext="A few details so we can tailor your results. Everything stays confidential — this is a diagnostic, not a sales pitch."
              onSubmit={(p) => { setProfile(p); setStep('questions') }}
            />
          )}

          {step === 'questions' && (
            <QuestionRunner
              questions={questions}
              answers={answers}
              onAnswer={(id, score) => setAnswers(prev => ({ ...prev, [id]: score }))}
              onComplete={() => setStep('results')}
              onBackToStart={() => setStep('profile')}
            />
          )}

          {step === 'results' && (
            <div className="space-y-5">
              <AssessmentResults kind="cx" profile={profile} answers={answers} />
              <div className="flex justify-center pt-2 no-print">
                <button onClick={reset} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-sm font-display font-semibold">
                  <RotateCcw size={14} /> Retake the assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

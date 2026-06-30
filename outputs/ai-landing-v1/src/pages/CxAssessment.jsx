import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import ProfileForm from '../components/assessment/ProfileForm'
import QuestionRunner from '../components/assessment/QuestionRunner'
import AssessmentResults from '../components/assessment/AssessmentResults'
import { cxSections, cxSampleAnswers } from '../data/cxAssessment.js'

export default function CxAssessment() {
  const [searchParams] = useSearchParams()
  const isSample = searchParams.get('view') === 'sample'

  const [step, setStep] = useState(isSample ? 'results' : 'profile')
  const [answers, setAnswers] = useState(isSample ? cxSampleAnswers : {})
  const [profile, setProfile] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [step])

  const questions = useMemo(
    () => cxSections.flatMap(s => s.questions.map(q => ({ ...q, sectionLabel: s.label, accent: s.accent }))),
    [],
  )

  const reset = () => { setAnswers({}); setProfile(null); setStep('profile') }

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <main className="pt-28 pb-28 lg:pt-36 lg:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(89,106,224,0.1) 0%, transparent 55%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

          {step === 'profile' && (
            <ProfileForm
              showRole={false}
              heading="First, a little context"
              subtext="A few details so we can tailor your results. Everything stays confidential, this is a diagnostic, not a sales pitch."
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

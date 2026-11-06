import { useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import AssessmentHeader from '../components/assessment/AssessmentHeader'
import { useAssessmentProgress, usePageTitle } from '../utils/assessmentProgress.js'
import Footer from '../components/shared/Footer'
import ProfileForm from '../components/assessment/ProfileForm'
import QuestionRunner from '../components/assessment/QuestionRunner'
import AssessmentResults from '../components/assessment/AssessmentResults'
import { roles, getAQ, sectionMeta, sampleProfile, sampleAnswers } from '../data/aiAssessment.js'

export default function AiAssessment() {
  const [searchParams] = useSearchParams()
  const isSample = searchParams.get('view') === 'sample'

  // Progress is saved while answering, so "Save and exit" resumes at the same question.
  const { step, setStep, profile, setProfile, answers, setAnswers, qIndex, setQIndex, resumed, setResumed, startOver } =
    useAssessmentProgress('ai', isSample ? { profile: sampleProfile, answers: sampleAnswers } : null)
  usePageTitle('AI Maturity Assessment | Radiant AI')

  useEffect(() => { window.scrollTo(0, 0) }, [step])

  const trackLabel = profile ? roles.find(r => r.key === profile.role)?.track : ''

  const questions = useMemo(() => {
    if (!profile) return []
    return getAQ(profile.role).map(q => ({
      ...q,
      sectionLabel: sectionMeta[q.section].label,
      accent: sectionMeta[q.section].accent,
      trackLabel,
    }))
  }, [profile, trackLabel])

  const reset = startOver

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Full marketing nav only on results; while answering, a stripped header with exit */}
      {step === 'results' ? <Navbar /> : <AssessmentHeader exitLabel={step === 'questions' ? 'Save and exit' : 'Exit'} />}
      <main className="pt-28 pb-28 lg:pt-36 lg:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.09) 0%, transparent 55%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

          {step === 'profile' && (
            <ProfileForm onSubmit={(p) => { setProfile(p); setQIndex(0); setStep('questions') }} />
          )}

          {step === 'questions' && resumed && (
            <div role="status" className="max-w-2xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 text-[13px] text-text-secondary"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span>Welcome back. You're picking up where you left off.</span>
              <button onClick={startOver} className="font-display font-semibold text-white/85 hover:text-white underline underline-offset-4">Start over</button>
            </div>
          )}

          {step === 'questions' && (
            <QuestionRunner
              initialIndex={qIndex}
              onIndexChange={(i) => { if (i !== qIndex) setResumed(false); setQIndex(i) }}
              questions={questions}
              answers={answers}
              onAnswer={(id, score) => setAnswers(prev => ({ ...prev, [id]: score }))}
              onComplete={() => setStep('results')}
              onBackToStart={() => setStep('profile')}
              scaleHint="1 = least mature · 5 = most mature"
            />
          )}

          {step === 'results' && profile && (
            <div className="space-y-5">
              <AssessmentResults kind="ai" profile={profile} answers={answers} />
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

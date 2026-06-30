import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import ProfileForm from '../components/assessment/ProfileForm'
import QuestionRunner from '../components/assessment/QuestionRunner'
import AssessmentResults from '../components/assessment/AssessmentResults'
import { roles, getAQ, sectionMeta, sampleProfile, sampleAnswers } from '../data/aiAssessment.js'

export default function AiAssessment() {
  const [searchParams] = useSearchParams()
  const isSample = searchParams.get('view') === 'sample'

  const [step, setStep] = useState(isSample ? 'results' : 'profile')
  const [profile, setProfile] = useState(isSample ? sampleProfile : null)
  const [answers, setAnswers] = useState(isSample ? sampleAnswers : {})

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

  const reset = () => { setProfile(null); setAnswers({}); setStep('profile') }

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <main className="pt-28 pb-28 lg:pt-36 lg:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.09) 0%, transparent 55%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

          {step === 'profile' && (
            <ProfileForm onSubmit={(p) => { setProfile(p); setStep('questions') }} />
          )}

          {step === 'questions' && (
            <QuestionRunner
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

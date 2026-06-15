import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Brain, Clock, CheckCircle2, RotateCcw } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import ProfileForm from '../components/assessment/ProfileForm'
import QuestionRunner from '../components/assessment/QuestionRunner'
import AssessmentResults from '../components/assessment/AssessmentResults'
import { roles, getAQ, sectionMeta, sampleProfile, sampleAnswers } from '../data/aiAssessment.js'

const ACCENT = '#91C46B'

export default function AiAssessment() {
  const [searchParams] = useSearchParams()
  const isSample = searchParams.get('view') === 'sample'

  const [step, setStep] = useState(isSample ? 'results' : 'intro')
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

  const reset = () => { setProfile(null); setAnswers({}); setStep('intro') }

  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <main className="pt-28 pb-28 lg:pt-36 lg:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(145,196,107,0.09) 0%, transparent 55%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

          {step === 'intro' && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}33` }}>
                <Brain size={28} style={{ color: ACCENT }} />
              </div>
              <span className="kicker justify-center">AI Adoption Assessment</span>
              <h1 className="font-display font-black text-white leading-[0.95] tracking-tight mt-4 mb-5"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
                How AI-ready is <span className="grad-text">your organization?</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                A role-adaptive diagnostic across strategy, data, people, and adoption. Answer a tailored set of
                questions and get an instant stage diagnosis, per-dimension scores, specific findings, and a
                recommended next step.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted mb-9">
                <span className="flex items-center gap-1.5"><Clock size={14} /> 10–15 minutes</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Role-adaptive</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> 5-stage framework</span>
              </div>
              <div className="flex justify-center">
                <button onClick={() => setStep('profile')} className="btn-primary !px-10 !py-4 text-base">
                  Take the assessment <ArrowRight size={17} />
                </button>
              </div>
            </motion.div>
          )}

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

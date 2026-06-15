import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Sparkles, CheckCircle2, Clock, RotateCcw } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import ProfileForm from '../components/assessment/ProfileForm'
import QuestionRunner from '../components/assessment/QuestionRunner'
import DimensionTable from '../components/assessment/DimensionTable'
import ResultsContact from '../components/assessment/ResultsContact'
import PrintReportButton from '../components/assessment/PrintReportButton'
import { cxSections, scoreCx, recommendedSolution, cxSuccessStories, cxSampleAnswers } from '../data/cxAssessment.js'

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

  const result = useMemo(() => (step === 'results' ? scoreCx(answers) : null), [step, answers])

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

          {step === 'results' && result && (
            <div className="space-y-5">
              <div className="flex items-center justify-between no-print">
                <span className="text-text-muted text-xs font-display font-semibold uppercase tracking-widest">CX Maturity Report</span>
                <PrintReportButton />
              </div>
              {/* Overall */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="mag-card p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${ACCENT}10 0%, transparent 55%)` }} />
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="kicker mb-3">Your CX Maturity Level</span>
                    <h2 className="font-display font-black text-white tracking-tight leading-[0.9]"
                      style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
                      <span style={{ color: ACCENT }}>{result.overallLevel}</span>
                    </h2>
                    <p className="text-text-secondary mt-3 max-w-xl leading-relaxed">
                      You've made meaningful progress building customer-experience capabilities. Here's how each
                      dimension breaks down and where to focus next.
                    </p>
                  </div>
                  {isSample && (
                    <span className="text-[10px] font-display font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}33` }}>Sample Report</span>
                  )}
                </div>
              </motion.div>

              <DimensionTable dimensions={result.dimensions} />

              {/* Recommended solution */}
              <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${ACCENT}26` }}>
                <div className="relative z-10">
                  <span className="kicker mb-4">Recommended Solution</span>
                  <h3 className="font-display font-black text-white text-2xl lg:text-3xl tracking-tight mb-3">
                    {recommendedSolution.name}
                  </h3>
                  <p className="text-text-secondary leading-relaxed max-w-2xl mb-6">{recommendedSolution.lede}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {recommendedSolution.helps.map(h => (
                      <div key={h} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                        <span className="text-text-secondary text-sm leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`/chat?q=${encodeURIComponent(recommendedSolution.learnMoreQuery)}`} target="_blank" rel="noopener noreferrer"
                    className="btn-outline !px-7 !py-3.5 inline-flex">
                    Learn more about the CX Accelerator <ArrowRight size={15} />
                  </a>
                </div>
              </div>

              {/* Contact (reused two-column block) */}
              <ResultsContact
                accent={ACCENT}
                title="Build a more mature CX strategy"
                body="Radiant is here to help you deploy solutions and track your progress. Tell us where you want to go and our team will follow up with a tailored plan."
                bullets={[
                  'A tailored read on your weakest dimension',
                  'Practical next steps to reach the next level',
                  'A walkthrough of Experience AI for your team',
                ]}
                subjectPrefix="CX Maturity Assessment lead"
                meta={{
                  assessment: 'CX Maturity',
                  cx_level: result.overallLevel,
                  ...(profile ? { company: profile.companyName, sector: profile.sector } : {}),
                }}
                defaults={{
                  name: profile?.fullName || '',
                  email: profile?.workEmail || '',
                  company: profile?.companyName || '',
                  message: `My CX maturity level came out as ${result.overallLevel}. I'd like help improving it.`,
                }}
              />

              {/* Success stories */}
              <div className="mag-card p-8 lg:p-10">
                <span className="kicker mb-6">Success Stories</span>
                <div className="grid sm:grid-cols-3 gap-4 mt-2">
                  {cxSuccessStories.map(s => (
                    <Link key={s.title} to={`/chat?q=${encodeURIComponent(s.query)}`}
                      className="group rounded-2xl p-5 no-underline transition-all duration-300 hover:-translate-y-1"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-green mb-2">{s.tag}</div>
                      <h4 className="font-display font-bold text-white text-sm leading-snug">{s.title}</h4>
                      <span className="inline-flex items-center gap-1 text-xs text-text-muted mt-3 group-hover:text-brand-green transition-colors">
                        Read more <ArrowRight size={12} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

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

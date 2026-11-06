import { useState, useEffect } from 'react'

/**
 * Saves an in-progress assessment in this browser so "Save and exit" works:
 * leaving mid-assessment and coming back resumes at the same question.
 * Saved only while answering questions; cleared on the profile and results
 * screens. Storage can be unavailable (private mode, blocked site data), so
 * every access is guarded and the flow works without it.
 */
const keyFor = (kind) => `radiant-assessment-progress-${kind}`

function read(kind) {
  try {
    const raw = window.localStorage.getItem(keyFor(kind))
    const data = raw ? JSON.parse(raw) : null
    return data && data.step === 'questions' && data.profile ? data : null
  } catch { return null }
}
function write(kind, data) {
  try { window.localStorage.setItem(keyFor(kind), JSON.stringify(data)) } catch { /* storage unavailable */ }
}
function clear(kind) {
  try { window.localStorage.removeItem(keyFor(kind)) } catch { /* storage unavailable */ }
}

export function useAssessmentProgress(kind, sample) {
  // Read once on mount; a sample view never touches saved progress.
  const [saved] = useState(() => (sample ? null : read(kind)))

  const [step, setStep] = useState(sample ? 'results' : saved ? 'questions' : 'profile')
  const [profile, setProfile] = useState(sample ? sample.profile : saved?.profile || null)
  const [answers, setAnswers] = useState(sample ? sample.answers : saved?.answers || {})
  const [qIndex, setQIndex] = useState(saved?.qIndex || 0)
  const [resumed, setResumed] = useState(!!saved)

  useEffect(() => {
    if (sample) return
    if (step === 'questions' && profile) write(kind, { step, profile, answers, qIndex })
    else clear(kind)
  }, [kind, sample, step, profile, answers, qIndex])

  const startOver = () => {
    clear(kind)
    setProfile(null); setAnswers({}); setQIndex(0); setResumed(false); setStep('profile')
  }

  return { step, setStep, profile, setProfile, answers, setAnswers, qIndex, setQIndex, resumed, setResumed, startOver }
}

/** Sets the browser tab title while a page is mounted, restoring the previous one after. */
export function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => { document.title = prev }
  }, [title])
}

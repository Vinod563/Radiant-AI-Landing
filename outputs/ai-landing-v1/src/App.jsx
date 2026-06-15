import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index.jsx'
import Chat from './pages/Chat.jsx'

const AssessmentHub = lazy(() => import('./pages/AssessmentHub.jsx'))
const AiAssessment = lazy(() => import('./pages/AiAssessment.jsx'))
const CxAssessment = lazy(() => import('./pages/CxAssessment.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/assessment" element={<AssessmentHub />} />
          <Route path="/assessment/ai" element={<AiAssessment />} />
          <Route path="/assessment/cx" element={<CxAssessment />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

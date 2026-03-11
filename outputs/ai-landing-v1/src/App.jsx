import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index.jsx'
import ICXSolution from './pages/ICXSolution.jsx'
import Chat from './pages/Chat.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/icx-solution" element={<ICXSolution />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

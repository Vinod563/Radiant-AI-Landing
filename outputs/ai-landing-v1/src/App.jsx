import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index.jsx'
import Chat from './pages/Chat.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

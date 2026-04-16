import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SiteContentProvider } from './context/SiteContentContext'
import ProtectedRoute from './components/admin/ProtectedRoute'

import Index       from './pages/Index.jsx'
import Chat        from './pages/Chat.jsx'
import Login       from './pages/admin/Login.jsx'
import Dashboard   from './pages/admin/Dashboard.jsx'
import CMS         from './pages/admin/CMS.jsx'
import Visibility  from './pages/admin/Visibility.jsx'
import ChatControl from './pages/admin/ChatControl.jsx'

export default function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"    element={<Index />} />
          <Route path="/chat" element={<Chat />} />

          {/* Admin auth */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin panel — protected */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/cms"        element={<ProtectedRoute><CMS /></ProtectedRoute>} />
          <Route path="/admin/visibility" element={<ProtectedRoute><Visibility /></ProtectedRoute>} />
          <Route path="/admin/chat"       element={<ProtectedRoute><ChatControl /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  )
}

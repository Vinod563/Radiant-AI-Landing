import { useState, useEffect, useCallback } from 'react'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

/**
 * Derive the API base path from the current URL so the SPA works regardless
 * of what ADMIN_PATH is set to on the server.
 *
 * e.g. if served at https://example.com/admin-a8f2k3/
 *       apiBase = '/admin-a8f2k3'
 */
function getApiBase() {
  const path = window.location.pathname.replace(/\/$/, '')
  return path || ''
}

export const API_BASE = getApiBase()

export default function App() {
  const [view, setView] = useState('loading')

  // On mount, check if we already have a valid session
  useEffect(() => {
    fetch(`${API_BASE}/api/status`, { credentials: 'include' })
      .then(r => r.ok ? setView('dashboard') : setView('login'))
      .catch(() => setView('login'))
  }, [])

  const handleLoginSuccess = useCallback(() => setView('dashboard'), [])
  const handleLogout = useCallback(() => setView('login'), [])

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-8 h-8 border-2 border-[#91C46B] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return view === 'login'
    ? <Login onSuccess={handleLoginSuccess} />
    : <Dashboard onLogout={handleLogout} />
}

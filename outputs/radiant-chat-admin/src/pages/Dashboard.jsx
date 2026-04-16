import { useState, useEffect, useCallback } from 'react'
import { API_BASE } from '../App.jsx'

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export default function Dashboard({ onLogout }) {
  const [status, setStatus] = useState(null)
  const [pendingMode, setPendingMode] = useState(null)
  const [toggling, setToggling] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/status`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setStatus(data)
        setPendingMode(prev => prev === null ? data.chatMode : prev)
      } else if (res.status === 401) onLogout()
    } catch {
      showToast('Failed to load status', 'error')
    }
  }, [onLogout])

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [fetchStatus])

  function handleSelect(newMode) {
    if (!status) return
    setPendingMode(newMode)
  }

  async function handleSave() {
    if (toggling || pendingMode === status?.chatMode) return
    setToggling(true)

    try {
      const res = await fetch(`${API_BASE}/api/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ mode: pendingMode }),
      })

      if (res.ok) {
        const data = await res.json()
        setStatus(prev => ({ ...prev, chatMode: data.chatMode }))
        showToast(`Switched to ${pendingMode === 'llm' ? 'LLM (Gemma 4)' : 'Static'} mode`)
      } else if (res.status === 401) {
        onLogout()
      } else {
        showToast('Save failed', 'error')
      }
    } catch {
      showToast('Unable to reach server', 'error')
    } finally {
      setToggling(false)
    }
  }

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' })
    } finally {
      onLogout()
    }
  }

  const isLLM = status?.chatMode === 'llm'
  const pendingIsLLM = pendingMode === 'llm'
  const isDirty = pendingMode !== null && pendingMode !== status?.chatMode

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#91C46B] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Radiant Digital</p>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-xs text-white/40 hover:text-white/70 transition-colors disabled:opacity-40 flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>

        {/* Chat Mode Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold text-base">Chat Mode</h2>
              <p className="text-white/40 text-sm mt-0.5">Controls how the chat responds to visitors</p>
            </div>
            {status && (
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                isLLM
                  ? 'bg-[#596AE0]/20 text-[#596AE0] border border-[#596AE0]/30'
                  : 'bg-[#91C46B]/20 text-[#91C46B] border border-[#91C46B]/30'
              }`}>
                {isLLM ? 'LLM Active' : 'Static Active'}
              </span>
            )}
          </div>

          {/* Toggle buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Static mode */}
            <button
              onClick={() => handleSelect('static')}
              disabled={toggling || !status}
              className={`relative group rounded-xl border p-5 text-left transition-all duration-200 disabled:cursor-not-allowed ${
                pendingMode === 'static' && status
                  ? 'border-[#91C46B] bg-[#91C46B]/10'
                  : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                pendingMode === 'static' && status ? 'bg-[#91C46B]/20' : 'bg-white/5'
              }`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pendingMode === 'static' && status ? '#91C46B' : '#ffffff60'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <p className={`font-semibold text-sm mb-1 ${pendingMode === 'static' && status ? 'text-white' : 'text-white/70'}`}>
                Static
              </p>
              <p className="text-xs text-white/40 leading-relaxed">
                Instant hardcoded responses. No API costs. Zero latency.
              </p>
              {pendingMode === 'static' && status && (
                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${!isLLM ? 'bg-[#91C46B]' : 'bg-[#91C46B]/50'}`} />
              )}
            </button>

            {/* LLM mode */}
            <button
              onClick={() => handleSelect('llm')}
              disabled={toggling || !status}
              className={`relative group rounded-xl border p-5 text-left transition-all duration-200 disabled:cursor-not-allowed ${
                pendingMode === 'llm' && status
                  ? 'border-[#596AE0] bg-[#596AE0]/10'
                  : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                pendingMode === 'llm' && status ? 'bg-[#596AE0]/20' : 'bg-white/5'
              }`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pendingMode === 'llm' && status ? '#596AE0' : '#ffffff60'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                  <circle cx="7.5" cy="14.5" r="1.5" />
                  <circle cx="16.5" cy="14.5" r="1.5" />
                </svg>
              </div>
              <p className={`font-semibold text-sm mb-1 ${pendingMode === 'llm' && status ? 'text-white' : 'text-white/70'}`}>
                LLM (Gemma 4)
              </p>
              <p className="text-xs text-white/40 leading-relaxed">
                AI-generated responses via Google Gemma 4. Dynamic and context-aware.
              </p>
              {pendingMode === 'llm' && status && (
                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${isLLM ? 'bg-[#596AE0]' : 'bg-[#596AE0]/50'}`} />
              )}
            </button>
          </div>

          {/* Save button */}
          <div className="mt-4 flex items-center justify-between">
            <div className="h-5">
              {isDirty && !toggling && (
                <p className="text-white/40 text-xs">Unsaved changes</p>
              )}
              {toggling && (
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <div className="w-3.5 h-3.5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
                  Saving…
                </div>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={!isDirty || toggling}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-[#91C46B] text-black hover:bg-[#7fb05a] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>

        {/* Status Card */}
        {status && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-4">System Status</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white/40 text-xs mb-1">Model</p>
                <p className="text-white text-sm font-medium truncate">{status.model}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Uptime</p>
                <p className="text-white text-sm font-medium">{formatUptime(status.uptime)}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Last refresh</p>
                <p className="text-white text-sm font-medium">
                  {new Date(status.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm font-medium shadow-xl transition-all ${
          toast.type === 'error'
            ? 'bg-red-500/90 text-white'
            : 'bg-[#91C46B] text-black'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

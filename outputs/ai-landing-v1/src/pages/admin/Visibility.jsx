import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, Save, AlertCircle, CheckCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3003'

export default function Visibility() {
  const { authHeaders } = useAuth()
  const [sections, setSections] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [status,   setStatus]   = useState(null) // 'saving' | 'saved' | 'error'

  useEffect(() => {
    fetch(`${API}/api/visibility`)
      .then(r => r.json())
      .then(data => setSections(data))
      .finally(() => setLoading(false))
  }, [])

  function toggle(sectionName) {
    setSections(prev =>
      prev.map(s => s.section_name === sectionName ? { ...s, is_visible: !s.is_visible } : s)
    )
  }

  async function saveAll() {
    setStatus('saving')
    try {
      const res = await fetch(`${API}/api/visibility`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(sections.map(s => ({
          section_name:  s.section_name,
          is_visible:    s.is_visible,
          display_order: s.display_order,
        }))),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus(null), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Section Visibility</h1>
          <p className="text-sm text-gray-400 mt-1">Toggle sections on/off. Hidden sections are removed from the landing page.</p>
        </div>
        <div className="flex items-center gap-3">
          {status === 'saved'  && <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle size={13} /> Saved</span>}
          {status === 'error'  && <span className="flex items-center gap-1 text-xs text-red-400"><AlertCircle size={13} /> Failed</span>}
          <button
            onClick={saveAll}
            disabled={status === 'saving' || loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Save size={14} />
            {status === 'saving' ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading sections…</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
          {sections.map(s => (
            <div key={s.section_name} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="text-sm font-medium text-white">{s.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">key: {s.section_name}</div>
              </div>

              <button
                onClick={() => toggle(s.section_name)}
                className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  s.is_visible
                    ? 'border-green-700 bg-green-900/30 text-green-400 hover:bg-green-900/50'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {s.is_visible
                  ? <><Eye    size={13} /> Visible</>
                  : <><EyeOff size={13} /> Hidden</>
                }
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-600 mt-4">
        Changes take effect immediately after saving. No rebuild required.
      </p>
    </AdminLayout>
  )
}

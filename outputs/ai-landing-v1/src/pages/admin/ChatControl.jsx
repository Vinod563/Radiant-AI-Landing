import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { Save, AlertCircle, CheckCircle, Info } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3003'

export default function ChatControl() {
  const { authHeaders } = useAuth()
  const [config,  setConfig]  = useState({ mode: 'static', api_url: '', api_key: '', model: 'gpt-4o', system_prompt: '' })
  const [loading, setLoading] = useState(true)
  const [status,  setStatus]  = useState(null)

  useEffect(() => {
    fetch(`${API}/api/chat/config`)
      .then(r => r.json())
      .then(data => setConfig(c => ({ ...c, ...data, api_key: '' }))) // never pre-fill api_key
      .finally(() => setLoading(false))
  }, [])

  async function save() {
    setStatus('saving')
    try {
      const body = { ...config }
      if (!body.api_key) delete body.api_key // don't overwrite stored key if field left empty
      const res = await fetch(`${API}/api/chat/config`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus(null), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
    }
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea
          rows={4}
          value={config[name] || ''}
          onChange={e => setConfig(c => ({ ...c, [name]: e.target.value }))}
          placeholder={placeholder}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 resize-y"
        />
      ) : (
        <input
          type={type}
          value={config[name] || ''}
          onChange={e => setConfig(c => ({ ...c, [name]: e.target.value }))}
          placeholder={placeholder}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
      )}
    </div>
  )

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Chat Control</h1>
        <p className="text-sm text-gray-400 mt-1">Switch between static knowledge base and dynamic AI. Configure your AI endpoint.</p>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading config…</div>
      ) : (
        <div className="space-y-6 max-w-xl">
          {/* Mode toggle */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-sm font-medium text-white mb-3">Chat Mode</div>
            <div className="flex gap-3">
              {['static', 'dynamic'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setConfig(c => ({ ...c, mode }))}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    config.mode === mode
                      ? 'bg-green-900/40 border-green-700 text-green-400'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {mode === 'static' ? 'Static (Knowledge Base)' : 'Dynamic (AI API)'}
                </button>
              ))}
            </div>

            {config.mode === 'static' && (
              <div className="flex gap-2 mt-3 text-xs text-gray-400 bg-gray-800 rounded-lg px-3 py-2.5">
                <Info size={13} className="shrink-0 mt-0.5" />
                Responses come from the hardcoded knowledge base. No external API calls.
              </div>
            )}
          </div>

          {/* Dynamic config */}
          {config.mode === 'dynamic' && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
              <div className="text-sm font-medium text-white">AI API Configuration</div>
              {field('api_url', 'API Base URL (OpenAI-compatible)', 'text', 'https://api.openai.com/v1')}
              {field('api_key', 'API Key (leave blank to keep existing)', 'password', '••••••••••••••••')}
              {field('model',   'Model', 'text', 'gpt-4o')}
              {field('system_prompt', 'System Prompt', 'textarea',
                'You are a helpful assistant for Radiant Digital. Answer questions about our AI transformation services.')}
            </div>
          )}

          {/* Save */}
          <div className="flex items-center gap-3">
            <button
              onClick={save}
              disabled={status === 'saving'}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <Save size={14} />
              {status === 'saving' ? 'Saving…' : 'Save Configuration'}
            </button>
            {status === 'saved'  && <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle size={13} /> Saved</span>}
            {status === 'error'  && <span className="flex items-center gap-1 text-xs text-red-400"><AlertCircle size={13} /> Save failed</span>}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

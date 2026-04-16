import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { FileText, Eye, MessageSquare, CheckCircle, XCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3003'

export default function Dashboard() {
  const [visibility, setVisibility] = useState([])
  const [chatMode,   setChatMode]   = useState(null)
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/visibility`).then(r => r.json()),
      fetch(`${API}/api/chat/config`).then(r => r.json()),
    ]).then(([v, c]) => {
      setVisibility(v)
      setChatMode(c.mode)
    }).finally(() => setLoading(false))
  }, [])

  const visible = visibility.filter(s => s.is_visible).length
  const hidden  = visibility.length - visible

  const cards = [
    { to: '/admin/cms',        icon: FileText,      label: 'CMS Content',  desc: 'Edit text, metrics, headlines' },
    { to: '/admin/visibility', icon: Eye,           label: 'Sections',     desc: `${visible} visible · ${hidden} hidden` },
    { to: '/admin/chat',       icon: MessageSquare, label: 'Chat Control', desc: chatMode ? `Mode: ${chatMode}` : '—' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Manage landing page content, section visibility, and chat settings.</p>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {cards.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="bg-gray-900 border border-gray-800 hover:border-green-700 rounded-xl p-6 transition-colors group"
            >
              <Icon size={20} className="text-green-400 mb-3" />
              <div className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">{label}</div>
              <div className="text-xs text-gray-400 mt-1">{desc}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Section visibility summary */}
      {!loading && visibility.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Section Status</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
            {visibility.map(s => (
              <div key={s.section_name} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-gray-300">{s.label}</span>
                {s.is_visible
                  ? <CheckCircle size={15} className="text-green-400" />
                  : <XCircle    size={15} className="text-gray-600"   />
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

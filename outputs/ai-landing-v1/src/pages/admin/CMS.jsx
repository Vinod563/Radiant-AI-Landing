import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { useSiteContentContext } from '../../context/SiteContentContext'
import { Save, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react'
import * as staticContent from '../../data/siteContent'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3003'

// ─── SECTION DEFINITIONS ────────────────────────────────────────────
// type: 'object'       → flat key/value fields
// type: 'array'        → list of items, each with itemFields
// field type: 'text'       → single-line input
// field type: 'textarea'   → multi-line textarea
// field type: 'multiline'  → array stored as string[], displayed as newline-joined textarea
const SECTIONS = [
  // ── Hero ──
  {
    key: 'brand',
    label: 'Brand Messaging',
    fields: [
      { name: 'name',           label: 'Company Name',   type: 'text'     },
      { name: 'tagline',        label: 'Tagline',        type: 'text'     },
      { name: 'description',   label: 'Description',    type: 'textarea' },
      { name: 'differentiator', label: 'Differentiator', type: 'textarea' },
    ],
  },
  {
    key: 'heroMetrics',
    label: 'Hero Metrics',
    type: 'array',
    itemFields: [
      { name: 'value', label: 'Value', type: 'text' },
      { name: 'label', label: 'Label', type: 'text' },
    ],
  },

  // ── Why Radiant (WhatIsRadiantAI) ──
  {
    key: 'whatIsRadiant',
    label: 'Why Radiant Digital (PCE Section)',
    fields: [
      { name: 'kicker',   label: 'Kicker',   type: 'text'     },
      { name: 'headline', label: 'Headline (use \\n to split at grad-text)', type: 'textarea' },
      { name: 'body',     label: 'Body',     type: 'textarea' },
    ],
  },
  {
    key: 'whatIsRadiant_teamCard',
    label: 'PCE — Delivery Team Card',
    _parent: 'whatIsRadiant',
    _subKey: 'teamCard',
    fields: [
      { name: 'title', label: 'Card Title', type: 'text' },
      { name: 'items', label: 'Bullet Points (one per line)', type: 'multiline' },
    ],
  },
  {
    key: 'whatIsRadiant_agentCard',
    label: 'PCE — AI Agents Card',
    _parent: 'whatIsRadiant',
    _subKey: 'agentCard',
    fields: [
      { name: 'title', label: 'Card Title', type: 'text' },
      { name: 'items', label: 'Bullet Points (one per line)', type: 'multiline' },
    ],
  },
  {
    key: 'whatIsRadiant_outcome',
    label: 'PCE — Outcome Block',
    _parent: 'whatIsRadiant',
    _subKey: 'outcome',
    fields: [
      { name: 'title',   label: 'Title',    type: 'text'     },
      { name: 'body',    label: 'Body',     type: 'textarea' },
      { name: 'subBody', label: 'Sub Body', type: 'textarea' },
    ],
  },

  // ── Solutions ──
  {
    key: 'solutions',
    label: 'AI Solutions (8 cards)',
    type: 'array',
    itemFields: [
      { name: 'num',     label: 'Number',      type: 'text'      },
      { name: 'title',   label: 'Title',       type: 'text'      },
      { name: 'tagline', label: 'Tagline',     type: 'text'      },
      { name: 'desc',    label: 'Description', type: 'textarea'  },
      { name: 'proofStat', label: 'Proof Stat', type: 'text'     },
      { name: 'tags',    label: 'Tags (one per line)',                type: 'multiline' },
      { name: 'details', label: 'Details / Bullets (one per line)',   type: 'multiline' },
      { name: 'platformComponents', label: 'Platform Components (one per line)', type: 'multiline' },
    ],
  },

  // ── AI Fabric / Enablers ──
  {
    key: 'aiFabric',
    label: 'AI Fabric — Header',
    fields: [
      { name: 'kicker',   label: 'Kicker',   type: 'text'     },
      { name: 'headline', label: 'Headline (use \\n to split)', type: 'textarea' },
      { name: 'body',     label: 'Body',     type: 'textarea' },
    ],
  },
  {
    key: 'aiFabricPractices',
    label: 'AI Fabric — Practices (6 cards)',
    _parent: 'aiFabric',
    _subKey: 'practices',
    type: 'array',
    itemFields: [
      { name: 'num',   label: 'Number', type: 'text'     },
      { name: 'title', label: 'Title',  type: 'text'     },
      { name: 'desc',  label: 'Description', type: 'textarea' },
    ],
  },

  // ── Case Study ──
  {
    key: 'telecomCaseStudy',
    label: 'Case Study',
    fields: [
      { name: 'kicker',      label: 'Kicker',       type: 'text'     },
      { name: 'headline',    label: 'Headline (use \\n to split)', type: 'textarea' },
      { name: 'client',      label: 'Client Name',  type: 'text'     },
      { name: 'clientDetail', label: 'Client Detail', type: 'text'   },
      { name: 'challenge',   label: 'Challenge',    type: 'textarea' },
      { name: 'whatWeDid',   label: 'What We Did',  type: 'textarea' },
      { name: 'quote',       label: 'Quote',        type: 'textarea' },
      { name: 'quoteAuthor', label: 'Quote Author', type: 'text'     },
    ],
  },
  {
    key: 'caseStudyMetrics',
    label: 'Case Study — Metrics',
    _parent: 'telecomCaseStudy',
    _subKey: 'metrics',
    type: 'array',
    itemFields: [
      { name: 'value', label: 'Value (e.g. 70%)', type: 'text' },
      { name: 'label', label: 'Label',            type: 'text' },
    ],
  },

  // ── Social Proof ──
  {
    key: 'socialProof',
    label: 'Social Proof — Header',
    fields: [
      { name: 'kicker',     label: 'Kicker',     type: 'text'     },
      { name: 'headline',   label: 'Headline (use \\n for line breaks)', type: 'textarea' },
      { name: 'body',       label: 'Body',       type: 'textarea' },
      { name: 'compliance', label: 'Compliance note (bottom)', type: 'text' },
    ],
  },
  {
    key: 'trustStats',
    label: 'Social Proof — Trust Stats (4 numbers)',
    type: 'array',
    itemFields: [
      { name: 'value', label: 'Value',                                          type: 'text' },
      { name: 'label', label: 'Label',                                          type: 'text' },
      { name: 'icon',  label: 'Icon (Award / Briefcase / TrendingUp / DollarSign)', type: 'text' },
    ],
  },

  // ── Industries ──
  {
    key: 'markets',
    label: 'Industries / Market Cards',
    type: 'array',
    itemFields: [
      { name: 'title',   label: 'Title',       type: 'text'     },
      { name: 'desc',    label: 'Description', type: 'textarea' },
      { name: 'clients', label: 'Key Clients', type: 'text'     },
    ],
  },

  // ── Platform ──
  {
    key: 'platform',
    label: 'AI Platform — Header',
    fields: [
      { name: 'kicker',   label: 'Kicker',   type: 'text'     },
      { name: 'headline', label: 'Headline (use \\n to split)', type: 'textarea' },
      { name: 'body',     label: 'Body',     type: 'textarea' },
      { name: 'subBody',  label: 'Sub Body', type: 'textarea' },
    ],
  },
  {
    key: 'platformCategories',
    label: 'AI Platform — Categories (3 cards)',
    _parent: 'platform',
    _subKey: 'categories',
    type: 'array',
    itemFields: [
      { name: 'label',        label: 'Label',                          type: 'text'      },
      { name: 'desc',         label: 'Description',                    type: 'textarea'  },
      { name: 'capabilities', label: 'Capabilities (one per line)',     type: 'multiline' },
    ],
  },

  // ── Infrastructure ──
  {
    key: 'infrastructure',
    label: 'Infrastructure — Label',
    fields: [
      { name: 'label', label: 'Section Label', type: 'text' },
    ],
  },
  {
    key: 'infrastructurePartners',
    label: 'Infrastructure — Partners (6 logos)',
    _parent: 'infrastructure',
    _subKey: 'partners',
    type: 'array',
    itemFields: [
      { name: 'name', label: 'Partner Name', type: 'text' },
      { name: 'note', label: 'Note',         type: 'text' },
    ],
  },

  // ── CTA ──
  {
    key: 'cta',
    label: 'CTA Section',
    fields: [
      { name: 'kicker',       label: 'Kicker',        type: 'text'     },
      { name: 'headline',     label: 'Headline (use \\n to split)', type: 'textarea' },
      { name: 'body',         label: 'Body',          type: 'textarea' },
      { name: 'cardHeadline', label: 'Card Headline', type: 'text'     },
      { name: 'cardBody',     label: 'Card Body',     type: 'textarea' },
      { name: 'responseNote', label: 'Response Note', type: 'text'     },
    ],
  },

  // ── Contact ──
  {
    key: 'contact',
    label: 'Contact Info',
    fields: [
      { name: 'email',   label: 'Email',   type: 'text' },
      { name: 'phone',   label: 'Phone',   type: 'text' },
      { name: 'address', label: 'Address', type: 'text' },
    ],
  },
]

// ─── FIELD COMPONENTS ───────────────────────────────────────────────
function TextField({ label, value, onChange, type = 'text' }) {
  if (type === 'multiline') {
    const displayValue = Array.isArray(value) ? value.join('\n') : (value || '')
    return (
      <div>
        <label className="block text-xs text-gray-400 mb-1">{label}</label>
        <textarea
          rows={4}
          value={displayValue}
          onChange={e => onChange(e.target.value.split('\n'))}
          placeholder="One item per line"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 resize-y"
        />
      </div>
    )
  }
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          rows={3}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
      )}
    </div>
  )
}

// ─── SECTION EDITOR ──────────────────────────────────────────────────
function SectionEditor({ sectionDef, data, onChange, allContent, onAllChange, onSaveSuccess }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(null)
  const { authHeaders } = useAuth()

  // Resolve data for sections that are sub-keys of a parent
  const isSubSection = !!sectionDef._parent
  const resolvedData = isSubSection
    ? (allContent?.[sectionDef._parent]?.[sectionDef._subKey] ?? data)
    : data

  function resolvedOnChange(val) {
    if (isSubSection) {
      const parent = allContent?.[sectionDef._parent] || {}
      onAllChange(sectionDef._parent, { ...parent, [sectionDef._subKey]: val })
    } else {
      onChange(val)
    }
  }

  // Determine which API key to save to
  const saveKey = isSubSection ? sectionDef._parent : sectionDef.key

  async function save() {
    setStatus('saving')
    try {
      const body = isSubSection
        ? { ...(allContent?.[sectionDef._parent] || {}), [sectionDef._subKey]: resolvedData }
        : resolvedData
      const res = await fetch(`${API}/api/content/${saveKey}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      onSaveSuccess?.()
      setTimeout(() => setStatus(null), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
    }
  }

  function updateField(fieldName, value) {
    resolvedOnChange({ ...(resolvedData || {}), [fieldName]: value })
  }

  function updateArrayItem(index, fieldName, value) {
    const arr = [...(resolvedData || [])]
    arr[index] = { ...arr[index], [fieldName]: value }
    resolvedOnChange(arr)
  }

  function addArrayItem() {
    const arr = [...(resolvedData || [])]
    const blank = {}
    sectionDef.itemFields.forEach(f => { blank[f.name] = f.type === 'multiline' ? [] : '' })
    resolvedOnChange([...arr, blank])
  }

  function removeArrayItem(index) {
    const arr = [...(resolvedData || [])]
    arr.splice(index, 1)
    resolvedOnChange(arr)
  }

  const isArray = sectionDef.type === 'array'

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white">{sectionDef.label}</span>
          {isSubSection && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">
              sub-section
            </span>
          )}
          {isArray && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-400 border border-blue-800/40">
              {(resolvedData || []).length} items
            </span>
          )}
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-800 pt-4 space-y-4">
          {isArray ? (
            <>
              {(resolvedData || []).map((item, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-4 space-y-3 relative">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-500 font-medium">Item {i + 1}</div>
                    <button
                      onClick={() => removeArrayItem(i)}
                      className="text-red-500/60 hover:text-red-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  {sectionDef.itemFields.map(f => (
                    <TextField
                      key={f.name}
                      label={f.label}
                      type={f.type}
                      value={item[f.name]}
                      onChange={v => updateArrayItem(i, f.name, v)}
                    />
                  ))}
                </div>
              ))}
              <button
                onClick={addArrayItem}
                className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition-colors"
              >
                <Plus size={13} /> Add item
              </button>
            </>
          ) : (
            (sectionDef.fields || []).map(f => (
              <TextField
                key={f.name}
                label={f.label}
                type={f.type}
                value={resolvedData?.[f.name]}
                onChange={v => updateField(f.name, v)}
              />
            ))
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={status === 'saving'}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Save size={13} />
              {status === 'saving' ? 'Saving…' : 'Save'}
            </button>
            {status === 'saved' && <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle size={13} /> Saved</span>}
            {status === 'error'  && <span className="flex items-center gap-1 text-xs text-red-400"><AlertCircle size={13} /> Save failed</span>}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────
export default function CMS() {
  // Merge static defaults so CMS always shows current content even if DB is empty
  const [content, setContent] = useState(staticContent)
  const [loading, setLoading] = useState(true)
  const { refetch: refetchGlobal } = useSiteContentContext()

  useEffect(() => {
    fetch(`${API}/api/content`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) setContent({ ...staticContent, ...data })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function updateSection(key, value) {
    setContent(c => ({ ...c, [key]: value }))
  }

  // Called after any section saves — re-fetches global context so landing page updates
  function handleSaveSuccess() {
    refetchGlobal()
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">CMS Content</h1>
        <p className="text-sm text-gray-400 mt-1">
          Edit landing page content. Changes save to DB and reflect live on next page load.
          Sub-sections save to their parent key.
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading content…</div>
      ) : (
        <div className="space-y-3">
          {SECTIONS.map(section => (
            <SectionEditor
              key={section.key}
              sectionDef={section}
              data={content[section._parent ? section._parent : section.key]}
              onChange={v => updateSection(section._parent ? section._parent : section.key, v)}
              allContent={content}
              onAllChange={(key, val) => updateSection(key, val)}
              onSaveSuccess={handleSaveSuccess}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

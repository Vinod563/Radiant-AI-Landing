/**
 * Fetches section visibility config from backend API.
 * Falls back to all-visible if API is unavailable.
 */
import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3003'

const DEFAULTS = [
  { section_name: 'hero',            is_visible: true, display_order: 1  },
  { section_name: 'whatIsRadiantAI', is_visible: true, display_order: 2  },
  { section_name: 'solutions',       is_visible: true, display_order: 3  },
  { section_name: 'enablers',        is_visible: true, display_order: 4  },
  { section_name: 'caseStudy',       is_visible: true, display_order: 5  },
  { section_name: 'socialProof',     is_visible: true, display_order: 6  },
  { section_name: 'marketCarousel',  is_visible: true, display_order: 7  },
  { section_name: 'platform',        is_visible: true, display_order: 8  },
  { section_name: 'infrastructure',  is_visible: true, display_order: 9  },
  { section_name: 'cta',             is_visible: true, display_order: 10 },
]

export function useSectionVisibility() {
  const [sections, setSections] = useState(DEFAULTS)
  const [ready,    setReady]    = useState(false)

  useEffect(() => {
    fetch(`${API}/api/visibility`, { signal: AbortSignal.timeout(4000) })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.length) setSections(data) })
      .catch(() => { /* fallback = all visible */ })
      .finally(() => setReady(true))
  }, [])

  // Returns a Set of visible section names for O(1) lookup
  const visible = new Set(
    sections.filter(s => s.is_visible).map(s => s.section_name)
  )
  // Ordered list of visible section names
  const ordered = sections
    .filter(s => s.is_visible)
    .sort((a, b) => a.display_order - b.display_order)
    .map(s => s.section_name)

  return { visible, ordered, ready }
}

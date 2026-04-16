/**
 * Fetches CMS content from backend API.
 * Falls back to static siteContent.js if API is unavailable.
 */
import { useState, useEffect, useCallback } from 'react'
import * as staticContent from '../data/siteContent'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3003'

export function useSiteContent() {
  const [content, setContent] = useState(staticContent)
  const [loading, setLoading] = useState(true)

  const fetchContent = useCallback(() => {
    setLoading(true)
    return fetch(`${API}/api/content`, { signal: AbortSignal.timeout(4000) })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setContent({ ...staticContent, ...data })
        } else {
          setContent(staticContent)
        }
      })
      .catch(() => { setContent(staticContent) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchContent() }, [fetchContent])

  return { content, loading, refetch: fetchContent }
}

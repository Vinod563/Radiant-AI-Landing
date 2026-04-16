import { createContext, useContext } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const { content, loading, refetch } = useSiteContent()
  return (
    <SiteContentContext.Provider value={{ content, loading, refetch }}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContentContext() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) throw new Error('useSiteContentContext must be used within SiteContentProvider')
  return ctx
}

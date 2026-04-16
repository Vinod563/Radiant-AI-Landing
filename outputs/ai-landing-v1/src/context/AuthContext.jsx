import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || 'http://localhost:3003'

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp * 1000 > Date.now()) {
          setUser({ id: payload.id, email: payload.email, role: payload.role })
        } else {
          logout()
        }
      } catch {
        logout()
      }
    }
    setReady(true)
  }, [])

  async function login(email, password) {
    const res  = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    localStorage.setItem('admin_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('admin_token')
    setToken(null)
    setUser(null)
  }

  function authHeaders() {
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  }

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { adminApi } from '../api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const { data } = await adminApi.me()
      setUser(data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async (email, password) => {
    const { data } = await adminApi.login({ email, password })
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await adminApi.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const changePassword = useCallback(async (payload) => {
    await adminApi.changePassword(payload)
  }, [])

  return (
    <AdminAuthContext.Provider
      value={{ user, loading, login, logout, refresh, changePassword }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  }

  return context
}

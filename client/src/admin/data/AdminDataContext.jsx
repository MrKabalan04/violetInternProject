import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { adminApi } from '../api'

const AdminDataContext = createContext(null)

export function AdminDataProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchContent = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)

    try {
      const response = await adminApi.content()
      setData(response.data)
      setError('')
    } catch (requestError) {
      if (!silent) {
        setError(
          requestError.response?.data?.message ||
            'Could not load the admin content.'
        )
      }
      throw requestError
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContent().catch(() => {})
  }, [fetchContent])

  const reload = useCallback(() => fetchContent(), [fetchContent])

  const saveSingleton = useCallback(
    async (key, payload) => {
      await adminApi.updateSingleton(key, payload)
      await fetchContent(true)
    },
    [fetchContent]
  )

  const createItem = useCallback(
    async (resource, payload) => {
      const response = await adminApi.create(resource, payload)
      await fetchContent(true)
      return response.data
    },
    [fetchContent]
  )

  const updateItem = useCallback(
    async (resource, id, payload) => {
      const response = await adminApi.update(resource, id, payload)
      await fetchContent(true)
      return response.data
    },
    [fetchContent]
  )

  const deleteItem = useCallback(
    async (resource, id) => {
      await adminApi.remove(resource, id)
      await fetchContent(true)
    },
    [fetchContent]
  )

  const uploadImage = useCallback(async (file) => {
    const response = await adminApi.upload(file)
    return response.data.url
  }, [])

  if (loading) {
    return (
      <div className="admin-boot">
        <Spinner animation="border" role="status" />
        <p>Loading content…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-boot">
        <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
        <p>{error}</p>
        <Button className="admin-btn-primary" onClick={reload}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <AdminDataContext.Provider
      value={{
        data,
        reload,
        saveSingleton,
        createItem,
        updateItem,
        deleteItem,
        uploadImage,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const context = useContext(AdminDataContext)

  if (!context) {
    throw new Error('useAdminData must be used inside AdminDataProvider')
  }

  return context
}

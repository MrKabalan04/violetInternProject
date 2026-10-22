import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [status, setStatus] = useState('loading')

  const loadContent = useCallback(async () => {
    setStatus('loading')

    try {
      const { data } = await api.get('/content')
      setContent(data)
      setStatus('ready')
    } catch (error) {
      console.error('Failed to load site content:', error)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadContent()
  }, [loadContent])

  return (
    <ContentContext.Provider
      value={{ content, status, reload: loadContent }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)

  if (!context) {
    throw new Error('useContent must be used inside ContentProvider')
  }

  return context
}

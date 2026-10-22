import { Spinner } from 'react-bootstrap'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'

function ProtectedRoute() {
  const { user, loading } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="admin-boot">
        <Spinner animation="border" role="status" />
        <p>Checking your session…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute

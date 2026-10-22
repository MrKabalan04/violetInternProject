import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { useAdminData } from '../data/AdminDataContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'bi-grid-1x2-fill', end: true },
  { to: '/admin/site', label: 'Site Settings', icon: 'bi-gear-fill' },
  { to: '/admin/home', label: 'Home', icon: 'bi-house-door-fill' },
  { to: '/admin/about', label: 'About', icon: 'bi-info-circle-fill' },
  { to: '/admin/services', label: 'Services', icon: 'bi-tools' },
  { to: '/admin/track-record', label: 'Track Record', icon: 'bi-bar-chart-fill' },
  { to: '/admin/projects', label: 'Projects', icon: 'bi-kanban-fill' },
  { to: '/admin/contact', label: 'Contact', icon: 'bi-envelope-fill' },
  { to: '/admin/navigation', label: 'Navigation', icon: 'bi-signpost-split-fill' },
  { to: '/admin/social-links', label: 'Social Links', icon: 'bi-share-fill' },
  { to: '/admin/account', label: 'Account', icon: 'bi-person-gear' },
]

function AdminLayout() {
  const { user, logout } = useAdminAuth()
  const { data } = useAdminData()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink to="/admin" className="admin-brand">
          <span className="admin-brand-mark">
            {data?.site?.brandMark || 'K'}
          </span>
          <span>
            <strong>{data?.site?.brandName || 'Kabalan'}</strong>
            <small>Admin</small>
          </span>
        </NavLink>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? ' active' : ''}`
              }
            >
              <i className={`bi ${item.icon}`} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a
            className="admin-nav-link"
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
            View Website
          </a>
          <button
            type="button"
            className="admin-nav-link admin-logout"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right" aria-hidden="true" />
            Log Out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar-title">Content Management</span>
          <div className="admin-user">
            <span className="admin-user-avatar">
              {(user?.name || 'A').charAt(0).toUpperCase()}
            </span>
            <span>
              <strong>{user?.name}</strong>
              <small>{user?.email}</small>
            </span>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

import { Link } from 'react-router-dom'
import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'

const quickLinks = [
  { to: '/admin/home', label: 'Edit hero section', icon: 'bi-house-door-fill' },
  { to: '/admin/about', label: 'Update about content', icon: 'bi-info-circle-fill' },
  { to: '/admin/services', label: 'Manage services', icon: 'bi-tools' },
  { to: '/admin/projects', label: 'Manage projects', icon: 'bi-kanban-fill' },
  { to: '/admin/contact', label: 'Update contact details', icon: 'bi-envelope-fill' },
  { to: '/admin/site', label: 'Edit site settings', icon: 'bi-gear-fill' },
]

function DashboardPage() {
  const { data } = useAdminData()

  const cards = [
    {
      label: 'Projects',
      value: data.projects.items.length,
      icon: 'bi-kanban-fill',
      to: '/admin/projects',
    },
    {
      label: 'Services',
      value: data.services.items.length,
      icon: 'bi-tools',
      to: '/admin/services',
    },
    {
      label: 'Hero statistics',
      value: data.home.stats.length,
      icon: 'bi-bar-chart-fill',
      to: '/admin/home',
    },
    {
      label: 'Navigation links',
      value: data.navLinks.main.length + data.navLinks.pages.length,
      icon: 'bi-signpost-split-fill',
      to: '/admin/navigation',
    },
  ]

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Manage every part of the public website from one place."
      />

      <div className="admin-dashboard-grid">
        {cards.map((card) => (
          <Link className="admin-stat-card" to={card.to} key={card.label}>
            <span className="admin-stat-icon">
              <i className={`bi ${card.icon}`} aria-hidden="true" />
            </span>
            <span className="admin-stat-value">{card.value}</span>
            <span className="admin-stat-label">{card.label}</span>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2>Quick actions</h2>
            <p>Jump straight to the content you want to update.</p>
          </div>
        </div>
        <div className="admin-quick-grid">
          {quickLinks.map((link) => (
            <Link className="admin-quick-link" to={link.to} key={link.to}>
              <i className={`bi ${link.icon}`} aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default DashboardPage

import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminAuthProvider } from './auth/AdminAuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import { AdminDataProvider } from './data/AdminDataContext'
import AdminLayout from './components/AdminLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SitePage from './pages/SitePage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import TrackRecordPage from './pages/TrackRecordPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import NavigationPage from './pages/NavigationPage'
import SocialLinksPage from './pages/SocialLinksPage'
import AccountPage from './pages/AccountPage'
import './admin.css'

function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <AdminDataProvider>
                <AdminLayout />
              </AdminDataProvider>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="site" element={<SitePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="track-record" element={<TrackRecordPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="navigation" element={<NavigationPage />} />
            <Route path="social-links" element={<SocialLinksPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  )
}

export default AdminApp

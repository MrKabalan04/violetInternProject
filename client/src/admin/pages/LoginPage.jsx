import { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../auth/AdminAuthContext'
import PasswordInput from '../components/PasswordInput'

function LoginPage() {
  const { user, loading, login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (loading) {
    return (
      <div className="admin-boot">
        <Spinner animation="border" role="status" />
        <p>Checking your session…</p>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await login(email, password)
      const destination = location.state?.from?.pathname || '/admin'
      navigate(destination, { replace: true })
    } catch (loginError) {
      setError(
        loginError.response?.data?.message ||
          'Login failed. Please check your credentials.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <a href="/" className="admin-login-brand">
          <span className="admin-brand-mark">K</span>
          <span>
            <strong>Kabalan</strong>
            <small>Content Admin</small>
          </span>
        </a>

        <h1>Welcome back</h1>
        <p>Sign in to manage the website content.</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="admin-field" controlId="adminEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="admin@example.com"
            />
          </Form.Group>

          <PasswordInput
            id="adminPassword"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="Your password"
          />

          {error && <div className="admin-inline-error">{error}</div>}

          <Button
            type="submit"
            className="admin-btn-primary admin-login-submit"
            disabled={submitting}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </Form>

        <a className="admin-login-back" href="/">
          <i className="bi bi-arrow-left" aria-hidden="true" /> Back to website
        </a>
      </div>
    </div>
  )
}

export default LoginPage

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAdminAuth } from '../auth/AdminAuthContext'
import PageHeader from '../components/PageHeader'
import PasswordInput from '../components/PasswordInput'

function AccountPage() {
  const { user, changePassword } = useAdminAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('The new passwords do not match.')
      return
    }

    setSaving(true)

    try {
      await changePassword({ currentPassword, newPassword })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setMessage('Password updated successfully.')
    } catch (saveError) {
      const details = saveError.response?.data?.errors
      setError(
        details?.length
          ? details.map((entry) => entry.message).join(' ')
          : saveError.response?.data?.message ||
              'The password could not be updated.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Account"
        description="Change the password used to sign in to the admin."
      />

      <form className="admin-card" onSubmit={handleSubmit}>
        <div className="admin-card-header">
          <div>
            <h2>Change password</h2>
            <p>
              Signed in as {user?.email}. Choose a password of at least 6
              characters.
            </p>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-col-span-2">
            <PasswordInput
              id="currentPassword"
              label="Current Password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Enter your current password"
              disabled={saving}
            />
          </div>
          <div>
            <PasswordInput
              id="newPassword"
              label="New Password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="At least 6 characters"
              disabled={saving}
            />
          </div>
          <div>
            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Repeat the new password"
              disabled={saving}
            />
          </div>
        </div>

        <div className="admin-form-actions">
          <Button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Updating…' : 'Update Password'}
          </Button>
          {message && <span className="admin-success">{message}</span>}
          {error && <span className="admin-inline-error">{error}</span>}
        </div>
      </form>
    </>
  )
}

export default AccountPage

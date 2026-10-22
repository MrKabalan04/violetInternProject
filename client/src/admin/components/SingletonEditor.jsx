import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Field from './Field'

function SingletonEditor({
  title,
  description,
  fields,
  initial,
  onSave,
  saveLabel = 'Save Changes',
}) {
  const [values, setValues] = useState(initial ?? {})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setValues(initial ?? {})
    setMessage('')
    setError('')
  }, [initial])

  function handleChange(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    const payload = Object.fromEntries(
      fields.map((field) => [field.name, values[field.name]])
    )

    try {
      await onSave(payload)
      setMessage('Saved successfully.')
    } catch (saveError) {
      const details = saveError.response?.data?.errors
      setError(
        details?.length
          ? details.map((entry) => entry.message).join(' ')
          : saveError.response?.data?.message ||
              'The changes could not be saved.'
      )
    } finally {
      setSaving(false)
    }
  }

  if (!initial) {
    return (
      <div className="admin-card">
        <p className="admin-empty">This content section has not been seeded yet.</p>
      </div>
    )
  }

  return (
    <form className="admin-card" onSubmit={handleSubmit}>
      <div className="admin-card-header">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>

      <div className="admin-form-grid">
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              field.type === 'textarea' || field.type === 'image'
                ? 'admin-col-span-2'
                : ''
            }
          >
            <Field
              field={field}
              value={values[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div className="admin-form-actions">
        <Button type="submit" className="admin-btn-primary" disabled={saving}>
          {saving ? 'Saving…' : saveLabel}
        </Button>
        {message && <span className="admin-success">{message}</span>}
        {error && <span className="admin-inline-error">{error}</span>}
      </div>
    </form>
  )
}

export default SingletonEditor

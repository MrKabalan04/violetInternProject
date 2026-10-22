import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Field from './Field'

function blankValues(fields) {
  return Object.fromEntries(
    fields.map((field) => {
      if (field.default !== undefined) return [field.name, field.default]
      if (field.type === 'checkbox') return [field.name, false]
      if (field.type === 'number') return [field.name, 0]
      if (field.type === 'select') return [field.name, field.options?.[0]?.value ?? '']
      return [field.name, '']
    })
  )
}

function itemTitle(item) {
  return (
    item.title ||
    item.label ||
    item.platform ||
    item.value ||
    item.name ||
    `Item #${item.id}`
  )
}

function itemMeta(item) {
  return [
    item.category,
    item.location,
    item.groupName,
    item.url,
    item.href,
    item.description,
  ]
    .filter(Boolean)
    .slice(0, 2)
    .join(' · ')
}

function CrudManager({
  title,
  description,
  resource,
  itemLabel = 'item',
  fields,
  items,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [values, setValues] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const rows = items || []

  function openCreate() {
    setEditingId(null)
    setValues(blankValues(fields))
    setFormOpen(true)
    setError('')
    setMessage('')
  }

  function openEdit(item) {
    setEditingId(item.id)
    setValues(
      Object.fromEntries(fields.map((field) => [field.name, item[field.name]]))
    )
    setFormOpen(true)
    setError('')
    setMessage('')
  }

  function closeForm() {
    setFormOpen(false)
    setEditingId(null)
    setValues({})
    setError('')
  }

  function handleChange(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')

    const payload = Object.fromEntries(
      fields.map((field) => [field.name, values[field.name]])
    )

    try {
      if (editingId) {
        await onUpdate(resource, editingId, payload)
        setMessage(`${itemLabel} updated.`)
      } else {
        await onCreate(resource, payload)
        setMessage(`${itemLabel} added.`)
      }
      closeForm()
    } catch (saveError) {
      const details = saveError.response?.data?.errors
      setError(
        details?.length
          ? details.map((entry) => entry.message).join(' ')
          : saveError.response?.data?.message ||
              `The ${itemLabel} could not be saved.`
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(`Delete "${itemTitle(item)}"?`)

    if (!confirmed) return

    setError('')
    setMessage('')

    try {
      await onDelete(resource, item.id)
      setMessage(`${itemLabel} deleted.`)
    } catch (deleteError) {
      setError(
        deleteError.response?.data?.message ||
          `The ${itemLabel} could not be deleted.`
      )
    }
  }

  return (
    <section className="admin-card">
      <div className="admin-card-header admin-card-header-row">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <Button className="admin-btn-primary" onClick={openCreate}>
          <i className="bi bi-plus-lg" aria-hidden="true" /> Add {itemLabel}
        </Button>
      </div>

      {formOpen && (
        <form className="admin-inline-form" onSubmit={handleSubmit}>
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
              {saving ? 'Saving…' : editingId ? 'Save Changes' : `Add ${itemLabel}`}
            </Button>
            <Button
              type="button"
              className="admin-btn-ghost"
              onClick={closeForm}
              disabled={saving}
            >
              Cancel
            </Button>
            {error && <span className="admin-inline-error">{error}</span>}
          </div>
        </form>
      )}

      {!formOpen && error && <div className="admin-inline-error">{error}</div>}
      {message && <div className="admin-success admin-success-block">{message}</div>}

      {rows.length === 0 ? (
        <p className="admin-empty">No {itemLabel} entries yet.</p>
      ) : (
        <div className="admin-list">
          {rows.map((item) => (
            <div className="admin-list-row" key={item.id}>
              <div className="admin-list-main">
                {item.icon && (
                  <span className="admin-list-icon">
                    <i className={`bi ${item.icon}`} aria-hidden="true" />
                  </span>
                )}
                <div>
                  <strong>{itemTitle(item)}</strong>
                  {itemMeta(item) && <span>{itemMeta(item)}</span>}
                </div>
              </div>
              <div className="admin-list-actions">
                <Button
                  className="admin-btn-ghost"
                  onClick={() => openEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  className="admin-btn-danger"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CrudManager

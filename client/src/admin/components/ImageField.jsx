import { useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { adminApi } from '../api'

function ImageField({ label, name, value, onChange, help }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    setUploading(true)
    setError('')

    try {
      const { data } = await adminApi.upload(file)
      onChange(name, data.url)
    } catch (uploadError) {
      setError(
        uploadError.response?.data?.message ||
          'The image could not be uploaded.'
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <Form.Group className="admin-field">
      <Form.Label>{label}</Form.Label>
      {value ? (
        <div className="admin-image-preview">
          <img src={value} alt="" />
        </div>
      ) : (
        <div className="admin-image-empty">
          <i className="bi bi-image" aria-hidden="true" />
          No image uploaded yet
        </div>
      )}
      <div className="admin-upload-row">
        <Form.Control
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          onChange={handleFile}
          disabled={uploading}
        />
        {uploading && (
          <span className="admin-upload-status">
            <Spinner animation="border" size="sm" /> Uploading…
          </span>
        )}
      </div>
      {help && <Form.Text>{help}</Form.Text>}
      {error && <div className="admin-inline-error">{error}</div>}
    </Form.Group>
  )
}

export default ImageField

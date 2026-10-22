import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete = 'current-password',
  placeholder = 'Password',
  help,
  disabled = false,
}) {
  const [visible, setVisible] = useState(false)

  return (
    <Form.Group className="admin-field">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          id={id}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required
        />
        <Button
          type="button"
          variant="outline-secondary"
          className="admin-password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          disabled={disabled}
        >
          <i
            className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`}
            aria-hidden="true"
          />
        </Button>
      </InputGroup>
      {help && <Form.Text>{help}</Form.Text>}
    </Form.Group>
  )
}

export default PasswordInput

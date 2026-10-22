import { Form } from 'react-bootstrap'
import ImageField from './ImageField'

function Field({ field, value, onChange }) {
  const {
    name,
    label,
    type = 'text',
    rows = 4,
    options = [],
    help,
    placeholder,
    min,
  } = field

  if (type === 'image') {
    return (
      <ImageField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        help={help}
      />
    )
  }

  if (type === 'checkbox') {
    return (
      <Form.Group className="admin-field admin-field-check">
        <Form.Check
          type="checkbox"
          id={`admin-field-${name}`}
          label={label}
          checked={Boolean(value)}
          onChange={(event) => onChange(name, event.target.checked)}
        />
        {help && <Form.Text>{help}</Form.Text>}
      </Form.Group>
    )
  }

  if (type === 'select') {
    return (
      <Form.Group className="admin-field">
        <Form.Label htmlFor={`admin-field-${name}`}>{label}</Form.Label>
        <Form.Select
          id={`admin-field-${name}`}
          value={value ?? ''}
          onChange={(event) => onChange(name, event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        {help && <Form.Text>{help}</Form.Text>}
      </Form.Group>
    )
  }

  if (type === 'textarea') {
    return (
      <Form.Group className="admin-field">
        <Form.Label htmlFor={`admin-field-${name}`}>{label}</Form.Label>
        <Form.Control
          as="textarea"
          id={`admin-field-${name}`}
          rows={rows}
          value={value ?? ''}
          onChange={(event) => onChange(name, event.target.value)}
          placeholder={placeholder}
        />
        {help && <Form.Text>{help}</Form.Text>}
      </Form.Group>
    )
  }

  return (
    <Form.Group className="admin-field">
      <Form.Label htmlFor={`admin-field-${name}`}>{label}</Form.Label>
      <Form.Control
        id={`admin-field-${name}`}
        type={type}
        min={min}
        value={value ?? ''}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
      />
      {help && <Form.Text>{help}</Form.Text>}
    </Form.Group>
  )
}

export default Field

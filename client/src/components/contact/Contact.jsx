import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './Contact.css'

function Contact({ content, details, services }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setSent(true)
  }

  return (
    <section id="contact" className="contact-section">
      <Container>
        <div className="contact-grid">
          <div className="contact-info">
            <span className="contact-eyebrow">
              <i className={`bi ${content.eyebrowIcon}`} aria-hidden="true" />
              {content.eyebrow}
            </span>
            <h2>{content.heading}</h2>
            <p className="contact-lead">{content.lead}</p>

            <ul className="contact-details">
              {(details || []).map((detail) => (
                <li key={detail.id}>
                  <span className="contact-detail-icon">
                    <i className={`bi ${detail.icon}`} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="contact-detail-label">{detail.label}</span>
                    {detail.href ? (
                      <a href={detail.href} className="contact-detail-value">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="contact-detail-value">{detail.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-card">
            <h3>{content.cardTitle}</h3>
            <p>{content.cardDescription}</p>

            <Form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <Form.Group controlId="contactName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control required placeholder="Your name" />
                </Form.Group>
                <Form.Group controlId="contactEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </Form.Group>
              </div>

              <div className="contact-form-row">
                <Form.Group controlId="contactPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" placeholder="+961 3 000 000" />
                </Form.Group>
                <Form.Group controlId="contactService">
                  <Form.Label>Service</Form.Label>
                  <Form.Select required defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {(services || []).map((service) => (
                      <option key={service.id}>{service.title}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <Form.Group controlId="contactMessage" className="mb-3">
                <Form.Label>Project Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  required
                  placeholder="Tell us a little about your project"
                />
              </Form.Group>

              <Button type="submit" className="contact-submit">
                Send Message{' '}
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Button>

              {sent && (
                <p className="contact-note" role="status">
                  Thanks for reaching out. We will be in touch shortly.
                </p>
              )}
            </Form>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Contact

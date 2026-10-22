import { Button, Container } from 'react-bootstrap'
import './About.css'

function About({ content, features }) {
  return (
    <section id="about" className="about-section">
      <Container>
        <div className="about-grid">
          <div className="about-media">
            <div className="about-media-primary">
              <img
                src={content.imagePrimary}
                alt="Kabalan team member working on site"
              />
              <div className="about-badge">
                <span className="about-badge-value">{content.badgeValue}</span>
                <span className="about-badge-label">{content.badgeLabel}</span>
              </div>
            </div>

            <div className="about-media-secondary">
              <img
                src={content.imageSecondary}
                alt="Excavator working at sunset"
              />
            </div>
          </div>

          <div className="about-content">
            <span className="about-eyebrow">
              <i className={`bi ${content.eyebrowIcon}`} aria-hidden="true" />
              {content.eyebrow}
            </span>
            <h2>{content.heading}</h2>
            <p className="about-description">{content.description}</p>

            <div className="about-features">
              {(features || []).map((feature) => (
                <div className="about-feature" key={feature.id}>
                  <i
                    className={`bi ${feature.icon} about-feature-icon`}
                    aria-hidden="true"
                  />
                  <h3 className="about-feature-title">{feature.title}</h3>
                  <p className="about-feature-text">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <Button href={content.primaryButtonHref} className="about-btn-primary">
                {content.primaryButtonLabel}{' '}
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Button>
              <Button
                href={content.secondaryButtonHref}
                className="about-btn-secondary"
              >
                {content.secondaryButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About

import { Container } from 'react-bootstrap'
import './Services.css'

function Services({ content, items }) {
  return (
    <section id="services" className="services-section">
      <Container>
        <div className="services-header">
          <h2 className="services-title">{content.title}</h2>
          <p className="services-subtitle">{content.subtitle}</p>
        </div>

        <div className="services-grid">
          <div className="services-media">
            <img src={content.mediaImage} alt="Kabalan team on a construction site" />
            <div className="services-media-overlay">
              <h3>{content.mediaHeading}</h3>
              <a href={content.mediaLinkHref} className="services-media-link">
                {content.mediaLinkLabel}{' '}
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </div>

          {(items || []).map((service) => (
            <article className="service-card" key={service.id}>
              <div className="service-card-head">
                <span className="service-card-icon">
                  <i className={`bi ${service.icon}`} aria-hidden="true" />
                </span>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-text">{service.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Services

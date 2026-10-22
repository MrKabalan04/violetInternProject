import { Container } from 'react-bootstrap'
import './TrackRecord.css'

function TrackRecord({ content, stats }) {
  return (
    <section className="track-section">
      <Container>
        <div className="track-grid">
          <div className="track-intro">
            <span className="track-eyebrow">{content.eyebrow}</span>
            <h2 className="track-title">{content.title}</h2>
            <p className="track-description">{content.description}</p>
            <a href={content.linkHref} className="track-link">
              {content.linkLabel}{' '}
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </a>
          </div>

          {(stats || []).map((stat) => (
            <article className="track-card" key={stat.id}>
              <span className="track-card-icon">
                <i className={`bi ${stat.icon}`} aria-hidden="true" />
              </span>
              <div className="track-card-body">
                <span className="track-card-value">{stat.value}</span>
                <span className="track-card-label">{stat.label}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TrackRecord

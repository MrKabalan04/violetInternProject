import { Button, Container } from 'react-bootstrap'
import './Home.css'

function Home({ content, stats }) {
  return (
    <section
      id="home"
      className="home-hero"
      style={{ backgroundImage: `url(${content.backgroundImage})` }}
    >
      <div className="home-overlay" aria-hidden="true" />

      <Container className="home-content">
        <span className="home-eyebrow">
          <i className={`bi ${content.eyebrowIcon}`} aria-hidden="true" />
          {content.eyebrow}
        </span>
        <h1>
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h1>
        <p>{content.description}</p>
        <div className="home-actions">
          <Button href={content.primaryButtonHref} className="home-btn-primary">
            {content.primaryButtonLabel}
          </Button>
          <Button href={content.secondaryButtonHref} className="home-btn-secondary">
            {content.secondaryButtonLabel}{' '}
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </Button>
        </div>
      </Container>

      <div className="home-stats">
        {(stats || []).map((stat) => (
          <div className="home-stat" key={stat.id}>
            <span className="home-stat-value">{stat.value}</span>
            <span className="home-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Home

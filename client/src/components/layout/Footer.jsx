import { Container } from 'react-bootstrap'
import './Footer.css'

function Footer({ site, navLinks, services, socialLinks }) {
  const companyLinks = (navLinks || []).filter((link) => link.showInFooter)
  const footerServices = (services || []).slice(0, 5)

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="#home" className="footer-brand">
              <span className="footer-mark">{site?.brandMark || 'K'}</span>
              <span className="footer-name">{site?.brandName || 'Kabalan'}</span>
            </a>
            <p>{site?.footerDescription}</p>
            <div className="footer-socials">
              {(socialLinks || []).map((link) => (
                <a key={link.id} href={link.url} aria-label={link.platform}>
                  <i className={`bi ${link.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              {footerServices.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <ul className="footer-contact">
              <li>
                <i className="bi bi-telephone-fill" aria-hidden="true" />
                <a href={site?.phoneHref || '#'}>{site?.phone}</a>
              </li>
              <li>
                <i className="bi bi-envelope-fill" aria-hidden="true" />
                <a href={`mailto:${site?.email}`}>{site?.email}</a>
              </li>
              <li>
                <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                <span>{site?.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{site?.copyrightText}</span>
          <div className="footer-legal">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

import { useState } from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './Navbar.css'

function SiteNavbar({ site, navLinks }) {
  const [activeKey, setActiveKey] = useState('#home')

  const mainLinks = navLinks?.main ?? []
  const pageLinks = navLinks?.pages ?? []
  const linksBeforePages = pageLinks.length
    ? mainLinks.slice(0, -1)
    : mainLinks
  const linksAfterPages = pageLinks.length ? mainLinks.slice(-1) : []

  return (
    <Navbar expand="lg" sticky="top" className="site-navbar" collapseOnSelect>
      <Container>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center gap-2"
          onClick={() => setActiveKey('#home')}
        >
          <span className="brand-mark">{site?.brandMark || 'K'}</span>
          <span className="brand-name">{site?.brandName || 'Kabalan'}</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto me-lg-3 site-nav-links">
            {linksBeforePages.map((link) => (
              <Nav.Link
                key={link.id}
                href={link.href}
                active={activeKey === link.href}
                onClick={() => setActiveKey(link.href)}
              >
                {link.label}
              </Nav.Link>
            ))}

            {pageLinks.length > 0 && (
              <NavDropdown
                title={
                  <span>
                    Pages{' '}
                    <i className="bi bi-chevron-down nav-caret" aria-hidden="true" />
                  </span>
                }
                id="pages-dropdown"
              >
                {pageLinks.map((link) => (
                  <NavDropdown.Item key={link.id} href={link.href}>
                    {link.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {linksAfterPages.map((link) => (
              <Nav.Link
                key={link.id}
                href={link.href}
                active={activeKey === link.href}
                onClick={() => setActiveKey(link.href)}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0">
            <a href={site?.phoneHref || '#'} className="phone-link">
              <i className="bi bi-telephone-fill" aria-hidden="true" />
              <span>{site?.phone}</span>
            </a>
            <Button className="estimate-btn" href="#contact">
              Get Estimate
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SiteNavbar

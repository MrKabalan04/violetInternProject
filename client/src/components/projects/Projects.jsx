import { useEffect, useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import './Projects.css'

function Projects({ content, items, categories }) {
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = items || []
  const filters = useMemo(
    () => ['All Projects', ...(categories || [])],
    [categories]
  )

  useEffect(() => {
    if (activeFilter !== 'All Projects' && !filters.includes(activeFilter)) {
      setActiveFilter('All Projects')
    }
  }, [activeFilter, filters])

  const visibleProjects =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  useEffect(() => {
    if (!selectedProject) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <section id="projects" className="projects-section">
      <Container>
        <div className="projects-header">
          <h2 className="projects-title">{content.title}</h2>
          <p className="projects-subtitle">{content.subtitle}</p>
        </div>

        <div className="projects-filters">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`projects-filter ${
                activeFilter === filter ? 'is-active' : ''
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {visibleProjects.length === 0 ? (
          <p className="projects-empty">No projects to show yet.</p>
        ) : (
          <div className="projects-grid" key={activeFilter}>
            {visibleProjects.map((project, index) => (
              <article
                className="project-card"
                key={project.id}
                style={{ animationDelay: `${index * 70}ms` }}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedProject(project)
                  }
                }}
              >
                <div className="project-media">
                  <img src={project.image} alt={project.title} />
                  <span className="project-category">{project.category}</span>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>

      {selectedProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              aria-label="Close project"
              onClick={() => setSelectedProject(null)}
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>

            <div className="project-modal-media">
              <img src={selectedProject.image} alt={selectedProject.title} />
              <span className="project-category">{selectedProject.category}</span>
            </div>

            <div className="project-modal-body">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.longDescription}</p>
              <dl className="project-meta">
                <div>
                  <dt>Location</dt>
                  <dd>{selectedProject.location}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>{selectedProject.year}</dd>
                </div>
                <div>
                  <dt>Scope</dt>
                  <dd>{selectedProject.scope}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects

import { ContentProvider, useContent } from './context/ContentContext'
import SiteStatus from './components/common/SiteStatus'
import SiteNavbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './components/home/Home'
import About from './components/about/About'
import Services from './components/services/Services'
import TrackRecord from './components/trackRecord/TrackRecord'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'

function PublicSite() {
  const { content, status, reload } = useContent()

  if (status === 'loading') {
    return <SiteStatus status="loading" />
  }

  if (status === 'error' || !content?.site || !content?.home?.content) {
    return <SiteStatus status="error" onRetry={reload} />
  }

  return (
    <>
      <SiteNavbar site={content.site} navLinks={content.navLinks} />
      <main>
        <Home content={content.home.content} stats={content.home.stats} />
        <About content={content.about.content} features={content.about.features} />
        <Services content={content.services.content} items={content.services.items} />
        <TrackRecord
          content={content.trackRecord.content}
          stats={content.trackRecord.stats}
        />
        <Projects
          content={content.projects.content}
          items={content.projects.items}
          categories={content.projects.categories}
        />
        <Contact
          content={content.contact.content}
          details={content.contact.details}
          services={content.services.items}
        />
      </main>
      <Footer
        site={content.site}
        navLinks={[...content.navLinks.main, ...content.navLinks.pages]}
        services={content.services.items}
        socialLinks={content.socialLinks}
      />
    </>
  )
}

function App() {
  return (
    <ContentProvider>
      <PublicSite />
    </ContentProvider>
  )
}

export default App

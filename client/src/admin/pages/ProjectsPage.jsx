import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import SingletonEditor from '../components/SingletonEditor'
import CrudManager from '../components/CrudManager'

const contentFields = [
  { name: 'title', label: 'Section Title' },
  { name: 'subtitle', label: 'Subtitle' },
]

const projectFields = [
  { name: 'title', label: 'Project Title' },
  { name: 'category', label: 'Category', help: 'Filters are generated from categories.' },
  { name: 'image', label: 'Project Image', type: 'image' },
  { name: 'description', label: 'Card Description', type: 'textarea' },
  { name: 'longDescription', label: 'Modal Description', type: 'textarea', rows: 5 },
  { name: 'location', label: 'Location' },
  { name: 'year', label: 'Year' },
  { name: 'scope', label: 'Scope' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function ProjectsPage() {
  const {
    data,
    saveSingleton,
    createItem,
    updateItem,
    deleteItem,
  } = useAdminData()

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage the project cards, their details, and the filter categories."
      />
      <SingletonEditor
        title="Projects section"
        description="Heading and subtitle above the project grid."
        fields={contentFields}
        initial={data.projects.content}
        onSave={(payload) => saveSingleton('projects-content', payload)}
      />
      <CrudManager
        title="Project cards"
        description="Each project appears in the grid and opens in the detail modal."
        resource="projects"
        itemLabel="project"
        fields={projectFields}
        items={data.projects.items}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default ProjectsPage

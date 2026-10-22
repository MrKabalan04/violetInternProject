import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import SingletonEditor from '../components/SingletonEditor'
import CrudManager from '../components/CrudManager'

const contentFields = [
  { name: 'title', label: 'Section Title' },
  { name: 'subtitle', label: 'Subtitle' },
  { name: 'mediaImage', label: 'Feature Image', type: 'image' },
  { name: 'mediaHeading', label: 'Image Overlay Heading' },
  { name: 'mediaLinkLabel', label: 'Image Link Label' },
  { name: 'mediaLinkHref', label: 'Image Link URL' },
]

const serviceFields = [
  {
    name: 'icon',
    label: 'Icon',
    help: 'Bootstrap icon class, for example bi-house-door-fill',
  },
  { name: 'title', label: 'Service Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function ServicesPage() {
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
        title="Services"
        description="Edit the services intro, feature image, and service cards."
      />
      <SingletonEditor
        title="Services section"
        description="Heading and image content for the services grid."
        fields={contentFields}
        initial={data.services.content}
        onSave={(payload) => saveSingleton('services-content', payload)}
      />
      <CrudManager
        title="Service cards"
        description="The services listed in the grid and the contact form."
        resource="services"
        itemLabel="service"
        fields={serviceFields}
        items={data.services.items}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default ServicesPage

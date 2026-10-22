import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import SingletonEditor from '../components/SingletonEditor'
import CrudManager from '../components/CrudManager'

const contentFields = [
  { name: 'eyebrow', label: 'Eyebrow Text' },
  {
    name: 'eyebrowIcon',
    label: 'Eyebrow Icon',
    help: 'Bootstrap icon class, for example bi-buildings-fill',
  },
  { name: 'heading', label: 'Heading' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'badgeValue', label: 'Badge Value' },
  { name: 'badgeLabel', label: 'Badge Label' },
  { name: 'imagePrimary', label: 'Primary Image', type: 'image' },
  { name: 'imageSecondary', label: 'Secondary Image', type: 'image' },
  { name: 'primaryButtonLabel', label: 'Primary Button Label' },
  { name: 'primaryButtonHref', label: 'Primary Button Link' },
  { name: 'secondaryButtonLabel', label: 'Secondary Button Label' },
  { name: 'secondaryButtonHref', label: 'Secondary Button Link' },
]

const featureFields = [
  {
    name: 'icon',
    label: 'Icon',
    help: 'Bootstrap icon class, for example bi-shield-check',
  },
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function AboutPage() {
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
        title="About"
        description="Edit the company story, images, buttons, and feature cards."
      />
      <SingletonEditor
        title="About section"
        description="Main copy and imagery for the About section."
        fields={contentFields}
        initial={data.about.content}
        onSave={(payload) => saveSingleton('about', payload)}
      />
      <CrudManager
        title="Feature cards"
        description="The four small cards shown beside the About copy."
        resource="about-features"
        itemLabel="feature"
        fields={featureFields}
        items={data.about.features}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default AboutPage

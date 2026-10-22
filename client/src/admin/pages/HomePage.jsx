import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import SingletonEditor from '../components/SingletonEditor'
import CrudManager from '../components/CrudManager'

const contentFields = [
  { name: 'eyebrow', label: 'Eyebrow Text' },
  {
    name: 'eyebrowIcon',
    label: 'Eyebrow Icon',
    help: 'Bootstrap icon class, for example bi-patch-check-fill',
  },
  { name: 'titleLine1', label: 'Headline Line 1' },
  { name: 'titleLine2', label: 'Headline Line 2' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'backgroundImage', label: 'Background Image', type: 'image' },
  { name: 'primaryButtonLabel', label: 'Primary Button Label' },
  { name: 'primaryButtonHref', label: 'Primary Button Link' },
  { name: 'secondaryButtonLabel', label: 'Secondary Button Label' },
  { name: 'secondaryButtonHref', label: 'Secondary Button Link' },
]

const statFields = [
  { name: 'value', label: 'Value' },
  { name: 'label', label: 'Label' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function HomePage() {
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
        title="Home"
        description="Edit the hero section and the statistics shown below it."
      />
      <SingletonEditor
        title="Hero section"
        description="The first section visitors see."
        fields={contentFields}
        initial={data.home.content}
        onSave={(payload) => saveSingleton('home', payload)}
      />
      <CrudManager
        title="Hero statistics"
        description="Numbers displayed along the bottom of the hero."
        resource="home-stats"
        itemLabel="statistic"
        fields={statFields}
        items={data.home.stats}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default HomePage

import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import SingletonEditor from '../components/SingletonEditor'
import CrudManager from '../components/CrudManager'

const contentFields = [
  { name: 'eyebrow', label: 'Eyebrow Text' },
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'linkLabel', label: 'Link Label' },
  { name: 'linkHref', label: 'Link URL' },
]

const statFields = [
  {
    name: 'icon',
    label: 'Icon',
    help: 'Bootstrap icon class, for example bi-buildings-fill',
  },
  { name: 'value', label: 'Value' },
  { name: 'label', label: 'Label' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function TrackRecordPage() {
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
        title="Track Record"
        description="Edit the track record copy and the statistics shown in the grid."
      />
      <SingletonEditor
        title="Track record section"
        description="Intro text and link for the statistics block."
        fields={contentFields}
        initial={data.trackRecord.content}
        onSave={(payload) => saveSingleton('track-record', payload)}
      />
      <CrudManager
        title="Track record statistics"
        description="Counters displayed beside the intro."
        resource="track-stats"
        itemLabel="statistic"
        fields={statFields}
        items={data.trackRecord.stats}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default TrackRecordPage

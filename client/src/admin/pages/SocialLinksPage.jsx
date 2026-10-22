import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import CrudManager from '../components/CrudManager'

const socialFields = [
  { name: 'platform', label: 'Platform Name' },
  {
    name: 'icon',
    label: 'Icon',
    help: 'Bootstrap icon class, for example bi-facebook',
  },
  { name: 'url', label: 'Profile URL' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function SocialLinksPage() {
  const {
    data,
    createItem,
    updateItem,
    deleteItem,
  } = useAdminData()

  return (
    <>
      <PageHeader
        title="Social Links"
        description="Manage the social icons shown in the footer."
      />
      <CrudManager
        title="Social profiles"
        description="Each row becomes an icon in the footer social list."
        resource="social-links"
        itemLabel="social link"
        fields={socialFields}
        items={data.socialLinks}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default SocialLinksPage

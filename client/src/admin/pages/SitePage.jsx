import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import SingletonEditor from '../components/SingletonEditor'

const fields = [
  { name: 'brandName', label: 'Brand Name' },
  { name: 'brandMark', label: 'Brand Mark' },
  { name: 'phone', label: 'Phone' },
  { name: 'phoneHref', label: 'Phone Link', help: 'Example: tel:+9613562190' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'address', label: 'Address' },
  { name: 'workingHours', label: 'Working Hours' },
  {
    name: 'footerDescription',
    label: 'Footer Description',
    type: 'textarea',
  },
  { name: 'copyrightText', label: 'Copyright Text' },
]

function SitePage() {
  const { data, saveSingleton } = useAdminData()

  return (
    <>
      <PageHeader
        title="Site Settings"
        description="Shared brand and contact details used across the navbar and footer."
      />
      <SingletonEditor
        title="Global details"
        description="These values appear in the navigation bar, footer, and contact areas."
        fields={fields}
        initial={data.site}
        onSave={(payload) => saveSingleton('site', payload)}
      />
    </>
  )
}

export default SitePage

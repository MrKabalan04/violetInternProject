import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import CrudManager from '../components/CrudManager'

const linkFields = [
  { name: 'label', label: 'Label' },
  { name: 'href', label: 'Link URL', help: 'Section anchors use #, for example #about' },
  {
    name: 'groupName',
    label: 'Menu Group',
    type: 'select',
    options: [
      { value: 'main', label: 'Main navigation' },
      { value: 'pages', label: 'Pages dropdown' },
    ],
    default: 'main',
  },
  {
    name: 'showInFooter',
    label: 'Show in footer',
    type: 'checkbox',
    default: false,
  },
  {
    name: 'isActive',
    label: 'Visible on site',
    type: 'checkbox',
    default: true,
  },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function NavigationPage() {
  const {
    data,
    createItem,
    updateItem,
    deleteItem,
  } = useAdminData()

  return (
    <>
      <PageHeader
        title="Navigation"
        description="Manage the main navbar links, the Pages dropdown, and footer links."
      />
      <CrudManager
        title="Navigation links"
        description="Inactive links stay in the database but are hidden from the public site."
        resource="nav-links"
        itemLabel="navigation link"
        fields={linkFields}
        items={[...data.navLinks.main, ...data.navLinks.pages]}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default NavigationPage

import { useAdminData } from '../data/AdminDataContext'
import PageHeader from '../components/PageHeader'
import SingletonEditor from '../components/SingletonEditor'
import CrudManager from '../components/CrudManager'

const contentFields = [
  { name: 'eyebrow', label: 'Eyebrow Text' },
  {
    name: 'eyebrowIcon',
    label: 'Eyebrow Icon',
    help: 'Bootstrap icon class, for example bi-chat-square-dots-fill',
  },
  { name: 'heading', label: 'Heading' },
  { name: 'lead', label: 'Intro Text', type: 'textarea' },
  { name: 'cardTitle', label: 'Form Card Title' },
  { name: 'cardDescription', label: 'Form Card Description', type: 'textarea' },
]

const detailFields = [
  {
    name: 'icon',
    label: 'Icon',
    help: 'Bootstrap icon class, for example bi-telephone-fill',
  },
  { name: 'label', label: 'Label' },
  { name: 'value', label: 'Value' },
  { name: 'href', label: 'Link URL', help: 'Optional. Example: tel:+9613562190' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
]

function ContactPage() {
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
        title="Contact"
        description="Edit the contact copy, form card text, and contact detail rows."
      />
      <SingletonEditor
        title="Contact section"
        description="Text shown beside and inside the contact form."
        fields={contentFields}
        initial={data.contact.content}
        onSave={(payload) => saveSingleton('contact', payload)}
      />
      <CrudManager
        title="Contact details"
        description="Phone, email, location, and working hours shown in the contact list."
        resource="contact-details"
        itemLabel="contact detail"
        fields={detailFields}
        items={data.contact.details}
        onCreate={createItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </>
  )
}

export default ContactPage

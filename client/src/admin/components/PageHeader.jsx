function PageHeader({ title, description }) {
  return (
    <div className="admin-page-header">
      <span className="admin-page-eyebrow">Content Management</span>
      <h1 className="admin-page-title">{title}</h1>
      {description && <p className="admin-page-description">{description}</p>}
    </div>
  )
}

export default PageHeader

import { Button, Spinner } from 'react-bootstrap'

function SiteStatus({ status, onRetry }) {
  const isLoading = status === 'loading'

  return (
    <div className="site-status">
      <span className="site-status-mark">K</span>
      <h1 className="site-status-title">Kabalan</h1>
      {isLoading ? (
        <>
          <Spinner animation="border" role="status" className="site-status-spinner" />
          <p className="site-status-text">Loading site content…</p>
        </>
      ) : (
        <>
          <p className="site-status-text">
            We could not load the site content. Please check that the API and
            database are running.
          </p>
          {onRetry && (
            <Button className="site-status-retry" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default SiteStatus

import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

const OverviewCompleation = () => {
  return (
    <>
      <div className="hstack gap-4 justify-content-between mb-16">
        <h5 className="card-title fw-semibold mb-0">Compleation</h5>
        <Link to="#!" className="icon-link icon-link-hover link-primary">
          <span>Complete</span>
          <i className="fi fi-rr-arrow-small-right bi"></i>
        </Link>
      </div>
      <div className="d-flex align-items-center flex-column">
        <div className="d-flex justify-content-between w-100 mt-auto mb-2">
          <span className="fw-medium text-muted">Profile compleation</span>
          <span className="fw-bold">78%</span>
        </div>
        <ProgressBar now={78} className="w-100  rounded" style={{ height: '5px' }} />
      </div>
    </>
  )
}

export default OverviewCompleation

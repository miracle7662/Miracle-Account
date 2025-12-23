import { useState } from 'react'
import ActivityOffcanvas from './Activity/ActivityOffcanvas'

const Activity = () => {
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false)
  const openOffcanvas = () => {
    setShowOffcanvas(true)
  }

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false)
  }

  return (
    <>
      <div className="header-btn" onClick={openOffcanvas}>
        <i className="fi fi-rr-pulse" />
        <div
          className="rounded-circle bg-primary position-absolute translate-middle-y top-25"
          style={{ width: '6px', height: '6px' }}
        ></div>
      </div>
      {showOffcanvas && (
        <ActivityOffcanvas show={showOffcanvas} handleClose={handleCloseOffcanvas} />
      )}
    </>
  )
}

export default Activity

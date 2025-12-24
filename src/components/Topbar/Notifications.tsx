import { useState } from 'react'
import { Badge, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import PerfectScrollbar from 'react-perfect-scrollbar'
import BgCircleShapeStyle from '../Misc/BgCircleShape'
import NotificationOffcanvas from './Notifications/NotificationOffcanvas'
import { notifyData } from './data/notifyData'
import 'react-perfect-scrollbar/dist/css/styles.css'

const Notifications = () => {
  const notify = notifyData || []
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true)
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false)

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
    const message = isSoundOn ? 'Sound turned off' : 'Sound turned on'

    toast(message, {
      icon: isSoundOn ? '🔕' : '🔔',
    })
  }

  const openOffcanvas = () => {
    setShowOffcanvas(true)
    setDropDownOpen(false)
  }

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false)
  }

  return (
    <>
      <Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
        <Dropdown.Toggle
          as="a"
          className="arrow-none header-btn"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          role="button"
          onClick={toggleDropDown}
        >
          <i className="fi fi-rr-bell" />
          <Badge
            bg="primary"
            className="rounded-circle position-absolute translate-middle-y top-30 start-40"
          >
            5
          </Badge>
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" className="dropdown-xl py-0 px-0 overflow-hidden">
          <div
            className="p-0 border-top-0 border-start-0 border-end-0 border-dashed border"
            onClick={toggleDropDown}
          >
            <div className="bg-primary text-white px-4 py-4" style={BgCircleShapeStyle}>
              <h5 className="fw-bold text-white mb-1">
                <span>Notifications</span>
                <span className="badge  bg-body text-dark ms-2 rounded-pill">12+</span>
              </h5>
              <p className="fs-13 mb-0">You have 12+ unread notification</p>
            </div>
          </div>
          <PerfectScrollbar
            style={{ maxHeight: 320 }}
            className="list-group list-group-flush position-relative"
          >
            {notify.map(({ variant, icon, title, createdAt }, idx) => {
              return (
                <Link
                  key={idx}
                  to=""
                  onClick={openOffcanvas}
                  className="list-group-item fw-normal d-flex position-relative"
                >
                  <div className={`avatar avatar-lg rounded flex-shrink-0 bg-${variant}-subtle`}>
                    <i className={`${icon} text-${variant}`} />
                  </div>
                  <div className="ms-4">
                    <div className="mb-1" dangerouslySetInnerHTML={{ __html: title }} />
                    <small className="fs-11 fw-normal text-uppercase text-muted">{createdAt}</small>
                  </div>
                </Link>
              )
            })}
          </PerfectScrollbar>
          <div className="px-4 py-3 border-top d-flex justify-content-between align-items-center">
            <Link to="#" onClick={toggleSound} className="hstack gap-2">
              {isSoundOn ? (
                <span className="hstack gap-2">
                  <i className="fi fi-rr-volume"></i>
                  <span>Mute</span>
                </span>
              ) : (
                <span className="hstack gap-2 text-danger">
                  <i className="fi fi-rr-volume-slash"></i>
                  <span>Unmute</span>
                </span>
              )}
            </Link>
            <Link to="" className="icon-link icon-link-hover" onClick={openOffcanvas}>
              <span>View Alls</span>
              <i className="fi fi-rr-arrow-small-right bi"></i>
            </Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      {showOffcanvas && (
        <NotificationOffcanvas
          show={showOffcanvas}
          handleClose={handleCloseOffcanvas}
          toggleSound={toggleSound}
          isSoundOn={isSoundOn}
        />
      )}
    </>
  )
}

export default Notifications

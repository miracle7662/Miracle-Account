import { useState } from 'react'
import { Button, Col, Dropdown, Row } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom'
import BgCircleShapeStyle from '../Misc/BgCircleShape'

const Helpdesk = () => {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }
  const applications = [
    { to: '/apps/chat', label: 'Chats' },
    { to: '/apps/email', label: 'Emails' },
    { to: '/apps/contact', label: 'Contact' },
    { to: '/apps/invoice', label: 'Invoice' },
    { to: '/apps/kanban', label: 'Kanban' },
    { to: '/apps/calendar', label: 'Calendar' },
  ]

  const shoutcuts = [
    { to: '/user-profile/overview', label: 'User Profile' },
    { to: '/account-settings/account', label: 'Account Settings' },
  ]
  const docs = [
    { to: '../docs/support.html', label: 'Support' },
    { to: '../docs/changelog.html', label: 'Changelog' },
    { to: '../docs/index.html', label: 'Documentation' },
  ]

  return (
    <>
      <Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
        <Dropdown.Toggle
          as="a"
          className="arrow-none header-btn"
          role="button"
          onClick={toggleDropDown}>
          <i className="fi fi-rr-interrogation" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" className="dropdown-xl py-0 px-0 overflow-hidden">
          <div
            className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border bg-primary text-white text-center px-6 py-12"
            onClick={toggleDropDown}
            style={BgCircleShapeStyle}>
            <h4 className="fw-bold text-white mb-2">Help Center</h4>
            <p className="fs-13">
              This greeting is courteous and professional, setting a positive tone for your ticket.
            </p>
            <Button
              className="fs-10 fw-semibold py-2 px-3 bg-body text-dark text-uppercase rounded-pill"
              style={{ letterSpacing: '1px' }}>
              Get Support
            </Button>
          </div>
          <PerfectScrollbar style={{ maxHeight: '320px' }}>
            <Row className="g-0 px-4 pt-4 pb-2">
              <Col>
                <p className="fs-11 fw-semibold text-uppercase text-muted mb-1">Applications</p>
                {applications.map(({ to, label }) => (
                  <Link key={to} to={to} className="px-0 dropdown-item">
                    {label}
                  </Link>
                ))}
              </Col>
              <Col>
                <p className="fs-11 fw-semibold text-uppercase text-muted mb-1">Helpdesk</p>
                {docs.map(({ to, label }) => (
                  <Link key={to} to={to} className="px-0 dropdown-item">
                    {label}
                  </Link>
                ))}
                <p className="fs-11 fw-semibold text-uppercase text-muted mt-4 mb-1">Shoutcuts</p>
                {shoutcuts.map(({ to, label }) => (
                  <Link key={to} to={to} className="px-0 dropdown-item">
                    {label}
                  </Link>
                ))}
              </Col>
            </Row>
          </PerfectScrollbar>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default Helpdesk

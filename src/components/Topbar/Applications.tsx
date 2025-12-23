import { useState } from 'react'
import { Dropdown, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { appsData } from './data/appsData'

const Applications = () => {
  const apps = appsData || []
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  return (
    <Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
      <Dropdown.Toggle
        as="a"
        className="arrow-none header-btn"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        role="button"
        onClick={toggleDropDown}
      >
        <i className="fi fi-rr-apps-add" />
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="dropdown-xl py-0 px-0 overflow-hidden">
        <Row className="g-2 p-3">
          {apps.map((app, idx) => {
            return (
              <Col xs={4} key={idx} className="hstack">
                <Link
                  to=""
                  className="w-100 d-block px-2 py-3 text-center text-decoration-none rounded"
                >
                  <img
                    src={app.img}
                    alt={app.name}
                    width={20}
                    height={20}
                    className="img-fluid rounded-circle"
                  />
                  <p className="fs-13 fw-medium text-truncate mb-0 mt-1 pt-1">{app.name}</p>
                </Link>
              </Col>
            )
          })}
        </Row>
        <div className="px-4 py-3 border-top  text-center">
          <Link to="/account-settings/integrations" className="icon-link icon-link-hover">
            <span>All Applications</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Applications

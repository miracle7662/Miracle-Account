import { Tab, Nav } from 'react-bootstrap'
import { tabsData } from './data/tabsData'

const NavTabTheme = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      {colors.map((variant, idx) => (
        <Tab.Container defaultActiveKey="home" key={idx}>
          <Nav
            className={`mb-3 gap-3 align-items-center justify-content-center nav-rich-content-tabs nav-rich-content-${variant.toLowerCase()}`}
          >
            {tabsData.map(({ eventKey, icon, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="btn btn-icon">
                  <i className={`${icon}`}></i>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr className="my-4" />
          <Nav
            className={`mb-3 gap-3 align-items-center justify-content-center nav-rich-content-tabs nav-rich-content-${variant.toLowerCase()}`}
          >
            {tabsData.map(({ eventKey, icon, title, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="text-center">
                  <span className="nav-rich-content-title">{title}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr className="my-4" />
          <Nav
            className={`mb-3 gap-3 align-items-center justify-content-center nav-rich-content-tabs nav-rich-content-${variant.toLowerCase()}`}
          >
            {tabsData.map(({ eventKey, icon, title, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="hstack gap-2">
                  <i className={`${icon} nav-rich-content-icon mb-0`}></i>
                  <span className="nav-rich-content-title">{title}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr className="my-4" />
          <Nav
            className={`mb-3 gap-3 align-items-center justify-content-center nav-rich-content-tabs nav-rich-content-${variant.toLowerCase()}`}
          >
            {tabsData.map(({ eventKey, icon, title, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="text-center">
                  <i className={`${icon} nav-rich-content-icon`}></i>
                  <span className="nav-rich-content-title">{title}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr className="my-4" />
          <Nav
            className={`mb-3 gap-3 align-items-center justify-content-center nav-rich-content-tabs nav-rich-content-${variant.toLowerCase()}`}
          >
            {tabsData.map(({ eventKey, icon, title, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="text-center">
                  <i className={`${icon} nav-rich-content-icon`}></i>
                  <span className="nav-rich-content-title">{title}</span>
                  <span className="nav-rich-content-text">Descriptions</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr className="my-4" />
          <Nav
            className={`mb-3 gap-3 align-items-center justify-content-center nav-rich-content-tabs nav-rich-content-${variant.toLowerCase()}`}
          >
            {tabsData.map(({ eventKey, icon, title, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="hstack gap-3">
                  <i className={`${icon} fs-3`}></i>
                  <span>
                    <span className="nav-rich-content-title">{title}</span>
                    <span className="nav-rich-content-text">Descriptions</span>
                  </span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr className="my-4" />
          <Nav
            className={`mb-3 gap-3 align-items-center justify-content-center nav-rich-content-tabs nav-rich-content-${variant.toLowerCase()}`}
          >
            {tabsData.map(({ eventKey, icon, title, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="d-flex gap-3">
                  <i className={`${icon} fs-3 mt-1`}></i>
                  <span>
                    <span className="fs-16 fw-semibold nav-rich-content-title">{title}</span>
                    <span className="nav-rich-content-text">
                      Magna duis labore cillum sint adipisicing exercitation ipsum. Nostrud ut anim
                      non exercitation velit laboris fugiat cupidatat. Commodo esse dolore fugiat
                      sint velit ullamco magna consequat voluptate minim amet aliquip ipsum aute
                      laboris nisi. Labore labore veniam irure irure ipsum pariatur mollit magna in
                      cupidatat dolore magna irure esse tempor ad mollit. Dolore commodo nulla minim
                      amet ipsum officia consectetur amet ullamco voluptate nisi commodo ea sit eu.
                    </span>
                  </span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr className="my-16" />
        </Tab.Container>
      ))}
    </>
  )
}

export default NavTabTheme

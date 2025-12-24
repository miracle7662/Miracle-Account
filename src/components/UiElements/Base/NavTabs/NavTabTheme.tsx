import { Tab, Nav } from 'react-bootstrap'
import { tabsData } from './data/tabsData'

const NavTabTheme = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      {colors.map((variant, idx) => (
        <Tab.Container defaultActiveKey="home" key={idx}>
          <Nav fill variant="pills" className={`mb-3 nav-theme-tabs-${variant.toLowerCase()}`}>
            {tabsData.map(({ eventKey, icon, title, disabled }, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={eventKey} disabled={disabled} className="hstack">
                  <i className={icon}></i>
                  <span className="ms-2">{title}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content>
            {tabsData.map(({ eventKey, content }, index) => (
              <Tab.Pane key={index} eventKey={eventKey}>
                {content}
              </Tab.Pane>
            ))}
          </Tab.Content>
          <hr className="my-12" />
        </Tab.Container>
      ))}
    </>
  )
}

export default NavTabTheme

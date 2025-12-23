import { Tab, Nav } from 'react-bootstrap'
import { tabsData } from './data/tabsData'

const NavTabUnderline = () => {
  return (
    <>
      <Tab.Container defaultActiveKey="home">
        <Nav className="mb-3 nav-underline">
          {tabsData.map(({ eventKey, title, disabled }) => (
            <Nav.Item key={eventKey}>
              <Nav.Link eventKey={eventKey} disabled={disabled}>
                {title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {tabsData.map(({ eventKey, content }) => (
            <Tab.Pane key={eventKey} eventKey={eventKey}>
              {content}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </>
  )
}

export default NavTabUnderline

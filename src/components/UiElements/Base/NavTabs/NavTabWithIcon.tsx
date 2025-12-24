import { useState } from 'react'
import { Tab, Nav } from 'react-bootstrap'
import { tabsData } from './data/tabsData'

const NavTabWithIcon = () => {
  const [activeKey, setActiveKey] = useState('home')
  const handleSelect = (selectedKey: any) => {
    setActiveKey(selectedKey)
  }

  return (
    <Tab.Container defaultActiveKey="home" activeKey={activeKey} onSelect={handleSelect}>
      <Nav variant="tabs" fill className="mb-3">
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
    </Tab.Container>
  )
}

export default NavTabWithIcon

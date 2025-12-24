import { useState } from 'react'
import { Tab, Nav, NavDropdown } from 'react-bootstrap'
import { tabsData, tabsDropdownData } from './data/tabsData'

const NavTabDropdown = () => {
  const [activeKey, setActiveKey] = useState('home')

  const handleSelect = (selectedKey: any) => {
    setActiveKey(selectedKey)
  }

  return (
    <Tab.Container defaultActiveKey="home" activeKey={activeKey} onSelect={handleSelect}>
      <Nav variant="pills" className="mb-3">
        {tabsData.map(({ eventKey, title, disabled }) => (
          <Nav.Item key={eventKey}>
            <Nav.Link eventKey={eventKey} disabled={disabled}>
              {title}
            </Nav.Link>
          </Nav.Item>
        ))}
        <NavDropdown title="Dropdown">
          {tabsDropdownData.map((item, index) => (
            <NavDropdown.Item key={index} eventKey={item.eventKey}>
              {item.title}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      <Tab.Content>
        {tabsData.map((tab, index) => (
          <Tab.Pane key={index} eventKey={tab.eventKey}>
            {tab.content}
          </Tab.Pane>
        ))}
        {tabsDropdownData.map((item, index) => (
          <Tab.Pane key={index} eventKey={item.eventKey}>
            {item.content}
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  )
}

export default NavTabDropdown

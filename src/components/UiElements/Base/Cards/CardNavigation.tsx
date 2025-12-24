import { Card, Col, Nav, Row, Tab } from 'react-bootstrap'

const tabData = [
  {
    defaultActiveKey: 'home',
    navVariant: 'tabs',
    items: [
      { eventKey: 'home', label: 'Home' },
      { eventKey: 'profile', label: 'Profile' },
      { eventKey: 'contact', label: 'Contact' },
      { eventKey: 'disabled', label: 'Disabled', disabled: true },
    ],
    panes: [
      {
        eventKey: 'home',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This card has even longer content than the first to show that equal height action.',
      },
      {
        eventKey: 'profile',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This card has even longer content than the first to show that equal height action.',
      },
      {
        eventKey: 'contact',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This card has even longer content than the first to show that equal height action.',
      },
      {
        eventKey: 'disabled',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This card has even longer content than the first to show that equal height action.',
      },
    ],
  },
  {
    defaultActiveKey: 'home',
    navVariant: 'pills',
    items: [
      { eventKey: 'home', label: 'Home' },
      { eventKey: 'profile', label: 'Profile' },
      { eventKey: 'contact', label: 'Contact' },
      { eventKey: 'disabled', label: 'Disabled', disabled: true },
    ],
    panes: [
      {
        eventKey: 'home',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      },
      {
        eventKey: 'profile',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      },
      {
        eventKey: 'contact',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      },
      {
        eventKey: 'disabled',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      },
    ],
  },
]

const CardNavigation = () => {
  return (
    <Row className="g-3 g-md-4">
      {tabData.map(({ defaultActiveKey, navVariant, items, panes }, index) => (
        <Col lg={6} key={index}>
          <Tab.Container defaultActiveKey={defaultActiveKey}>
            <Card>
              <Card.Header>
                <Nav variant={navVariant}>
                  {items.map(({ eventKey, label, disabled }, idx) => (
                    <Nav.Item key={idx}>
                      <Nav.Link eventKey={eventKey} disabled={disabled}>
                        {label}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  {panes.map(({ eventKey, content }, idx) => (
                    <Tab.Pane eventKey={eventKey} key={idx}>
                      {content}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      ))}
    </Row>
  )
}

export default CardNavigation

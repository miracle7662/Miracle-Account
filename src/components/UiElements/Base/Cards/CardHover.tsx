import { Card, Col, Row } from 'react-bootstrap'

const CardHover = () => {
  const colors = ['Primary', 'Warning', 'Success']

  return (
    <>
      <Row className="g-3 g-md-4">
        {colors.map((variant) => (
          <Col lg={4} key={variant}>
            <Card
              bg={variant.toLowerCase()}
              text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              className={`card-hover card-${variant.toLowerCase()} text-bg-${variant.toLowerCase()} border-${variant.toLowerCase()}`}
            >
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Card.Title className="mb-2">{variant} Card Title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content. This card has even longer content than the first to show that equal
                  height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Footer</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CardHover

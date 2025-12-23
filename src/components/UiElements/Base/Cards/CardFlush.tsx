import { Card, Col, Row } from 'react-bootstrap'

const CardFlush = () => {
  const cardsData = [
    {
      title: 'Special title treatment',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      links: [
        { href: '#!', className: 'btn rounded-pill btn-softtext-primary', text: 'Card Link' },
        { href: '#!', className: 'btn rounded-pill btn-softtext-danger', text: 'Another Link' },
      ],
    },
    {
      title: 'Special title treatment',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      links: [
        { href: '#!', className: 'btn rounded-pill btn-softtext-primary', text: 'Card Link' },
        { href: '#!', className: 'btn rounded-pill btn-softtext-danger', text: 'Another Link' },
      ],
    },
    {
      title: 'Special title treatment',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      links: [
        { href: '#!', className: 'btn rounded-pill btn-softtext-primary', text: 'Card Link' },
        { href: '#!', className: 'btn rounded-pill btn-softtext-danger', text: 'Another Link' },
      ],
    },
  ]

  return (
    <>
      <Row className="g-3 g-md-4">
        {cardsData.map(({ title, text, links }, index) => (
          <Col lg={4} key={index}>
            <Card className="card-flush">
              <Card.Header>
                <Card.Title className="mb-2">{title}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>{text}</Card.Text>
              </Card.Body>
              <Card.Body>
                {links.map(({ href, className, text }, linkIndex) => (
                  <Card.Link key={linkIndex} href={href} className={className}>
                    {text}
                  </Card.Link>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CardFlush

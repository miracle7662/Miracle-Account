import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import undefinedImage from '@/assets/images/general/undefined.png'

const cardsData = [
  {
    title: 'Special title treatment',
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    listItems: [
      'Some quick example text to build on the card title',
      'Some quick example text to build on the card title',
      'Some quick example text to build on the card title',
    ],
    buttonLinks: [
      { href: '#!', text: 'Card Link', variant: 'btn-softtext-primary' },
      { href: '#!', text: 'Another Link', variant: 'btn-softtext-danger' },
    ],
  },
  {
    title: 'Special title treatment',
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    listItems: [
      'Some quick example text to build on the card title',
      'Some quick example text to build on the card title',
      'Some quick example text to build on the card title',
    ],
    buttonLinks: [
      { href: '#!', text: 'Card Link', variant: 'btn-softtext-primary' },
      { href: '#!', text: 'Another Link', variant: 'btn-softtext-danger' },
    ],
  },
  {
    title: 'Special title treatment',
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    listItems: [
      'Some quick example text to build on the card title',
      'Some quick example text to build on the card title',
      'Some quick example text to build on the card title',
    ],
    buttonLinks: [
      { href: '#!', text: 'Card Link', variant: 'btn-softtext-primary' },
      { href: '#!', text: 'Another Link', variant: 'btn-softtext-danger' },
    ],
  },
]

const CardSink = () => {
  return (
    <Row className="g-3 g-md-4">
      {cardsData.map(({ title, text, listItems, buttonLinks }, idx) => (
        <Col lg={4} key={idx}>
          <Card>
            <Card.Img variant="top" src={undefinedImage} />
            <Card.Body>
              <Card.Title className="mb-2">{title}</Card.Title>
              <Card.Text>{text}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {listItems.map((item, idx) => (
                <ListGroup.Item key={idx}>{item}</ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              {buttonLinks.map(({ href, text, variant }, idx) => (
                <Card.Link href={href} className={`btn rounded-pill ${variant}`} key={idx}>
                  {text}
                </Card.Link>
              ))}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default CardSink

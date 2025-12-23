import { Card, Col, Row } from 'react-bootstrap'

const CardStretch = () => {
  const columnData = [
    {
      cards: [
        { header: 'Height 100%', bodyTitle: 'Height 100%', stretchClass: 'card-stretch-100' },
      ],
    },
    {
      cards: [
        { header: 'Height 50%', bodyTitle: 'Height 50%', stretchClass: 'card-stretch-50 mb-4' },
        { header: 'Height 50%', bodyTitle: 'Height 50%', stretchClass: 'card-stretch-50' },
      ],
    },
    {
      cards: [
        {
          header: 'Height 33.333%',
          bodyTitle: 'Height 33.333%',
          stretchClass: 'card-stretch-33 mb-4',
        },
        {
          header: 'Height 33.333%',
          bodyTitle: 'Height 33.333%',
          stretchClass: 'card-stretch-33 mb-4',
        },
        { header: 'Height 33.333%', bodyTitle: 'Height 33.333%', stretchClass: 'card-stretch-33' },
      ],
    },
  ]

  return (
    <Row className="g-3 g-md-4">
      {columnData.map((column, columnIndex) => (
        <Col lg={4} key={columnIndex}>
          {column.cards.map(({ header, bodyTitle, stretchClass }, cardIndex) => (
            <Card key={cardIndex} className={stretchClass}>
              <Card.Header>{header}</Card.Header>
              <Card.Body>
                <Card.Title className="mb-2">{bodyTitle}</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content. This card has even longer content than the first to show that equal
                  height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Footer</Card.Footer>
            </Card>
          ))}
        </Col>
      ))}
    </Row>
  )
}

export default CardStretch

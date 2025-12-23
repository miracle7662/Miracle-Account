import { Card, Col, Row } from 'react-bootstrap'

// images
import banner1 from '@/assets/images/banner/1.jpg'
import banner2 from '@/assets/images/banner/2.jpg'

const CardOverlay = () => {
  const cardGradintColor = {
    backgroundImage: 'linear-gradient(135deg, rgba(188, 26, 78, 1) 0%, rgba(0, 79, 230, 1) 100%)',
  }
  const cardImageWithGradient = {
    backgroundImage: ' linear-gradient(rgba(0, 0, 255, 0.75), rgba(255, 255, 0, 0.75))',
  }
  return (
    <>
      <Row className="g-3 g-md-4">
        <Col lg={4}>
          <Card className="text-bg-dark" style={cardGradintColor}>
            <div style={{ height: '300px' }}></div>
            <Card.ImgOverlay>
              <Card.Title className="mb-2">Gradient overlay card</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="text-bg-dark">
            <Card.Img src={banner1} style={{ height: '300px' }} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className="mb-2">Image overlay card</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="text-bg-dark">
            <Card.Img src={banner2} style={{ height: '300px' }} alt="Card image" />
            <Card.ImgOverlay style={cardImageWithGradient}>
              <Card.Title className="mb-2">Image with gradient card</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CardOverlay

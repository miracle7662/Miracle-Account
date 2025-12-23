import { Card, Col, Image, Row } from 'react-bootstrap'
import brandData from './data/brandData'

const AboutBrands = () => {
  return (
    <>
      <Row className="g-3 g-md-4">
        <Col lg={12}>
          <div className="w-100 mx-auto text-center" style={{ maxWidth: '576px' }}>
            <h2 className="fw-bold lh-base mb-6">
              We help hundreds of teams plan better events while saving money.
            </h2>
          </div>
        </Col>
        {brandData.map(({ image }, idx) => (
          <Col key={idx} xs={6} sm={4} xl={3} xxl={2}>
            <Card>
              <Card.Body className="text-center">
                <Image src={image} alt="" className="img-fluid" style={{ height: '2.5rem' }} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default AboutBrands

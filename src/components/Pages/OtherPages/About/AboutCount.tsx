import { Button, Col, Image, Row } from 'react-bootstrap'
import workingOffice from '@/assets/images/general/working-office.jpg'
import OverlayLayerStyle from '@/components/Misc/OverlayLayer'

const statistics = [
  { value: '99%', title: 'Data accuracy' },
  { value: '35.6k', title: 'Happy clients' },
  { value: '365+', title: 'Projects done' },
  { value: '24+', title: 'Trusted products' },
]

const AboutCount = () => {
  return (
    <>
      <div className="mb-8 mb-md-12 mb-lg-16 position-relative">
        <Image src={workingOffice} alt="Image" className="img-fluid img-thumbnail rounded-3" />
        <div style={OverlayLayerStyle}>
          <Button
            variant=""
            className="bg-light text-dark border border-6 border-secondary-subtle hstack rounded-circle position-absolute top-50 start-50 translate-middle"
            style={{ width: '5rem', height: '5rem' }}
          >
            <i className="fi fi-rr-play fs-24"></i>
          </Button>
        </div>
      </div>
      <Row className="g-3 g-md-6 align-items-center">
        {statistics.map(({ value, title }, idx) => (
          <Col sm={6} lg={3} key={idx}>
            <div className="fs-32 fw-bold text-dark mb-2">{value}</div>
            <h4 className="text-primary mb-3">{title}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A ea tempore necessitatibus
              quia architecto voluptatum.
            </p>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default AboutCount

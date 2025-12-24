import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card } from 'react-bootstrap'

import {
  CarouseAutoplay,
  CarouseControlled,
  CarouseCrossfade,
  CarouselBasic,
} from '@/components/UiElements/Base/Carousels'

const Carousels = () => {
  return (
    <>
      <PageBreadcrumb title="Carousels" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={6}>
          <Card className="overflow-hidden">
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <CarouselBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card className="overflow-hidden">
            <Card.Header>
              <Card.Title>Controlled</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <CarouseControlled />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card className="overflow-hidden">
            <Card.Header>
              <Card.Title>Crossfade</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <CarouseCrossfade />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card className="overflow-hidden">
            <Card.Header>
              <Card.Title>Autoplay</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <CarouseAutoplay />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
      </Row>
    </>
  )
}

export default Carousels

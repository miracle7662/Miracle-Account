import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  MapVectorBasic,
  MapVectorLine,
  MapVectorMarker,
  MapVectorAdvanced,
} from '@/components/UiElements/Maps/Vector'

const VectorMaps = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Vector Maps"
        subName="Maps"
        url={'https://jvm-docs.vercel.app/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <MapVectorBasic height="500px" width="100%" />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Marker</Card.Title>
            </Card.Header>
            <Card.Body>
              <MapVectorMarker height="500px" width="100%" />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Line</Card.Title>
            </Card.Header>
            <Card.Body>
              <MapVectorLine height="500px" width="100%" />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Advanced</Card.Title>
            </Card.Header>
            <Card.Body>
              <MapVectorAdvanced height="500px" width="100%" />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col xs={12}>
          <Card className="border-0">
            <ListGroup>
              <ListGroup.Item>
                <h5 className="mb-0">Uses Instruction</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                Quill is delivered primarily via npm. <code>npm install jsvectormap</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://jvm-docs.vercel.app/docs/introduction" target="_blank">
                  https://jvm-docs.vercel.app/docs/introduction
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        {/* End:: Documentation Col */}
      </Row>
    </>
  )
}

export default VectorMaps

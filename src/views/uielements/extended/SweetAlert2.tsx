import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  SweetAlert2Basic,
  SweetAlert2Confirmation,
  SweetAlert2Custom,
  SweetAlert2Positioned,
  SweetAlert2Type,
} from '@/components/UiElements/Extended/SweetAlert2'

const SweetAlert2 = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="SweetAlert2"
        subName="Extended"
        url={'https://github.com/sweetalert2/sweetalert2-react-content'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12} xl={6}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <SweetAlert2Basic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} xl={6}>
          <Card>
            <Card.Header>
              <Card.Title>Positioned</Card.Title>
            </Card.Header>
            <Card.Body>
              <SweetAlert2Positioned />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} xl={6}>
          <Card>
            <Card.Header>
              <Card.Title>Types</Card.Title>
            </Card.Header>
            <Card.Body>
              <SweetAlert2Type />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} xl={6}>
          <Card>
            <Card.Header>
              <Card.Title>Confirmation</Card.Title>
            </Card.Header>
            <Card.Body>
              <SweetAlert2Confirmation />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Custom Message</Card.Title>
            </Card.Header>
            <Card.Body>
              <SweetAlert2Custom />
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
                SweetAlert2 is delivered primarily via npm.{' '}
                <code>npm install --save sweetalert2 sweetalert2-react-content</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://github.com/sweetalert2/sweetalert2-react-content" target="_blank">
                  https://github.com/sweetalert2/sweetalert2-react-content
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

export default SweetAlert2

import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  DropzoneAccepting,
  DropzoneBasic,
  DropzoneMaxFiles,
  DropzonePreviews,
} from '@/components/UiElements/Extended/Dropzone'

const Dropzone = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Dropzone"
        subName="Extended"
        url={'https://react-dropzone.js.org/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropzoneBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Accepting</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropzoneAccepting />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>MaxFiles</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropzoneMaxFiles />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Previews</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropzonePreviews />
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
                Dropzone is delivered primarily via npm.{' '}
                <code>npm install --save react-dropzone</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://react-dropzone.js.org/" target="_blank">
                  https://react-dropzone.js.org/
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

export default Dropzone

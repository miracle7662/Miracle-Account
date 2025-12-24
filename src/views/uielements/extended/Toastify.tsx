import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  ToastifyPosition,
  ToastifyCustom,
  ToastifyStates,
} from '@/components/UiElements/Extended/Toastify'

const Toastify = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Toastify"
        subName="Extended"
        url={'https://fkhadra.github.io/react-toastify/introduction/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Position</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastifyPosition />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>States</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastifyStates />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Custom</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastifyCustom />
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
                Toastify is delivered primarily via npm. <code></code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://fkhadra.github.io/react-toastify/installation" target="_blank">
                  https://fkhadra.github.io/react-toastify/installation
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

export default Toastify

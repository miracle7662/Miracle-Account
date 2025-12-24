import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import { HotToastPosition, HotToastType } from '@/components/UiElements/Extended/HotToast'

const HotToast = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="HotToast"
        subName="Extended"
        url={'https://react-hot-toast.com/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Toast Type</Card.Title>
            </Card.Header>
            <Card.Body>
              <HotToastType />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Toast Position</Card.Title>
            </Card.Header>
            <Card.Body>
              <HotToastPosition />
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
                HotToast is delivered primarily via npm. <code>npm install react-hot-toast</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://react-hot-toast.com/docs" target="_blank">
                  https://react-hot-toast.com/docs
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

export default HotToast

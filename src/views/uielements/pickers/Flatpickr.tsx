import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  FlatPickrBasic,
  FlatPickrDateTime,
  FlatPickrRange,
  FlatPickrHandler,
  FlatPickrMultiple,
  FlatPickrWeekNumber,
} from '@/components/UiElements/Pickers/Flatpickr'

const Flatpickr = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Flatpicker"
        subName="Pickers"
        url={'https://github.com/haoxins/react-flatpickr'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <FlatPickrBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>DateTime</Card.Title>
            </Card.Header>
            <Card.Body>
              <FlatPickrDateTime />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Multiple</Card.Title>
            </Card.Header>
            <Card.Body>
              <FlatPickrMultiple />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>weekNumbers</Card.Title>
            </Card.Header>
            <Card.Body>
              <FlatPickrWeekNumber />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>rangeCalendar</Card.Title>
            </Card.Header>
            <Card.Body>
              <FlatPickrRange />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Handler</Card.Title>
            </Card.Header>
            <Card.Body>
              <FlatPickrHandler />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col sm={12}>
          <Card className="border-0">
            <ListGroup>
              <ListGroup.Item>
                <h5 className="mb-0">Uses Instruction</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                Quill is delivered primarily via npm.{' '}
                <code>npm install --save react-flatpickr</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://github.com/haoxins/react-flatpickr" target="_blank">
                  https://github.com/haoxins/react-flatpickr
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

export default Flatpickr

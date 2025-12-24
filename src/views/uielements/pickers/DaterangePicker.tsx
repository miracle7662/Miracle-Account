import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  DateRange,
  DateRangeMultiple,
  DateRangePicker,
  DateRangeWeekend,
} from '@/components/UiElements/Pickers/DaterangePicker'

const DaterangePicker = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="DataRange"
        subName="Pickers"
        url={'https://hypeserver.github.io/react-date-range/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>DateRange</Card.Title>
            </Card.Header>
            <Card.Body>
              <DateRange />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>DateRangeMultiple</Card.Title>
            </Card.Header>
            <Card.Body>
              <DateRangeMultiple />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>DateRangePicker</Card.Title>
            </Card.Header>
            <Card.Body>
              <DateRangePicker />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>DateRangeWeekend</Card.Title>
            </Card.Header>
            <Card.Body>
              <DateRangeWeekend />
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
                Quill is delivered primarily via npm. <code>npm install react-date-range</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://hypeserver.github.io/react-date-range/" target="_blank">
                  https://hypeserver.github.io/react-date-range/
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

export default DaterangePicker

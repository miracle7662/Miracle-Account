import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  ReactSlickAutoPlay,
  ReactSlickCustomPaging,
  ReactSlickMultiple,
  ReactSlickMultipleRows,
  ReactSlickResponsive,
  ReactSlickSingle,
  ReactSlickVariableWidth,
} from '@/components/UiElements/Extended/ReactSlick'

const ReactSlick = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Slick Slider"
        subName="Extended"
        url={'https://react-slick.neostack.com/docs/get-started'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Single</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactSlickSingle />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Multiple</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactSlickMultiple />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Responsive</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactSlickResponsive />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Multiple Rows</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactSlickMultipleRows />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Variable Width</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactSlickVariableWidth />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Auto Play</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactSlickAutoPlay />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Custom Paging</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactSlickCustomPaging />
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
                Slick is delivered primarily via npm. <code>npm install react-slick --save</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://react-slick.neostack.com/docs/get-started" target="_blank">
                  https://react-slick.neostack.com/docs/get-started
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

export default ReactSlick

import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import {
  SelectAnimation,
  SelectGrouped,
  SelectMultiple,
  SelectSingle,
  SelectStyleSingle,
  SelectStyleMultiple,
  SelectCreatable,
  SelectFixedOptions,
  SelectCustomSingle,
  SelectCustomMultiple,
} from '@/components/UiElements/Extended/Selects'

const ReactSelect = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Select2"
        subName="Extended"
        url={'https://react-select.com/home'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Single</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectSingle />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Grouped</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectGrouped />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Multiple</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectMultiple />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Animation</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectAnimation />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Single Style</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectStyleSingle />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Multiple Style</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectStyleMultiple />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Creatable</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectCreatable />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Fixed Options</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectFixedOptions />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Custom Single</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectCustomSingle />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Custom Multiple</Card.Title>
            </Card.Header>
            <Card.Body>
              <SelectCustomMultiple />
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
                Quill is delivered primarily via npm. <code>npm i --save react-select</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://react-select.com/home#getting-started" target="_blank">
                  https://react-select.com/home#getting-started
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

export default ReactSelect

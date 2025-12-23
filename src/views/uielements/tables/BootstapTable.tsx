import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card } from 'react-bootstrap'

import {
  TableDefault,
  TableSmall,
  TableBordered,
  TableBorderless,
  TableStriped,
  TableHoverable,
  TableGap,
  TableGapHover,
} from '@/components/UiElements/Tables/Bootstrap'

const BootstapTable = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Bootstrap"
        subName="Tables"
        url={'https://react-bootstrap.netlify.app/docs/components/table'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Default</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableDefault />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Small</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableSmall />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Bordered</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableBordered />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Borderless</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableBorderless />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Striped</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableStriped />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Hoverable</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableHoverable />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>tablGap</Card.Title>
            </Card.Header>
            <Card.Body>
              <TableGap />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>tableGapHover</Card.Title>
            </Card.Header>
            <Card.Body>
              <TableGapHover />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
      </Row>
    </>
  )
}

export default BootstapTable

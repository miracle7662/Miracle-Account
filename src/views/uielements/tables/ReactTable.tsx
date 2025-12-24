import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'
import {
  TableDragDrop,
  TableEditable,
  TableExpanding,
  TableFiltering,
  TablePagination,
  TableRowSelection,
  TableSorting,
} from '@/components/UiElements/Tables/ReactTable'

const ReactTable = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="ReactTable"
        subName="Tables"
        url={'https://github.com/TanStack/table'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Sorting</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableSorting />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Filtering</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableFiltering />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Pagination</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TablePagination />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Row Selection</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableRowSelection />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Expanding</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableExpanding />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Editable</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableEditable />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Drag & Drop</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <TableDragDrop />
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
                ReactTable is delivered primarily via npm.{' '}
                <code>npm install @tanstack/react-table</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://github.com/TanStack/table" target="_blank">
                  https://github.com/TanStack/table
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

export default ReactTable

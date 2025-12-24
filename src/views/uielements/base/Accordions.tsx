import { Link } from 'react-router-dom'
import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  AccrodionDefault,
  AccrodionFlush,
  AccrodionIcon,
  AccrodionOpened,
  AccrodionRevIcon,
  AccrodionReversed,
} from '@/components/UiElements/Base/Accrodions'

const Accordions = () => {
  return (
    <>
      <PageBreadcrumb title="Accrodions" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Default</Card.Title>
            </Card.Header>
            <Card.Body>
              <AccrodionDefault />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Flush</Card.Title>
            </Card.Header>
            <Card.Body>
              <AccrodionFlush />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Opened</Card.Title>
            </Card.Header>
            <Card.Body>
              <AccrodionOpened />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Reversed</Card.Title>
            </Card.Header>
            <Card.Body>
              <AccrodionReversed />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Icon</Card.Title>
            </Card.Header>
            <Card.Body>
              <AccrodionIcon />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>RevIcon</Card.Title>
            </Card.Header>
            <Card.Body>
              <AccrodionRevIcon />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title>Options</Card.Title>
            </Card.Header>
            <Table className="mb-0" responsive>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>Accordion</code>
                  </td>
                  <td>Initializing bootstrap 5.3 accordion</td>
                </tr>
                <tr>
                  <td>
                    <code>Icon</code>
                  </td>
                  <td>
                    Add calss for custom icon
                    <code>.accordion + .accordion-icon</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Reversed</code>
                  </td>
                  <td>
                    Add calss for reversed icon
                    <code>.accordion + .accordion-reversed</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>RevIcon</code>
                  </td>
                  <td>
                    Add calss for rev-icon icon
                    <code>.accordion + .accordion-rev-icon</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/components/accordion"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/components/accordion
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        {/* End:: Documentation Col */}
      </Row>
    </>
  )
}

export default Accordions

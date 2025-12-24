import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  RechartBiaxialLine,
  RechartComposed,
  RechartRadarChart,
  RechartRadialBar,
  RechartShapePie,
  RechartStackedArea,
  RechartStackedBar,
  RechartTreeMap,
} from '@/components/UiElements/Charts/Recharts'

const Recharts = () => {
  return (
    <>
      <PageBreadcrumbButton title="Recharts" subName="Charts" url={'https://recharts.org/'} />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Biaxial Line</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartBiaxialLine />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Stacked Area</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartStackedArea />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Stacked Bar</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartStackedBar />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Composed Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartComposed />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Shape Pie</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartShapePie />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Radar Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartRadarChart />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Radial Bar</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartRadialBar />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Tree Map</Card.Title>
            </Card.Header>
            <Card.Body>
              <RechartTreeMap />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col xs={12}>
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
                    <code>Getting Started</code>
                  </td>
                  <td>
                    <a href="https://recharts.org/en-US/guide/getting-started" target="_blank">
                      https://recharts.org/en-US/guide/getting-started
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>API</code>
                  </td>
                  <td>
                    <a href="https://recharts.org/en-US/api" target="_blank">
                      https://recharts.org/en-US/api
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Examples</code>
                  </td>
                  <td>
                    <a href="https://recharts.org/en-US/examples" target="_blank">
                      https://recharts.org/en-US/examples
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <a href="https://recharts.org/en-US/guide" target="_blank">
                      https://recharts.org/en-US/guide
                    </a>
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

export default Recharts

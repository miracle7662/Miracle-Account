import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  ChartJsDoughnutChart,
  ChartJsMultipleBar,
  ChartJsPieChart,
  ChartJsPolarArea,
  ChartJsRadarChart,
  ChartJsRoundedArea,
  ChartJsRoundedLine,
  ChartJsStackedBar,
} from '@/components/UiElements/Charts/ChartJs'
import { Link } from 'react-router-dom'

const ChartJs = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="ChartJS"
        subName="Charts"
        url={'https://react-chartjs-2.js.org/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Multiple Bar</Card.Title>
            </Card.Header>
            <Card.Body>
              <ChartJsMultipleBar />
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
              <ChartJsStackedBar />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Rounded Line</Card.Title>
            </Card.Header>
            <Card.Body>
              <ChartJsRoundedLine />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Rounded Area</Card.Title>
            </Card.Header>
            <Card.Body>
              <ChartJsRoundedArea />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Doughnut</Card.Title>
            </Card.Header>
            <Card.Body>
              <ChartJsDoughnutChart />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Pie Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <ChartJsPieChart />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Polar Area</Card.Title>
            </Card.Header>
            <Card.Body>
              <ChartJsPolarArea />
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
              <ChartJsRadarChart />
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
                    <Link to="https://react-chartjs-2.js.org/" target="_blank">
                      https://react-chartjs-2.js.org/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Components</code>
                  </td>
                  <td>
                    <Link to="https://react-chartjs-2.js.org/components" target="_blank">
                      https://react-chartjs-2.js.org/components
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link to="https://react-chartjs-2.js.org/" target="_blank">
                      https://react-chartjs-2.js.org/
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

export default ChartJs

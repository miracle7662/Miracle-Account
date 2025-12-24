import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  ApexBarWithLine,
  ApexBasicArea,
  ApexBasicBar,
  ApexBasicRadar,
  ApexCandlestick,
  ApexColumDataLabels,
  ApexGradientDonut,
  ApexGradientLine,
  ApexLineDataLabels,
  ApexRadarMultiple,
  ApexRadarPolygon,
  ApexSimpleDonut,
  ApexSimplePie,
  ApexStackedColumns,
} from '@/components/UiElements/Charts/ApexCharts'

const ApexCharts = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Apexchart"
        subName="Charts"
        url={'https://apexcharts.com/docs/react-charts/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Gradient Line</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexGradientLine />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Line Data Labels</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexLineDataLabels />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic Bar</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexBasicBar />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Colum Data Labels</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexColumDataLabels />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Stacked Columns</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexStackedColumns />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic Area</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexBasicArea />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Bar With Line</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexBarWithLine />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Apex Candlestick</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexCandlestick />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} lg={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Simple Pie</Card.Title>
            </Card.Header>
            <Card.Body className="m-auto">
              <ApexSimplePie />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} lg={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Simple Donut</Card.Title>
            </Card.Header>
            <Card.Body className="m-auto">
              <ApexSimpleDonut />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} lg={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Gradient Donut</Card.Title>
            </Card.Header>
            <Card.Body className="m-auto">
              <ApexGradientDonut />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} lg={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Basic Radar</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexBasicRadar />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} lg={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Radar Multiple</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexRadarMultiple />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} lg={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Radar Polygon</Card.Title>
            </Card.Header>
            <Card.Body>
              <ApexRadarPolygon />
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
                    <code>Line Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/line-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/line-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Area Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/area-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/area-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Column Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/column-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/column-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Bar Charts</code>
                  </td>
                  <td>
                    <Link to="https://apexcharts.com/react-chart-demos/bar-charts/" target="_blank">
                      https://apexcharts.com/react-chart-demos/bar-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Mixed Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/mixed-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/mixed-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Range Area Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/range-area-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/range-area-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Timeline Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/timeline-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/timeline-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Funnel Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/funnel-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/funnel-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Candlestick Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/candlestick-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/candlestick-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Box &amp; Whisker Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/box-whisker-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/box-whisker-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Bubble Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/bubble-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/bubble-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Scatter Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/scatter-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/scatter-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Heatmap Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/heatmap-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/heatmap-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Treemap Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/treemap-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/treemap-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Pie Charts</code>
                  </td>
                  <td>
                    <Link to="https://apexcharts.com/react-chart-demos/pie-charts/" target="_blank">
                      https://apexcharts.com/react-chart-demos/pie-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Radial Bar Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/radialbar-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/radialbar-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Radar Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/radar-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/radar-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Polar Area Charts</code>
                  </td>
                  <td>
                    <Link
                      to="https://apexcharts.com/react-chart-demos/polar-area-charts/"
                      target="_blank"
                    >
                      https://apexcharts.com/react-chart-demos/polar-area-charts/
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link
                      to="https://apexcharts.com/docs/installation"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://apexcharts.com/docs/installation
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

export default ApexCharts

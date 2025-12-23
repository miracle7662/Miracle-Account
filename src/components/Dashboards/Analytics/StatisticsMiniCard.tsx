import { Card, Col, Row, Stack } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface StatisticsMiniCardProps {
  name: string
  seriesData: number[]
  color: string
}

const commonChartOptions = ({ name, seriesData, color }: StatisticsMiniCardProps): ApexOptions => ({
  chart: {
    type: 'area',
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: 1,
    curve: 'smooth',
  },
  fill: {
    opacity: [0.85, 0.25, 1, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: 'vertical',
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 65, 100],
    },
  },
  yaxis: {
    min: 0,
  },
  colors: [color],
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (e) {
        return +e + '%'
      },
    },
  },
  series: [
    {
      name,
      data: seriesData.map((value, index) => ({ x: index + 1, y: value })),
    },
  ],
})

const columns = [
  {
    name: 'Bounce Rate',
    seriesData: [25, 60, 20, 90, 45, 100, 45, 100, 55],
    color: '#25b865',
  },
  {
    name: 'Page Views',
    seriesData: [35, 80, 45, 60, 90, 50, 75, 40, 85],
    color: '#3E97FF',
  },
  {
    name: 'Site Impressions',
    seriesData: [50, 30, 70, 40, 80, 25, 65, 30, 75],
    color: '#e49e3d',
  },
  {
    name: 'Conversions Rate',
    seriesData: [20, 45, 70, 30, 60, 25, 55, 35, 80],
    color: '#d13b4c',
  },
]

const StatisticsMiniCard = () => {
  return (
    <>
      <Row className="g-3 g-md-4">
        {columns.map((column, index) => (
          <Col xl={3} md={6} key={index}>
            <Card>
              <Card.Body className="p-0">
                <Stack direction="horizontal" className="p-4 mb-4 align-items-start">
                  <div>
                    <h6>{column.name}</h6>
                    <div className="fs-12 text-muted">
                      <i
                        className={`fi ${
                          index % 2 === 0 ? 'fi-rr-arrow-trend-up' : 'fi-rr-arrow-trend-down'
                        } fs-14 ${index % 2 === 0 ? 'text-success' : 'text-danger'}`}
                      ></i>
                      <span className="ms-2">{column.seriesData[0]}% (Prev)</span>
                    </div>
                  </div>
                  <div className="ms-auto text-end">
                    <h4 className="fs-18 fw-bold text-dark">{column.seriesData[8]}%</h4>
                  </div>
                </Stack>
                <ReactApexChart
                  options={commonChartOptions(column)}
                  series={commonChartOptions(column).series}
                  type="area"
                  height={60}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default StatisticsMiniCard

import { Link } from 'react-router-dom'
import { Card, Row, Col, Dropdown, DropdownDivider } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'

const SessionDevice = () => {
  const sessionDeviceData = [
    { label: 'Desktop', value: 37.74, change: '+2.6', color: '#3E97FF' },
    { label: 'Mobile', value: 34.23, change: '-3.2', color: '#e49e3d' },
    { label: 'Tablet', value: 22.65, change: '-2.2', color: '#25b865' },
    { label: 'Others', value: 24.47, change: '+2.8', color: '#d13b4c' },
  ]

  const donutChartOptions = {
    chart: {
      width: 262,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    series: sessionDeviceData.map((item) => item.value),
    labels: sessionDeviceData.map((item) => item.label),
    colors: sessionDeviceData.map((item) => item.color),
    stroke: {
      width: 0,
      lineCap: 'round',
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          labels: {
            show: false,
            name: {
              show: false,
              fontSize: '16px',
              colors: '#A0ACBB',
              fontFamily: 'Inter',
            },
            value: {
              show: false,
              fontSize: '30px',
              fontFamily: 'Inter',
              color: '#A0ACBB',
              formatter: function (e: any) {
                return e
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 380,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (e: any) {
          return +e + '%'
        },
      },
      style: {
        colors: '#A0ACBB',
        fontFamily: 'Inter',
      },
    },
  }

  return (
    <>
      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Session Device</Card.Title>
          <Dropdown className="ms-auto" drop="down">
            <Dropdown.Toggle variant="light" className="p-0 btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
              <Dropdown.Item>
                <i className="fi fi-rr-share"></i>
                <span className="ms-3">Share</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-refresh"></i>
                <span className="ms-3">Refresh</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <i className="fi fi-rr-stats"></i>
                <span className="ms-3">All Channels</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <ReactApexChart
            options={donutChartOptions as ApexCharts.ApexOptions}
            series={donutChartOptions.series}
            type="donut"
            height={262}
          />
          <Row className="g-3 mt-2">
            {sessionDeviceData.map((item, index) => (
              <Col key={index} sm={6}>
                <Card className="border rounded-3 p-3">
                  <div className="d-flex gap-2">
                    <div
                      style={{
                        width: '0.45rem',
                        height: '0.45rem',
                        borderRadius: '50%',
                        marginTop: '0.4rem',
                        backgroundColor: `${item.color}`,
                      }}
                    ></div>
                    <div>
                      <Link to="" className="mb-1 d-block">
                        {item.label}
                      </Link>
                      <div className="fs-16 fw-bold text-dark">
                        {item.value}%{' '}
                        <span className="fs-13 fw-normal text-muted d-xl-none d-xxl-inline-flex">{`(${item.change})`}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default SessionDevice

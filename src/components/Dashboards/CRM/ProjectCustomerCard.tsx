import ReactApexChart from 'react-apexcharts'
import { Card, Stack } from 'react-bootstrap'

const ProjectCustomerCard = () => {
  const optionsSuccess: ApexCharts.ApexOptions = {
    chart: {
      width: '100%',
      type: 'area',
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 2,
    },
    colors: ['#25b865'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        left: -10,
        right: 0,
        bottom: 0,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.2,
        stops: [15, 120, 100],
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (e) {
          return +e + 'K'
        },
      },
    },
  }

  const optionsDanger: ApexCharts.ApexOptions = {
    chart: {
      width: '100%',
      type: 'area',
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 2,
    },
    colors: ['#d13b4c'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        left: -10,
        right: 0,
        bottom: 0,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.2,
        stops: [15, 120, 100],
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (e) {
          return +e + 'K'
        },
      },
    },
  }

  const series = [
    {
      name: 'Transactions',
      data: [22, 42, 12, 72, 32, 80],
      type: 'area',
    },
  ]

  return (
    <>
      <div className="d-grid gap-3 gap-md-4">
        <Card>
          <Card.Body>
            <Stack direction="horizontal" gap={4}>
              <Stack direction="horizontal" gap={3}>
                <div
                  className="bg-success-subtle text-success border border-success border-opacity-10 rounded hstack justify-content-center"
                  style={{ width: '3rem', height: '3rem' }}>
                  <i className="fi fi-rr-users fs-5"></i>
                </div>
                <div>
                  <Card.Title className="mb-2">New Customer</Card.Title>
                  <Card.Subtitle className="fs-13 fw-light">
                    <span className="fs-12 text-success">(2.8% more)</span> from last week
                  </Card.Subtitle>
                </div>
              </Stack>
              <div className="ms-auto fs-20 fw-bold text-dark">23.65K</div>
            </Stack>
          </Card.Body>
          <ReactApexChart options={optionsSuccess} series={series} type="area" height={140} />
        </Card>
        <Card>
          <Card.Body>
            <Stack direction="horizontal" gap={4}>
              <Stack direction="horizontal" gap={3}>
                <div
                  className="bg-danger-subtle text-danger border border-danger border-opacity-10 rounded hstack justify-content-center"
                  style={{ width: '3rem', height: '3rem' }}>
                  <i className="fi fi-rr-briefcase fs-5"></i>
                </div>
                <div>
                  <Card.Title className="mb-2">New Projects</Card.Title>
                  <Card.Subtitle className="fs-13 fw-light">
                    <span className="fs-12 text-danger">(-2.5% more)</span> from last week
                  </Card.Subtitle>
                </div>
              </Stack>
              <div className="ms-auto fs-20 fw-bold text-dark">72.42K</div>
            </Stack>
          </Card.Body>
          <ReactApexChart options={optionsDanger} series={series} type="area" height={140} />
        </Card>
      </div>
    </>
  )
}

export default ProjectCustomerCard

import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import ReactApexChart from 'react-apexcharts'
import { Card, Dropdown, DropdownDivider, ListGroup, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface SalesData {
  id: number
  name: string
  date: string
  amount: string
  color: string
}

const SalesHistoryCard: React.FC = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const options: ApexCharts.ApexOptions = {
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
    colors: [themeColor],
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
      data: [2, 4, 1, 7, 3, 8],
      type: 'area',
    },
  ]

  const salesData: SalesData[] = [
    {
      id: 1,
      name: 'Timothy Boyd',
      date: '24 DEC, 2023',
      amount: '$250.00',
      color: 'primary',
    },
    {
      id: 2,
      name: 'Adrian Monino',
      date: '23 DEC, 2023',
      amount: '$220.00',
      color: 'danger',
    },
    {
      id: 3,
      name: 'Socrates Itumay',
      date: '22 DEC, 2023',
      amount: '$180.00',
      color: 'success',
    },
    {
      id: 4,
      name: 'Althea Cabardo',
      date: '21 DEC, 2023',
      amount: '$150.00',
      color: 'warning',
    },
    {
      id: 5,
      name: 'Laura Foreman',
      date: '20 DEC, 2023',
      amount: '$200.00',
      color: 'info',
    },
  ]

  return (
    <>
      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Sales History</Card.Title>
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
                <span className="ms-3">Sales Report</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <ReactApexChart options={options} series={series} type="area" height={107} />
        <ListGroup variant="flush">
          {salesData.map(({ id, name, date, amount, color }) => (
            <ListGroup.Item className="hstack" key={id} style={{ borderBottomStyle: 'dashed' }}>
              <Stack direction="horizontal" className="d-flex gap-3">
                <div className={`avatar avatar-md rounded bg-${color}-subtle text-${color}`}>
                  <i className="fi fi-rr-grid"></i>
                </div>
                <div>
                  <h6 className="mb-1">{name}</h6>
                  <p className="fs-12 text-muted text-uppercase mb-0">{date}</p>
                </div>
              </Stack>
              <Link to="" className={`ms-auto fs-13 badge bg-${color}-subtle text-${color}`}>
                {amount}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  )
}

export default SalesHistoryCard

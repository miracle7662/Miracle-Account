import { Link } from 'react-router-dom'
import { Card, Dropdown, DropdownDivider, Image, Table } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

// Images
import safari from '@/assets/images/browsers/safari.png'
import chrome from '@/assets/images/browsers/chrome.png'
import firefox from '@/assets/images/browsers/firefox.png'
import opera from '@/assets/images/browsers/opera.png'
import edge from '@/assets/images/browsers/edge.png'
import web from '@/assets/images/browsers/web.png'

const BrowserUsed = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const browserData = [
    { image: safari, name: 'Safari', click: 486, bounceRate: '66.36%' },
    { image: chrome, name: 'Chrome', click: 640, bounceRate: '86.01%' },
    { image: firefox, name: 'Firefox', click: 274, bounceRate: '59.22%' },
    { image: opera, name: 'Opera', click: 456, bounceRate: '63.82%' },
    { image: edge, name: 'Edge', click: 312, bounceRate: '57.48%' },
    { image: web, name: 'Others', click: 428, bounceRate: '35.62%' },
  ]

  const barChartOptions: ApexOptions = {
    chart: {
      height: 206,
      width: '100%',
      type: 'bar',
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: '25%',
      },
    },
    colors: [themeColor],
    xaxis: {
      categories: browserData.map((browser) => browser.name),
      axisBorder: {
        show: false,
      },
      axisTicks: {
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
        top: -48,
        left: 12,
        right: 20,
        bottom: -8,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },
  }

  const series = [
    {
      name: 'Clicks',
      data: browserData.map((browser) => browser.click),
    },
  ]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Browser Used</Card.Title>
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
              <span className="ms-3">Full Reports</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <ReactApexChart options={barChartOptions} series={series} type="bar" height={206} />
      <Table responsive className="mb-0">
        <tbody>
          {browserData.map((browser, index) => (
            <tr key={index}>
              <td className="d-flex align-items-center gap-2">
                <div className="avatar avatar-xs">
                  <Image src={browser.image} fluid alt={browser.name} />
                </div>
                <Link to="" className="ms-2">
                  {browser.name}
                </Link>
              </td>
              <td className="text-end">{browser.click}</td>
              <td className="text-end">{browser.bounceRate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

export default BrowserUsed

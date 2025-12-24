import { useState } from 'react'
import { Card } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import Select from 'react-select'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

const VisitorsOverview = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string }>({
    label: 'Monthly',
    value: 'monthly',
  })
  const options = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'All Times', value: 'all_times' },
  ]

  const getChartData = () => {
    switch (selectedOption.value) {
      case 'daily':
        return [
          {
            name: 'Unique Visitors',
            data: [18, 23, 20, 25, 21, 26, 23, 24, 21, 25, 23, 26],
          },
          {
            name: 'Returning Visitors',
            data: [23, 20, 25, 21, 26, 23, 24, 21, 25, 23, 26, 20],
          },
        ]
      case 'weekly':
        return [
          {
            name: 'Unique Visitors',
            data: [8, 18, 10, 20, 12, 22, 8, 16, 10, 20, 12, 22],
          },
          {
            name: 'Returning Visitors',
            data: [15, 8, 18, 8, 20, 10, 15, 8, 18, 8, 20, 10],
          },
        ]
      case 'monthly':
        return [
          {
            name: 'Unique Visitors',
            data: [10, 25, 11, 28, 12, 32, 10, 25, 11, 28, 12, 32],
          },
          {
            name: 'Returning Visitors',
            data: [20, 11, 26, 10, 30, 14, 20, 11, 26, 10, 30, 14],
          },
        ]
      case 'yearly':
        return [
          {
            name: 'Unique Visitors',
            data: [18, 23, 20, 25, 21, 26, 23, 24, 21, 25, 23, 26],
          },
          {
            name: 'Returning Visitors',
            data: [23, 20, 25, 21, 26, 23, 24, 21, 25, 23, 26, 20],
          },
        ]
      case 'all_times':
        return [
          {
            name: 'Unique Visitors',
            data: [10, 25, 11, 28, 12, 32, 10, 25, 11, 28, 12, 32],
          },
          {
            name: 'Returning Visitors',
            data: [20, 11, 26, 10, 30, 14, 20, 11, 26, 10, 30, 14],
          },
        ]
      default:
        return []
    }
  }

  const apexOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 345,
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
        columnWidth: '35%',
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (e: any) {
          return +e + 'K'
        },
      },
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
      strokeDashArray: 3,
      borderColor: 'rgba(170, 180, 195, 0.25)',
    },
    legend: {
      show: false,
    },
    colors: [themeColor, '#E4E8EF'],
    dataLabels: {
      enabled: false,
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

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
  }

  return (
    <>
      <Card>
        <Card.Header className="d-sm-flex align-items-center py-3">
          <Card.Title>Visitors Overview</Card.Title>
          <div className="ms-auto mt-3 mt-sm-0" style={{ width: '160px' }}>
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              isClearable={false}
              classNamePrefix="select"
            />
          </div>
        </Card.Header>
        <Card.Body>
          <ReactApexChart
            options={apexOptions}
            series={[...getChartData()]}
            type="bar"
            height={345}
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default VisitorsOverview

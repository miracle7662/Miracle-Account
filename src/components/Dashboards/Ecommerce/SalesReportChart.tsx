import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Card } from 'react-bootstrap'
import Select from 'react-select'

interface SalesReportChartProps {}

const SalesReportChart: React.FC<SalesReportChartProps> = () => {
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
      case 'monthly':
        return [
          {
            name: 'Sales',
            data: [20, 45, 10, 75, 35, 80, 40, 85, 45, 90, 55, 105],
            type: 'area',
          },
          {
            name: 'Revenue',
            data: [25, 60, 20, 90, 45, 100, 55, 105, 60, 115, 65, 120],
            type: 'area',
          },
        ]
      case 'weekly':
        return [
          {
            name: 'Sales',
            data: [20, 35, 15, 75, 35, 70, 30, 85, 45, 90, 55, 105],
            type: 'area',
          },
          {
            name: 'Revenue',
            data: [25, 30, 20, 90, 45, 90, 45, 95, 60, 115, 60, 110],
            type: 'area',
          },
        ]
      case 'daily':
        return [
          {
            name: 'Sales',
            data: [30, 55, 20, 85, 45, 90, 50, 95, 55, 100, 65, 110],
            type: 'area',
          },
          {
            name: 'Revenue',
            data: [35, 70, 30, 95, 50, 105, 60, 110, 65, 120, 70, 125],
            type: 'area',
          },
        ]
      case 'yearly':
        return [
          {
            name: 'Sales',
            data: [220, 245, 210, 275, 235, 280, 240, 285, 245, 290, 255, 205],
            type: 'area',
          },
          {
            name: 'Revenue',
            data: [225, 260, 220, 290, 245, 220, 255, 205, 260, 225, 265, 220],
            type: 'area',
          },
        ]
      case 'all_times':
        return [
          {
            name: 'Sales',
            data: [520, 535, 515, 575, 535, 570, 530, 585, 545, 590, 555, 905],
            type: 'area',
          },
          {
            name: 'Revenue',
            data: [525, 530, 520, 590, 455, 590, 545, 595, 560, 515, 560, 910],
            type: 'area',
          },
        ]
      default:
        return []
    }
  }

  const apexOptions: ApexCharts.ApexOptions = {
    chart: {
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
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
        formatter: function (e) {
          return +e + 'K'
        },
        offsetX: -22,
        offsetY: 0,
      },
    },
    stroke: {
      width: 1,
      lineCap: 'round',
      curve: 'smooth',
      dashArray: [0, 3],
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
      strokeDashArray: 4,
      borderColor: 'rgba(170, 180, 195, 0.25)',
    },
    legend: {
      show: false,
    },
    colors: [themeColor, '#e49e3d'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.3,
        stops: [0, 90, 100],
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

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
  }

  return (
    <>
      <Card>
        <Card.Header className="d-flex align-items-center py-3">
          <Card.Title>Sales Report</Card.Title>
          <div className="ms-auto" style={{ width: '160px' }}>
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
            type="area"
            height={302}
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default SalesReportChart

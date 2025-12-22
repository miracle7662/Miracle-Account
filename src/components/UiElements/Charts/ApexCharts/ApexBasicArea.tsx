import React from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

interface ApexBasicAreaProps {}

const ApexBasicArea: React.FC<ApexBasicAreaProps> = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const series = [
    {
      name: 'Completed',
      data: [20, 45, 25, 60, 30, 65, 35, 70, 40, 75, 45, 80],
      type: 'area',
    },
    {
      name: 'Project',
      data: [30, 25, 40, 35, 50, 40, 60, 45, 65, 50, 70, 55],
      type: 'area',
    },
    {
      name: 'Upcoming',
      data: [45, 20, 50, 25, 65, 30, 75, 35, 80, 40, 85, 45],
      type: 'area',
    },
  ]

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      foreColor: '#adb5bd',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
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
      curve: 'smooth',
      width: [1, 2, 3, 4],
      lineCap: 'round',
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
      strokeDashArray: 3,
      borderColor: 'rgba(170, 180, 195, 0.2)',
    },
    legend: {
      show: false,
    },
    colors: [themeColor, '#25b865', '#e49e3d'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.3,
        stops: [0, 100],
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

  return (
    <>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </>
  )
}

export default ApexBasicArea

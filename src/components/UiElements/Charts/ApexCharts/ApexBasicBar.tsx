import React from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

interface ApexBasicBarProps {}

const ApexBasicBar: React.FC<ApexBasicBarProps> = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const series = [
    {
      name: 'Revenue',
      data: [20, 30, 40, 50, 46, 42, 38, 34, 30, 28, 26, 25],
    },
    {
      name: 'Profite',
      data: [15, 25, 35, 45, 41, 38, 33, 28, 23, 18, 13, 10],
    },
    {
      name: 'Expenses',
      data: [10, 20, 30, 40, 40, 30, 30, 20, 20, 10, 10, 5],
    },
  ]

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      foreColor: '#adb5bd',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: '35%',
        distributed: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: ['#25b865', themeColor, '#e49e3d'],

    xaxis: {
      categories: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUE',
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
          return +e + ' K'
        },
        offsetX: -5,
        offsetY: 0,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (e) {
          return +e + ' K'
        },
      },
    },
    legend: {
      show: false,
    },
  }

  return <ReactApexChart options={options} series={series} type="bar" height={350} />
}

export default ApexBasicBar

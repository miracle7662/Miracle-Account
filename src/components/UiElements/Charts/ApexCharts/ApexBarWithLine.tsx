import React from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

interface ApexBarWithLineProps {}

const ApexBarWithLine: React.FC<ApexBarWithLineProps> = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const series = [
    {
      name: 'Payment Rejected',
      type: 'bar',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21],
    },
    {
      name: 'Payment Completed',
      type: 'line',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 41],
    },
    {
      name: 'Awaiting Payment',
      type: 'bar',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 56],
    },
  ]

  const options: ApexOptions = {
    chart: {
      height: 350,
      width: '100%',
      foreColor: '#adb5bd',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [1, 2, 3],
      curve: 'smooth',
      lineCap: 'round',
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '30%',
      },
    },
    colors: [themeColor, '#a2acc7', '#E1E3EA'],
    fill: {
      opacity: [0.85, 0.25, 1, 1],
      gradient: {
        shade: 'dark',
        type: 'vertical',
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 0,
    },
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
          return +e + 'K'
        },
        offsetX: -5,
        offsetY: 0,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
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
    legend: {
      show: false,
    },
  }

  return (
    <>
      <ReactApexChart options={options} series={series} height={350} />
    </>
  )
}

export default ApexBarWithLine

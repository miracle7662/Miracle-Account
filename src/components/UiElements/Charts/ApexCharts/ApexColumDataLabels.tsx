import React from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

interface ApexColumDataLabelsProps {}

const ApexColumDataLabels: React.FC<ApexColumDataLabelsProps> = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const series = [
    {
      name: 'Expenses',
      data: [50, 60, 70, 80, 140, 80, 70, 60, 50, 40, 30, 20],
    },
    {
      name: 'Revenue',
      data: [60, 70, 80, 90, 150, 90, 80, 70, 60, 50, 40, 30],
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
      width: 3,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '70%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: ['#ced4da', themeColor],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + 'K'
      },
      offsetY: -20,
      style: {
        fontSize: '11px',
        colors: ['#dee2e6', themeColor],
      },
    },
    grid: {
      show: false,
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
      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + 'K'
        },
      },
    },
    legend: {
      position: 'bottom',
      offsetY: 6,
    },
    tooltip: {
      theme: 'dark',
    },
  }

  return (
    <>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </>
  )
}

export default ApexColumDataLabels

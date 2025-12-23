import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

interface ApexRadarMultipleProps {}

const ApexRadarMultiple: React.FC<ApexRadarMultipleProps> = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const [series] = useState([
    {
      name: 'Revenue',
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: 'Expenses',
      data: [20, 30, 40, 80, 20, 80],
    },
    {
      name: 'Profit',
      data: [44, 76, 78, 13, 43, 10],
    },
  ])

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'radar',
      foreColor: '#adb5bd',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    colors: ['#85D00B', themeColor, '#00CCCC'],
    xaxis: {
      categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },
  }

  return (
    <>
      <ReactApexChart options={options} series={series} type="radar" height={380} />
    </>
  )
}

export default ApexRadarMultiple

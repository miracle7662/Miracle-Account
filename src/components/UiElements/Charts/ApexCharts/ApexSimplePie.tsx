import React from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

interface ApexSimplePieProps {}

const ApexSimplePie: React.FC<ApexSimplePieProps> = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const series = [44, 55, 13, 43, 22]

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
      foreColor: '#adb5bd',
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#00275E', themeColor, '#85D00B', '#00CCCC', '#6610F2'],
    labels: ['Sumi', 'Swapan', 'Sojib', 'Swampa', 'Sowrav'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      show: true,
      position: 'bottom',
      itemMargin: {
        vertical: 15,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
    },
  }

  return (
    <>
      <ReactApexChart options={options} series={series} type="pie" height={380} />
    </>
  )
}

export default ApexSimplePie

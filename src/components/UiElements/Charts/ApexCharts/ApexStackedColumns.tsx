import React from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

interface ApexStackedColumnsProps {}

const ApexStackedColumns: React.FC<ApexStackedColumnsProps> = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const series = [
    {
      name: 'Leads',
      data: [4, 5, 4, 6, 3, 4, 5, 4, 6, 3, 4, 5],
    },
    {
      name: 'Active',
      data: [3, 4, 3, 6, 5, 3, 3, 6, 4, 5, 4, 3],
    },
    {
      name: 'Pending',
      data: [4, 5, 4, 6, 3, 4, 5, 4, 6, 3, 4, 6],
    },
    {
      name: 'Resolved',
      data: [4, 5, 4, 6, 3, 4, 5, 4, 5, 3, 4, 5],
    },
    {
      name: 'Calcelled',
      data: [4, 5, 4, 6, 3, 4, 5, 4, 6, 3, 4, 5],
    },
  ]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      foreColor: '#adb5bd',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '20%',
        horizontal: false,
      },
    },
    colors: ['#00275E', '#85D00B', themeColor, '#00CCCC', '#6610F2'],

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
      labels: {
        style: {
          fontSize: '11px',
          colors: '#adb5bd',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (e: any) {
          return +e + ' K'
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
      shared: true,
      followCursor: false,
      intersect: false,
      y: {
        formatter: function (e: any) {
          return +e + 'K'
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '12px',
      fontFamily: 'Inter',
      labels: {
        colors: '#64748b',
      },
     markers: {
  width: 10,
  height: 10,
  radius: 25,
} as any,

      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
  }

  return <ReactApexChart options={options} series={series} type="bar" height={350} />
}

export default ApexStackedColumns

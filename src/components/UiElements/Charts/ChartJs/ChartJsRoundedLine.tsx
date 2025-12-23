import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  tension: 0.5,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        stepSize: 16,
        color: '#E1E3EA',
        font: {
          size: 14,
          family: 'Inter, sans-serif',
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#adb5bd',
        font: {
          size: 14,
          family: 'Inter, sans-serif',
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        font: {
          color: '#adb5bd',
          family: 'Inter, sans-serif',
        },
      },
    },
  },
}

export const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [22, 39, 30, 20, 25, 28, 22, 39, 30, 30, 25, 38],
      backgroundColor: '#3E97FF',
    },
    {
      label: 'Expenses',
      data: [20, 35, 27, 18, 20, 25, 20, 35, 25, 28, 22, 35],
      backgroundColor: '#E1E3EA',
    },
    {
      label: 'Profit',
      data: [25, 30, 25, 22, 24, 22, 25, 30, 28, 32, 20, 30],
      backgroundColor: '#e49e3d',
    },
  ],
}

export default function ChartJsRoundedLine() {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const dynamicData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: index === 0 ? themeColor : dataset.backgroundColor,
    })),
  }

  return <Line options={options} data={dynamicData} height={450} />
}

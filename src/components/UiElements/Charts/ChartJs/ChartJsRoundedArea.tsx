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
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
)

export const options = {
  tension: 0.5,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
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
        color: '#adb5bd',
        font: {
          size: 14,
          family: 'Inter, sans-serif',
        },
      },
    },
    x: {
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
}

export const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Current',
      borderDash: [5, 6],
      borderColor: '#e49e3d',
      backgroundColor: '#fff',
      data: [35, 48, 45, 65, 60, 85, 70],
    },
    {
      fill: true,
      label: 'Previous',
      borderColor: 'rgba(170, 180, 195, 0.1)',
      backgroundColor: 'rgba(142, 212, 172, 0.25)',
      data: [32, 42, 42, 62, 52, 75, 62],
    },
  ],
}

export default function ChartJsRoundedArea() {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const dynamicData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: index === 0 ? themeColor : dataset.backgroundColor,
      borderColor: index === 0 ? themeColor : dataset.borderColor,
    })),
  }

  return <Line options={options} data={dynamicData} height={450} />
}

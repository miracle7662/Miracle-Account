import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  barPercentage: 0.75,
  categoryPercentage: 0.25,
  maintainAspectRatio: false,
  scales: {
    y: {
      stacked: true,
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
      stacked: true,
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
  elements: {
    bar: {
      borderRadius: 5,
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

const data = {
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

export default function ChartJsStackedBar() {
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

  return <Bar options={options} data={dynamicData} height={450} />
}

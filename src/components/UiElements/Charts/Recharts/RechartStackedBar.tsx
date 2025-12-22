import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

const generateRandomData = () => {
  const getRandomValue = () => Math.floor(Math.random() * 5000)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return Array.from({ length: 12 }, () => ({
    name: months,
    leads: getRandomValue(),
    active: getRandomValue(),
    pending: getRandomValue(),
    resolved: getRandomValue(),
    calcelled: getRandomValue(),
    amt: getRandomValue(),
  }))
}

const data = generateRandomData()

const RechartStackedBar = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap={40}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="leads" stackId="a" fill="#00275E" />
          <Bar dataKey="active" stackId="a" fill="#85D00B" />
          <Bar dataKey="pending" stackId="a" fill={themeColor} />
          <Bar dataKey="resolved" stackId="a" fill="#00CCCC" />
          <Bar dataKey="calcelled" stackId="a" fill="#6610F2" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default RechartStackedBar

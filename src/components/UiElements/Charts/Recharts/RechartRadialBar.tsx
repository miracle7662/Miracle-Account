import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
}

const RechartRadialBar = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const data = [
    {
      name: '18-24',
      uv: 31.47,
      pv: 2400,
      fill: themeColor,
    },
    {
      name: '25-29',
      uv: 26.69,
      pv: 4567,
      fill: '#83a6ed',
    },
    {
      name: '30-34',
      uv: 15.69,
      pv: 1398,
      fill: '#8dd1e1',
    },
    {
      name: '35-39',
      uv: 8.22,
      pv: 9800,
      fill: '#82ca9d',
    },
    {
      name: '40-49',
      uv: 8.63,
      pv: 3908,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: 2.63,
      pv: 4800,
      fill: '#d0ed57',
    },
    {
      name: 'unknow',
      uv: 6.67,
      pv: 4800,
      fill: '#ffc658',
    },
  ]

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={data}
        >
          <RadialBar label={{ position: 'insideStart', fill: '#fff' }} background dataKey="uv" />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    </>
  )
}

export default RechartRadialBar

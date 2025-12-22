import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ProgressbarBasic = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  return (
    <>
      <CircularProgressbar
        value={60}
        text={`${60}%`}
        styles={{
          root: {
            height: '15rem',
          },
          path: {
            stroke: themeColor,
            strokeWidth: '0.375rem',
            strokeLinecap: 'butt',
          },
          trail: {
            stroke: '#EDEFF1',
            strokeWidth: '0.375rem',
          },
          text: {
            fontSize: '1rem',
            fontWeight: 'bold',
            fill: themeColor,
          },
        }}
      />
    </>
  )
}

export default ProgressbarBasic

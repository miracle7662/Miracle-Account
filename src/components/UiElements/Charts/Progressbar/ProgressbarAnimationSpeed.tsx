import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import { CircularProgressbar } from 'react-circular-progressbar'
import ChangingProgressProvider from './provider/ChangingProgressProvider'
import 'react-circular-progressbar/dist/styles.css'

const ProgressbarAnimationSpeed = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  return (
    <>
      <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
        {(percentage: number) => (
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={{
              root: {
                height: '15rem',
              },
              path: {
                stroke: themeColor,
                strokeWidth: '0.375rem',
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
        )}
      </ChangingProgressProvider>
    </>
  )
}

export default ProgressbarAnimationSpeed

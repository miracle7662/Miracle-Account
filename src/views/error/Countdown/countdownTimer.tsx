import { FC } from 'react'
import { Row, Col } from 'react-bootstrap'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

const minuteSeconds = 60
const hourSeconds = 3600
const daySeconds = 86400

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
}

const renderTime = (dimension: string, time: number) => {
  return (
    <div className="time-wrapper" style={{ lineHeight: '1.2' }}>
      <div className={`fs-16 fw-bold text-dark`}>{time}</div>
      <div className="fs-13 fw-normal text-muted">{dimension}</div>
    </div>
  )
}

const CountdownTimer: FC = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const stratTime = Date.now() / 1000
  const endTime = stratTime + 243248

  const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0
  const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0
  const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0
  const getTimeDays = (time: number) => (time / daySeconds) | 0

  const remainingTime = endTime - stratTime
  const days = Math.ceil(remainingTime / daySeconds)
  const daysDuration = days * daySeconds

  const timers = [
    { duration: daysDuration, getTime: getTimeDays, unit: 'Days' },
    { duration: daySeconds, getTime: getTimeHours, unit: 'Hrs' },
    { duration: hourSeconds, getTime: getTimeMinutes, unit: 'Mins' },
    { duration: minuteSeconds, getTime: getTimeSeconds, unit: 'Secs' },
  ]

  return (
    <>
      <Row className="gy-12">
        {timers.map(({ duration, unit }, index) => (
          <Col
            key={index}
            xs={6}
            sm={3}
            className="d-flex align-items-center justify-content-center"
          >
            <CountdownCircleTimer
              {...timerProps}
              size={80}
              strokeWidth={4}
              colors={themeColor}
              trailColor={'#edeff1'}
              duration={duration}
              initialRemainingTime={remainingTime % duration}
              onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > duration,
              })}
            >
              {({ elapsedTime }) => (
                <div>{renderTime(unit, timers[index].getTime(duration - elapsedTime))}</div>
              )}
            </CountdownCircleTimer>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CountdownTimer

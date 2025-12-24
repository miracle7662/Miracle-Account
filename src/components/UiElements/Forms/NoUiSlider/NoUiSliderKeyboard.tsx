import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'

const NoUiSliderKeyboard = () => {
  const sliderOptions = {
    start: 10,
    step: 10,
    range: {
      min: 0,
      max: 100,
    },
    accessibility: {
      enabled: true,
    },
  }

  return (
    <>
      <Nouislider {...sliderOptions} />
    </>
  )
}

export default NoUiSliderKeyboard

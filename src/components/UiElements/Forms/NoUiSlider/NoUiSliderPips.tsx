import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'

const NoUiSliderPips = () => {
  return (
    <>
      <Nouislider
        start={[50]}
        pips={{ mode: 'count', values: 5 }}
        clickablePips
        range={{
          min: 0,
          max: 100,
        }}
      />
    </>
  )
}

export default NoUiSliderPips

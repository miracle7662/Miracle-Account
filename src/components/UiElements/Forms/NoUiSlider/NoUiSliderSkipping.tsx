import React, { Component } from 'react'
import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'

interface NoUiSliderSkippingState {
  skippingValue: number
}

class NoUiSliderSkipping extends Component<
  React.PropsWithChildren<object>,
  NoUiSliderSkippingState
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props)

    this.state = {
      skippingValue: 20,
    }
  }

  onSkipSlide = (render: any, handle: any, value: number[], un: any, percent: number[]) => {
    this.setState({
      skippingValue: value[0],
    })
  }

  render() {
    const { skippingValue } = this.state

    return (
      <>
        <Nouislider
          start={20}
          snap
          range={{
            min: 0,
            '10%': 10,
            '20%': 20,
            '30%': 30,
            '50%': 50,
            '60%': 60,
            '70%': 70,
            '90%': 90,
            max: 100,
          }}
          onSlide={this.onSkipSlide}
        />
        {!!skippingValue && <div>Value: {skippingValue}</div>}
      </>
    )
  }
}

export default NoUiSliderSkipping

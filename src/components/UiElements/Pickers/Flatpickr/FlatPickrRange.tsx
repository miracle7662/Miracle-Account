import { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface FlatPickrRangeState {
  date: Date
  v: string
  onChange: (_: any, str: any) => void
  range: Date[]
  startDate: Date
  endDate: Date
  handler: (dates: any) => void
}

class FlatPickrRange extends Component<Record<string, never>, FlatPickrRangeState> {
  constructor(props: Record<string, never>) {
    super(props)

    this.state = {
      date: new Date(),
      v: '2016-01-01 01:01',
      onChange: (_, str) => {
        console.info(str)
      },
      range: [new Date()],
      startDate: new Date(),
      endDate: new Date(),
      handler: (dates) => {
        console.log('initial handler', dates)
      },
    }
  }

  handleChange = (dates: Date[]) => {
    const [date] = dates
    this.setState({ date })
  }

  render() {
    return (
      <>
        <Flatpickr
          value={this.state.range}
          options={{ mode: 'range' }}
          onChange={(dates, str) => {
            this.setState((state) => ({
              ...state,
              range: dates,
            }))
          }}
          className="form-control"
          placeholder="Select date..."
        />
      </>
    )
  }
}

export default FlatPickrRange

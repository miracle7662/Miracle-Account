import { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface FlatPickrWeekNumberState {
  date: Date
}

class FlatPickrWeekNumber extends Component<Record<string, never>, FlatPickrWeekNumberState> {
  constructor(props: Record<string, never>) {
    super(props)

    this.state = {
      date: new Date(),
    }
  }

  handleChange = (dates: Date[]) => {
    const [date] = dates
    this.setState({ date })
  }

  render() {
    return (
      <Flatpickr
        options={{
          weekNumbers: true,
        }}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Select date..."
      />
    )
  }
}

export default FlatPickrWeekNumber

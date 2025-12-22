import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface FlatPickrDateTimeState {
  date: Date
}

class FlatPickrDateTime extends Component<React.PropsWithChildren<object>, FlatPickrDateTimeState> {
  constructor(props: React.PropsWithChildren<object>) {
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
        data-enable-time
        onChange={this.handleChange}
        className="form-control"
        placeholder="Select date..."
      />
    )
  }
}

export default FlatPickrDateTime

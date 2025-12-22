import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface FlatPickrBasicState {
  date: Date
}

class FlatPickrBasic extends Component<React.PropsWithChildren<object>, FlatPickrBasicState> {
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
        onChange={this.handleChange}
        className="form-control"
        placeholder="Select date..."
      />
    )
  }
}

export default FlatPickrBasic

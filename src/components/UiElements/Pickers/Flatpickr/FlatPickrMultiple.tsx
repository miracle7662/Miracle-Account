import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface FlatPickrMultipleState {
  date: Date
}

class FlatPickrMultiple extends Component<React.PropsWithChildren<object>, FlatPickrMultipleState> {
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
        options={{
          mode: 'multiple',
        }}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Select date..."
      />
    )
  }
}

export default FlatPickrMultiple

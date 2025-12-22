import React, { Component } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface FlatPickrHandlerState {
  startDate: Date
}

class FlatPickrHandler extends Component<React.PropsWithChildren<object>, FlatPickrHandlerState> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props)

    this.state = {
      startDate: new Date(),
    }
  }

  render() {
    return (
      <Flatpickr
        value="2023-12-05 01:01"
        data-enable-time
        options={{ wrap: true }}
        onChange={(_, str) => console.info(str)}
      >
        <InputGroup>
          <InputGroup.Text data-toggle>
            <i className="fi fi-rr-calendar-clock"></i>
          </InputGroup.Text>
          <Form.Control data-input type="text" placeholder="Select date..." />
          <InputGroup.Text data-clear>
            <i className="fi fi-rr-cross-circle"></i>
          </InputGroup.Text>
        </InputGroup>
      </Flatpickr>
    )
  }
}

export default FlatPickrHandler

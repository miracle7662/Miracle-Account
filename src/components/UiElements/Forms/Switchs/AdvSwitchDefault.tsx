import React from 'react'
import Form from 'react-bootstrap/Form'

const switches = [
  {
    label: 'Default',
    className: 'switch',
  },
  {
    label: 'Square',
    className: 'switch switch-square',
  },
]

const AdvSwitchDefault = () => {
  return (
    <>
      {switches.map(({ label, className }, index) => (
        <React.Fragment key={index}>
          <Form.Check.Label className={className}>
            <Form.Check.Input
              type="checkbox"
              className="switch-input"
              defaultChecked={index === 0}
            />
            <span className="switch-toggle-slider">
              <span className="switch-on"></span>
              <span className="switch-off"></span>
            </span>
            <span className="switch-label">{label}</span>
          </Form.Check.Label>
          <br />
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

export default AdvSwitchDefault

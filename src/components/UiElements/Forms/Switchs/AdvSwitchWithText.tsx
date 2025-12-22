import React from 'react'
import Form from 'react-bootstrap/Form'

const switches = [
  {
    label: 'withText Default',
    className: 'switch',
    onText: 'on',
    offText: 'off',
    defaultChecked: true,
  },
  {
    label: 'withText Square',
    className: 'switch switch-square',
    onText: 'on',
    offText: 'off',
    defaultChecked: false,
  },
]

const AdvSwitchWithText = () => {
  return (
    <>
      {switches.map(({ label, className, onText, offText, defaultChecked }, index) => (
        <React.Fragment key={index}>
          <Form.Check.Label className={className}>
            <Form.Check.Input
              type="checkbox"
              className="switch-input"
              defaultChecked={defaultChecked}
            />
            <span className="switch-toggle-slider">
              <span className="switch-on">{onText}</span>
              <span className="switch-off">{offText}</span>
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

export default AdvSwitchWithText

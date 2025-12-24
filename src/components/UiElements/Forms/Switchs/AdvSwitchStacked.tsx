import React from 'react'
import Form from 'react-bootstrap/Form'

const stackedSwitches = [
  { size: 'sm', name: 'switches-stacked-radio', label: 'Option 1' },
  { size: '', name: 'switches-stacked-radio', label: 'Option 2' },
  { size: 'lg', name: 'switches-stacked-radio', label: 'Option 3' },
]

const stackedSquareSwitches = [
  {
    size: 'sm',
    name: 'switches-square-stacked-radio',
    label: 'Option 1',
    className: 'switch switch-square',
  },
  {
    size: '',
    name: 'switches-square-stacked-radio',
    label: 'Option 2',
    className: 'switch switch-square',
  },
  {
    size: 'lg',
    name: 'switches-square-stacked-radio',
    label: 'Option 3',
    className: 'switch switch-square',
  },
]

const AdvSwitchStacked = () => {
  return (
    <>
      {stackedSwitches.map(({ size, name, label }, index) => (
        <React.Fragment key={index}>
          <Form.Check.Label className={`switch${size ? ` switch-${size}` : ''}`}>
            <Form.Check.Input
              type="radio"
              className="switch-input"
              name={name}
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

      <hr className="my-4" />

      {stackedSquareSwitches.map(({ size, name, label, className }, index) => (
        <React.Fragment key={index}>
          <Form.Check.Label
            className={`switch${size ? ` switch-${size}` : ''}${className ? ` ${className}` : ''}`}
          >
            <Form.Check.Input
              type="radio"
              className="switch-input"
              name={name}
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

export default AdvSwitchStacked

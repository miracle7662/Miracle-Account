import React from 'react'
import Form from 'react-bootstrap/Form'

const switches = [
  {
    label: 'withIcon Default',
    className: 'switch',
    onIcon: 'fi fi-rr-check fs-12',
    offIcon: 'fi fi-rr-cross-small',
    defaultChecked: true,
  },
  {
    label: 'withIcon Square',
    className: 'switch switch-square',
    onIcon: 'fi fi-rr-check fs-12',
    offIcon: 'fi fi-rr-cross-small',
    defaultChecked: false,
  },
]

const AdvSwitchWithIcon = () => {
  return (
    <>
      {switches.map(({ label, className, onIcon, offIcon, defaultChecked }, index) => (
        <React.Fragment key={index}>
          <Form.Check.Label className={className}>
            <Form.Check.Input
              type="checkbox"
              className="switch-input"
              defaultChecked={defaultChecked}
            />
            <span className="switch-toggle-slider">
              <span className="switch-on">
                <i className={onIcon}></i>
              </span>
              <span className="switch-off">
                <i className={offIcon}></i>
              </span>
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

export default AdvSwitchWithIcon

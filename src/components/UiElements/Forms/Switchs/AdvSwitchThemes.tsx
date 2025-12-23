import Form from 'react-bootstrap/Form'

const AdvSwitchThemes = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      <div className="hstack flex-wrap gap-6 ">
        {colors.map((variant) => (
          <Form.Check.Label
            key={variant}
            className={`switch switch-sm switch-${variant.toLowerCase()}`}
          >
            <Form.Check.Input type="checkbox" className="switch-input" defaultChecked />
            <span className="switch-toggle-slider">
              <span className="switch-on">on</span>
              <span className="switch-off">off</span>
            </span>
            <span className="switch-label">{variant}</span>
          </Form.Check.Label>
        ))}
      </div>
      <hr className="my-6" />
      <div className="hstack flex-wrap gap-6 ">
        {colors.map((variant) => (
          <Form.Check.Label className={`me-6 switch switch-${variant.toLowerCase()}`} key={variant}>
            <Form.Check.Input type="checkbox" className="switch-input" defaultChecked />
            <span className="switch-toggle-slider">
              <span className="switch-on">on</span>
              <span className="switch-off">off</span>
            </span>
            <span className="switch-label">{variant}</span>
          </Form.Check.Label>
        ))}
      </div>
      <hr className="my-6" />
      <div className="hstack flex-wrap gap-6 ">
        {colors.map((variant) => (
          <Form.Check.Label
            className={`me-6 switch switch-square switch-${variant.toLowerCase()}`}
            key={variant}
          >
            <Form.Check.Input type="checkbox" className="switch-input" defaultChecked />
            <span className="switch-toggle-slider">
              <span className="switch-on">on</span>
              <span className="switch-off">off</span>
            </span>
            <span className="switch-label">{variant}</span>
          </Form.Check.Label>
        ))}
      </div>
      <hr className="my-6" />
      <div className="hstack flex-wrap gap-6 ">
        {colors.map((variant) => (
          <Form.Check.Label
            className={`me-6 switch switch-lg switch-${variant.toLowerCase()}`}
            key={variant}
          >
            <Form.Check.Input type="checkbox" className="switch-input" defaultChecked />
            <span className="switch-toggle-slider">
              <span className="switch-on">on</span>
              <span className="switch-off">off</span>
            </span>
            <span className="switch-label">{variant}</span>
          </Form.Check.Label>
        ))}
      </div>
    </>
  )
}

export default AdvSwitchThemes

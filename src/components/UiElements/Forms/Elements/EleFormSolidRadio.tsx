import { Table } from 'react-bootstrap'

const EleFormSolidRadio = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  const radioButtons = colors.map((variant, idx) => ({
    id: `flexRadio${variant}`,
    name: `flexRadioSolidColor${variant}`,
    label: variant,
    checkedId: `flexRadio${variant}Checked`,
  }))

  return (
    <Table responsive borderless>
      <thead>
        <tr>
          <th>Colors</th>
          <th>Default</th>
          <th>Checked</th>
          <th>Disabled</th>
        </tr>
      </thead>
      <tbody>
        {radioButtons.map(({ id, name, label, checkedId }) => (
          <tr key={id}>
            <td>{label}</td>
            <td>
              <div className="form-check mb-4 mb-md-6 mb-lg-8">
                <input
                  className={`form-check-input form-radio-${label.toLowerCase()}`}
                  type="radio"
                  name={name}
                  id={id}
                />
                <label className="form-check-label" htmlFor={id}>
                  {label}
                </label>
              </div>
            </td>
            <td>
              <div className="form-check mb-4 mb-md-6 mb-lg-8">
                <input
                  className={`form-check-input form-radio-${label.toLowerCase()}`}
                  type="radio"
                  name={name}
                  id={checkedId}
                  defaultChecked={!!checkedId}
                />
                <label className="form-check-label" htmlFor={checkedId}>
                  {label}
                </label>
              </div>
            </td>
            <td>
              <div className="form-check mb-4 mb-md-6 mb-lg-8">
                <input
                  className={`form-check-input form-radio-${label.toLowerCase()}`}
                  type="radio"
                  name={name}
                  id={`${id}CheckedDisabled`}
                  disabled
                />
                <label className="form-check-label" htmlFor={`${id}CheckedDisabled`}>
                  {label}
                </label>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default EleFormSolidRadio

import { Table } from 'react-bootstrap'
const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

const EleFormSolidCheckbox = () => {
  const checkboxes = colors.map((variant, idx) => ({
    id: `flexCheck${variant}`,
    label: variant,
    checkedId: `flexCheck${variant}Checked`,
    checkedDisabledId: `flexCheck${variant}CheckedDisabled`,
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
        {checkboxes.map(({ id, label, checkedId, checkedDisabledId }) => (
          <tr key={id}>
            <td>{label}</td>
            <td>
              <div className="form-check mb-4 mb-md-6 mb-lg-8">
                <input
                  className={`form-check-input form-check-${label.toLowerCase()}`}
                  type="checkbox"
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
                  className={`form-check-input form-check-${label.toLowerCase()}`}
                  type="checkbox"
                  id={checkedId}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor={checkedId}>
                  {label}
                </label>
              </div>
            </td>
            <td>
              <div className="form-check mb-4 mb-md-6 mb-lg-8">
                <input
                  className={`form-check-input form-check-${label.toLowerCase()}`}
                  type="checkbox"
                  id={checkedDisabledId}
                  defaultChecked
                  disabled
                />
                <label className="form-check-label" htmlFor={checkedDisabledId}>
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

export default EleFormSolidCheckbox

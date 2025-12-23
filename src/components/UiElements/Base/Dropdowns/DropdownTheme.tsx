import { Dropdown, Stack } from 'react-bootstrap'

const DropdownTheme = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {colors.map((variant) => (
          <Dropdown className={`d-inline-block dropdown-${variant.toLowerCase()}`} key={variant}>
            <Dropdown.Toggle variant="" className={`btn-${variant.toLowerCase()}`}>
              Theme {variant}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">
                <i className="fi fi-rr-apps-add"></i>
                <span className="ms-3">Menu item</span>
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <i className="fi fi-rr-airplay"></i>
                <span className="ms-3">Menu item</span>
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">
                <i className="fi fi-rr-star"></i>
                <span className="ms-3">Menu item</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">
                <i className="fi fi-rr-trash"></i>
                <span className="ms-3">Menu item</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </Stack>
    </>
  )
}

export default DropdownTheme

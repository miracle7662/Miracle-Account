import { Stack, Dropdown } from 'react-bootstrap'

const DropdownBasic = () => {
  const sizings = ['sm', 'default', 'md', 'lg', 'xl', 'xxl']

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {sizings.map((variant) => (
          <Dropdown className="d-inline-block" key={variant}>
            <Dropdown.Toggle variant="primary">Dropdown SM</Dropdown.Toggle>
            <Dropdown.Menu className={`dropdown-${variant}`}>
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

export default DropdownBasic

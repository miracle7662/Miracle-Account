import { Dropdown, DropdownButton, ButtonGroup, Stack } from 'react-bootstrap'

const DropdownBasic = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {colors.map((variant) => (
          <DropdownButton
            as={ButtonGroup}
            key={variant}
            id={`dropdown-variants-${variant}`}
            variant={variant.toLowerCase()}
            title={variant}
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
          </DropdownButton>
        ))}
      </Stack>
    </>
  )
}

export default DropdownBasic

import { Dropdown, DropdownButton, ButtonGroup, Stack } from 'react-bootstrap'

const dropdownItems = [
  { autoClose: undefined, title: 'Default Close', icon: 'fi fi-rr-apps-add' },
  { autoClose: 'inside' as const, title: 'Clickable Outside', icon: 'fi fi-rr-apps-add' },
  { autoClose: 'outside' as const, title: 'Clickable Inside', icon: 'fi fi-rr-apps-add' },
  { autoClose: false, title: 'Manual Close', icon: 'fi fi-rr-apps-add' },
]

const DropdownWithIcon = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {dropdownItems.map(({ autoClose, title, icon }, index) => (
          <DropdownButton
            key={index}
            as={ButtonGroup}
            title={
              <>
                <i className={icon}></i>
                <span className="ms-2">{title}</span>
              </>
            }
            autoClose={autoClose}
          >
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
          </DropdownButton>
        ))}
      </Stack>
    </>
  )
}

export default DropdownWithIcon

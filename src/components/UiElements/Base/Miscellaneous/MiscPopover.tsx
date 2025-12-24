import { Stack } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const MiscPopover = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {colors.map((variant) => (
          <OverlayTrigger
            key={variant}
            overlay={
              <Popover id={`popover-${variant}`} className={`popover-${variant.toLowerCase()}`}>
                <Popover.Header as="h3">{`Popover ${variant}`}</Popover.Header>
                <Popover.Body>
                  And here's some amazing content. It's very engaging. Right?{' '}
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="" className={`btn-${variant.toLowerCase()}`}>
              Popover {variant}
            </Button>
          </OverlayTrigger>
        ))}
      </Stack>
    </>
  )
}

export default MiscPopover

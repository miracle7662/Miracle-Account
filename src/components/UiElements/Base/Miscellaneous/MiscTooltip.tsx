import { Stack } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const MiscTooltip = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {colors.map((variant) => (
          <OverlayTrigger
            key={variant}
            overlay={
              <Tooltip id={`tooltip-${variant}`} className={`tooltip-${variant.toLowerCase()}`}>
                This top tooltip is themed via CSS variables. Tooltip on <strong>{variant}</strong>.
              </Tooltip>
            }
          >
            <Button variant="" className={`btn-${variant.toLowerCase()}`}>
              Tooltip {variant}
            </Button>
          </OverlayTrigger>
        ))}
      </Stack>
    </>
  )
}

export default MiscTooltip

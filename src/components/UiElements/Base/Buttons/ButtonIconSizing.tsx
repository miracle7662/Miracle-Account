import { Button, Stack } from 'react-bootstrap'
import { buttonSizingVariants } from './data/buttonData'

const ButtonWithIcon = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSizingVariants.map(({ variant, size }, index) => (
          <Button key={index} variant={variant} className={`btn-icon rounded btn-${size}`}>
            <i className="fi fi-rr-bell"></i>
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSizingVariants.map(({ variant, size }, index) => (
          <Button key={index} variant={variant} className={`btn-icon btn-${size}`}>
            <i className="fi fi-rr-bell"></i>
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonWithIcon

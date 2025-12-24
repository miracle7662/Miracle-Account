import { Button, Stack } from 'react-bootstrap'
import { buttonVariants, buttonSoftVariants } from './data/buttonData'

const ButtonIconSolid = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="btn-icon">
            <i className="fi fi-rr-bell"></i>
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSoftVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="btn-icon rounded-pill">
            <i className="fi fi-rr-bell"></i>
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonIconSolid

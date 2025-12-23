import { Button, Stack } from 'react-bootstrap'
import { buttonSoftVariants } from './data/buttonData'

const ButtonWithIconSoft = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSoftVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant}>
            <i className="fi fi-rr-bell"></i>
            <span className="ms-2">{text}</span>
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSoftVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="rounded-pill">
            <i className="fi fi-rr-bell"></i>
            <span className="ms-2">{text}</span>
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonWithIconSoft

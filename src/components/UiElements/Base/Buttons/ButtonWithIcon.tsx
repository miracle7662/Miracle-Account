import { Button, Stack } from 'react-bootstrap'
import { buttonVariants } from './data/buttonData'

const ButtonWithIcon = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant}>
            <i className="fi fi-rr-bell"></i>
            <span className="ms-2">{text}</span>
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="rounded-pill">
            <i className="fi fi-rr-bell"></i>
            <span className="ms-2">{text}</span>
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonWithIcon

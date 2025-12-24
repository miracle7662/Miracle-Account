import { Button, Stack } from 'react-bootstrap'
import { buttonOutlineVariants } from './data/buttonData'

const ButtonOutline = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonOutlineVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant}>
            {text}
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonOutlineVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="rounded-pill">
            {text}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonOutline

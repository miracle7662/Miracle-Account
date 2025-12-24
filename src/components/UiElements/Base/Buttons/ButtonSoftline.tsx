import { Button, Stack } from 'react-bootstrap'
import { buttonSoftOutlineVariants } from './data/buttonData'

const ButtonSoftline = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSoftOutlineVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant}>
            {text}
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSoftOutlineVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="rounded-pill">
            {text}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonSoftline

import { Button, Stack } from 'react-bootstrap'
import { buttonSoftVariants } from './data/buttonData'

const ButtonSoft = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSoftVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant}>
            {text}
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSoftVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="rounded-pill">
            {text}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonSoft

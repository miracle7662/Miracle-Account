import { Button, Stack } from 'react-bootstrap'
import { buttonGradientVariants } from './data/buttonData'

const ButtonGradient = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonGradientVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="bg-gradient">
            {text}
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonGradientVariants.map(({ variant, text }, index) => (
          <Button key={index} variant={variant} className="rounded-pill bg-gradient">
            {text}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonGradient

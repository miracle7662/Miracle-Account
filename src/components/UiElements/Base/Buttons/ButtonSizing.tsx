import { Button, Stack } from 'react-bootstrap'
import { buttonSizingVariants } from './data/buttonData'

const ButtonSizing = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSizingVariants.map(({ size }, index) => (
          <Button key={index} variant="primary" className={`btn-${size}`}>
            button-{size}
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonSizingVariants.map(({ size }, index) => (
          <Button key={index} variant="primary" className={`btn-${size} rounded-pill`}>
            button-{size}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonSizing

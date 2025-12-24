import { Button, Stack } from 'react-bootstrap'
import { buttonBrandVariants } from './data/buttonData'

const ButtonIconBrands = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonBrandVariants.map(({ variant, iconClass }, index) => (
          <Button key={index} variant={variant} className={`btn-icon btn-${iconClass} rounded`}>
            <i className={`fi ${iconClass}`}></i>
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonBrandVariants.map(({ variant, iconClass }, index) => (
          <Button key={index} variant={variant} className={`btn-icon btn-${iconClass}`}>
            <i className={`fi ${iconClass}`}></i>
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonIconBrands

import { Button, Stack } from 'react-bootstrap'
import { buttonBrandVariants } from './data/buttonData'

const ButtonBrandsWithIcon = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonBrandVariants.map(({ variant, iconClass, text }, index) => (
          <Button key={index} variant={variant} className={`btn-${iconClass} rounded`}>
            <i className={`fi ${iconClass}`}></i>
            <span className="ms-2">{text}</span>
          </Button>
        ))}
      </Stack>
      <hr className="my-4" />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {buttonBrandVariants.map(({ variant, iconClass, text }, index) => (
          <Button key={index} variant={variant} className={`btn-${iconClass}`}>
            <i className={`fi ${iconClass}`}></i>
            <span className="ms-2">{text}</span>
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ButtonBrandsWithIcon

import { CSSProperties } from 'react'
import BgCircleShapefrom from '@/assets/images/general/bg-circle-shape.svg'

const BgCircleShapeStyle: CSSProperties = {
  position: 'relative',
  backgroundImage: `url(${BgCircleShapefrom})`,
  backgroundPosition: 'left top',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
}

export default BgCircleShapeStyle

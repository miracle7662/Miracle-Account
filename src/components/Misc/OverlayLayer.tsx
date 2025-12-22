import { CSSProperties } from 'react'

const OverlayLayerStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(30, 33, 40, 0.2)',
  borderRadius: '0.5rem',
  transition: 'all .3s ease',
}

export default OverlayLayerStyle

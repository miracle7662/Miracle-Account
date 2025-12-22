import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/world.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

import MapBase from './MapBase'

import { mapOptsLine } from './data'

interface MapVectorLineProps {
  width?: string
  height?: string
  options?: any
}

const MapVectorLine = ({ width, height }: MapVectorLineProps) => {
  return (
    <>
      <MapBase type="world" width={width} height={height} options={mapOptsLine} />
    </>
  )
}

export default MapVectorLine

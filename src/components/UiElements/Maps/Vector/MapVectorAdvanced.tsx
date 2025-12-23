import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/world.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

import MapBase from './MapBase'

import { mapOptsAdvanced } from './data'

interface MapVectorAdvancedProps {
  width?: string
  height?: string
  options?: any
}

const MapVectorAdvanced = ({ width, height }: MapVectorAdvancedProps) => {
  return (
    <>
      <MapBase type="world" width={width} height={height} options={mapOptsAdvanced} />
    </>
  )
}

export default MapVectorAdvanced

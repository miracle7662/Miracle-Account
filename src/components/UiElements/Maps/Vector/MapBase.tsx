import { useEffect, useState } from 'react'

interface MapBaseProps {
  width?: string
  height?: string
  options?: any
  type: string
}

const MapBase = ({ width, height, options, type }: MapBaseProps) => {
  const selectorId = type + new Date().getTime()
  const [map, setMap] = useState()

  useEffect(() => {
    if (!map) {
      const map = new (window as any)['jsVectorMap']({
        selector: '#' + selectorId,
        map: type,
        ...options,
      })

      setMap(map)
    }
  }, [selectorId, map, options, type])

  return (
    <>
      <div id={selectorId} style={{ width: width, height: height }}></div>
    </>
  )
}

export default MapBase

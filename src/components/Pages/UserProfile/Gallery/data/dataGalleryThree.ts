const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48]

import gallery1 from '@/assets/images/gallery/1.png'
import gallery2 from '@/assets/images/gallery/2.png'
import gallery3 from '@/assets/images/gallery/3.png'
import gallery4 from '@/assets/images/gallery/4.png'
import gallery5 from '@/assets/images/gallery/5.png'
import gallery6 from '@/assets/images/gallery/6.png'

type Photo = {
  src: string
  width: number
  height: number
  caption?: string
}

const dataGalleryThree = [
  {
    id: 1,
    photo: gallery1,
    width: 600,
    height: 400,
  },
  {
    id: 2,
    photo: gallery2,
    width: 600,
    height: 400,
  },
  {
    id: 1,
    photo: gallery3,
    width: 600,
    height: 400,
  },
  {
    id: 2,
    photo: gallery4,
    width: 600,
    height: 400,
  },
  {
    id: 1,
    photo: gallery5,
    width: 600,
    height: 400,
  },
  {
    id: 2,
    photo: gallery6,
    width: 600,
    height: 400,
  },
]

const newPhotos: Photo[] = dataGalleryThree.map((photo) => {
  const width = breakpoints[0]
  const height = (photo.height / photo.width) * width

  return {
    src: photo.photo,
    width,
    height,
    srcSet: breakpoints.map((breakpoint) => {
      const newHeight = Math.round((photo.height / photo.width) * breakpoint)
      return {
        src: photo.photo,
        width: breakpoint,
        height: newHeight,
      }
    }),
  }
})

export default newPhotos

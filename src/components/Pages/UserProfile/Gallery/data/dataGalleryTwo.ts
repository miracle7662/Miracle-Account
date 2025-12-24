const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48]

import banner1 from '@/assets/images/banner/1.jpg'
import banner2 from '@/assets/images/banner/2.jpg'
import banner3 from '@/assets/images/banner/3.jpg'
import banner4 from '@/assets/images/banner/4.jpg'
import banner5 from '@/assets/images/banner/5.jpg'
import banner6 from '@/assets/images/banner/6.jpg'

type Photo = {
  src: string
  width: number
  height: number
  caption?: string
}

const dataGalleryTwo = [
  {
    id: 1,
    photo: banner1,
    width: 600,
    height: 400,
  },
  {
    id: 2,
    photo: banner2,
    width: 600,
    height: 400,
  },
  {
    id: 1,
    photo: banner3,
    width: 600,
    height: 400,
  },
  {
    id: 2,
    photo: banner4,
    width: 600,
    height: 400,
  },
  {
    id: 1,
    photo: banner5,
    width: 600,
    height: 400,
  },
  {
    id: 2,
    photo: banner6,
    width: 600,
    height: 400,
  },
]

const newPhotos: Photo[] = dataGalleryTwo.map((photo) => {
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

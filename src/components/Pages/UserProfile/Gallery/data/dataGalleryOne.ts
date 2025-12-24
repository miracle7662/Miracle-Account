const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48]

import banner1 from '@/assets/images/banner/big_1.jpg'
import banner2 from '@/assets/images/banner/big_2.jpg'
import banner3 from '@/assets/images/banner/big_3.jpg'
import banner4 from '@/assets/images/banner/big_4.jpg'
import banner5 from '@/assets/images/banner/big_5.jpg'
import banner6 from '@/assets/images/banner/big_6.jpg'

type Photo = {
  src: string
  width: number
  height: number
  caption?: string
}

const dataGalleryOne = [
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

const newPhotos: Photo[] = dataGalleryOne.map((photo) => {
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

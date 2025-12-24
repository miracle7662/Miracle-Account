import { useState } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import carouselItems from './data/carouseData'

const CarouseControlled = () => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {carouselItems.map(({ src, alt, caption, text }, itemIndex) => (
          <Carousel.Item key={itemIndex}>
            <Image src={src} alt={alt} fluid />
            <Carousel.Caption>
              <h3 className="text-light">{caption}</h3>
              <p>{text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default CarouseControlled

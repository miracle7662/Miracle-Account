import { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class ReactSlickMultipleRows extends Component {
  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 2,
      speed: 500,
      rows: 2,
      slidesPerRow: 2,
    }

    const slideItems = Array.from({ length: 24 }, (_, index) => ({
      id: index + 1,
      content: index + 1,
    }))

    return (
      <>
        <Slider {...settings}>
          {slideItems.map(({ id, content }) => (
            <div className="slick-slide-items" key={id}>
              <div className="slick-slide-single">{content}</div>
            </div>
          ))}
        </Slider>
      </>
    )
  }
}

import { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class ReactSlickAutoPlay extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }

    const slideItems = Array.from({ length: 6 }, (_, index) => ({
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

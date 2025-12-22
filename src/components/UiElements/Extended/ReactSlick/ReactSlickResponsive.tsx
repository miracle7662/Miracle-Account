import { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class ReactSlickMultiple extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const slideItems = Array.from({ length: 12 }, (_, index) => ({
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

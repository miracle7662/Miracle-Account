import { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class ReactSlickSingle extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    const slideItems = [
      { id: 1, content: '1' },
      { id: 2, content: '2' },
      { id: 3, content: '3' },
      { id: 4, content: '4' },
      { id: 5, content: '5' },
      { id: 6, content: '6' },
    ]

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

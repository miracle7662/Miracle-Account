import { Row, Col, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// images
import banner3 from '@/assets/images/banner/3.jpg'
import banner4 from '@/assets/images/banner/4.jpg'
import banner5 from '@/assets/images/banner/5.jpg'
import banner6 from '@/assets/images/banner/6.jpg'

const cardData = [
  { id: 'radio-card-example8-1', image: banner3, defaultChecked: true },
  { id: 'radio-card-example8-2', image: banner4 },
  { id: 'radio-card-example8-3', image: banner5 },
  { id: 'radio-card-example8-4', image: banner6 },
]

const AdvRadioEx8 = () => {
  return (
    <Row>
      {cardData.map(({ id, image, defaultChecked }) => (
        <Col lg={3} key={id}>
          <Form.Check.Label htmlFor={id} className="radio-card">
            <Form.Check.Input
              id={id}
              type="radio"
              name="radio-card-example8"
              defaultChecked={defaultChecked}
            />
            <span className="radio-card-wrapper text-center p-0 d-block">
              <Image src={image} alt="" className="img-fluid" />
              <span className="position-absolute top-0 end-0 p-4 z-index-10">
                <span className="check-icon"></span>
              </span>
            </span>
          </Form.Check.Label>
        </Col>
      ))}
    </Row>
  )
}

export default AdvRadioEx8

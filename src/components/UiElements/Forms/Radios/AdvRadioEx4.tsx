import { Row, Col, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// images
import illus1 from '@/assets/images/brands/1.svg'
import illus2 from '@/assets/images/brands/2.svg'
import illus3 from '@/assets/images/brands/3.svg'

const radioCardsData = [
  {
    id: 'radio-card-example4-1',
    image: illus1,
    title: 'Starter',
    price: 'Free',
    description: 'For smaller businesses, with simple salaries and pay schedules subscriptions.',
  },
  {
    id: 'radio-card-example4-2',
    image: illus2,
    title: 'Personal',
    price: '$10',
    priceSuffix: '/Mon',
    description: 'For smaller businesses, with simple salaries and pay schedules subscriptions.',
  },
  {
    id: 'radio-card-example4-3',
    image: illus3,
    title: 'Enterprise',
    price: '$20',
    priceSuffix: '/Mon',
    description: 'For smaller businesses, with simple salaries and pay schedules subscriptions.',
    defaultChecked: true,
  },
]

const AdvRadioEx4 = () => {
  return (
    <Row>
      {radioCardsData.map(
        ({ id, image, title, price, priceSuffix, description, defaultChecked }) => (
          <Col lg={4} key={id}>
            <Form.Check.Label htmlFor={id} className="radio-card">
              <Form.Check.Input
                id={id}
                type="radio"
                name="radio-card-example4"
                defaultChecked={defaultChecked}
              />
              <span className="radio-card-wrapper d-flex gap-4 align-items-start">
                <span style={{ width: '80px', height: '80px' }}>
                  <Image src={image} alt="" className="img-fluid" />
                </span>
                <span className="radio-card-content flex-shrink-1">
                  <span className="radio-card-title d-flex justify-content-between">
                    <span>
                      <span className="fw-bold text-dark">{title} - </span>
                      <span className="radio-card-price fw-semibold text-dark mt-3">
                        {price} <span className="fs-12 fw-normal">{priceSuffix}</span>
                      </span>
                    </span>
                    <span className="check-icon flex-grow-0"></span>
                  </span>
                  <span className="radio-card-desc">{description}</span>
                </span>
              </span>
            </Form.Check.Label>
          </Col>
        ),
      )}
    </Row>
  )
}

export default AdvRadioEx4

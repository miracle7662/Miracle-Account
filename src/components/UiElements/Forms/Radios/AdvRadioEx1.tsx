import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const radioCardsData = [
  {
    id: 'radio-card-example1-1',
    title: 'Basic',
    price: 'Free',
    description: 'Get 1 project with 1 team member.',
    defaultChecked: true,
  },
  {
    id: 'radio-card-example1-2',
    title: 'Premium',
    price: '$12',
    priceSuffix: '/Mon',
    description: 'Get 5 projects with 5 team members.',
  },
  {
    id: 'radio-card-example1-3',
    title: 'Business',
    price: '$30',
    priceSuffix: '/Mon',
    description: 'Get 100 projects with 100 team members.',
  },
]

const AdvRadioEx1 = () => {
  return (
    <Row className="g-3 g-md-4">
      {radioCardsData.map(({ id, title, price, priceSuffix, description, defaultChecked }) => (
        <Col lg={4} key={id}>
          <Form.Check.Label htmlFor={id} className="radio-card">
            <Form.Check.Input
              id={id}
              type="radio"
              name="radio-card-example1"
              defaultChecked={defaultChecked}
            />
            <span className="radio-card-wrapper d-flex gap-3">
              <span className="check-icon"></span>
              <span className="radio-card-content">
                <span className="radio-card-title d-flex justify-content-between">
                  <span className="fw-bold text-dark d-block">{title}</span>
                  <span className="radio-card-price text-dark d-block">
                    {price} <span className="fs-12 fw-normal">{priceSuffix}</span>
                  </span>
                </span>
                <span className="radio-card-desc d-block">{description}</span>
              </span>
            </span>
          </Form.Check.Label>
        </Col>
      ))}
    </Row>
  )
}

export default AdvRadioEx1

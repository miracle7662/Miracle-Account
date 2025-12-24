import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const checkboxData = [
  {
    id: 'check-card-example1-1',
    title: 'Basic',
    price: 'Free',
    desc: 'Get 1 project with 1 team member.',
    defaultChecked: true,
  },
  {
    id: 'check-card-example1-2',
    title: 'Premium',
    price: '$12',
    priceDesc: '/Mon',
    desc: 'Get 5 projects with 5 team members.',
  },
  {
    id: 'check-card-example1-3',
    title: 'Business',
    price: '$30',
    priceDesc: '/Mon',
    desc: 'Get 100 projects with 100 team members.',
  },
]

const AdvCheckboxEx1 = () => {
  return (
    <Row>
      {checkboxData.map(({ id, title, price, priceDesc, desc, defaultChecked }) => (
        <Col lg={4} key={id}>
          <Form.Check.Label htmlFor={id} className="check-card">
            <Form.Check.Input
              id={id}
              type="checkbox"
              name="check-card-example1"
              defaultChecked={defaultChecked}
            />
            <span className="check-card-wrapper d-flex gap-3">
              <span className="check-icon"></span>
              <span className="check-card-content">
                <span className="check-card-title d-flex justify-content-between">
                  <span className="fw-bold text-dark d-block">{title}</span>
                  <span className="check-card-price text-dark d-block">
                    {price} <span className="fs-12 fw-normal">{priceDesc}</span>
                  </span>
                </span>
                <span className="check-card-desc d-block">{desc}</span>
              </span>
            </span>
          </Form.Check.Label>
        </Col>
      ))}
    </Row>
  )
}

export default AdvCheckboxEx1

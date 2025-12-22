import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const checkboxData = [
  {
    id: 'check-card-example2-1',
    title: 'Standard',
    desc: '4-10 business days',
    price: '$10 USD',
  },
  {
    id: 'check-card-example2-2',
    title: 'Express',
    desc: '3-6 business days',
    price: '$15 USD',
    defaultChecked: true,
  },
  {
    id: 'check-card-example2-3',
    title: 'Quickly',
    desc: '2-4 business days',
    price: '$20 USD',
  },
  {
    id: 'check-card-example2-4',
    title: 'Superfast',
    desc: '1-2 business days',
    price: '$25 USD',
  },
]

const AdvCheckboxEx2 = () => {
  return (
    <Row>
      {checkboxData.map(({ id, title, desc, price, defaultChecked }) => (
        <Col lg={3} key={id}>
          <Form.Check.Label htmlFor={id} className="check-card">
            <Form.Check.Input
              id={id}
              type="checkbox"
              name="check-card-example2"
              defaultChecked={defaultChecked}
            />
            <span className="check-card-wrapper d-flex gap-3">
              <span className="check-card-content">
                <span className="check-card-title fw-bold text-dark d-block">{title}</span>
                <span className="check-card-desc d-block">{desc}</span>
                <span className="check-card-price fw-semibold text-dark mt-3 d-block">{price}</span>
              </span>
              <span className="check-icon"></span>
            </span>
          </Form.Check.Label>
        </Col>
      ))}
    </Row>
  )
}

export default AdvCheckboxEx2

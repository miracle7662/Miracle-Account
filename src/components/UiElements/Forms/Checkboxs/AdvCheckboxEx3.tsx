import { Row, Col, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// images
import paypal from '@/assets/images/brands/paypal.svg'
import mastercard from '@/assets/images/brands/mastercard.svg'
import bank from '@/assets/images/brands/bank.svg'

const checkboxData = [
  {
    id: 'check-card-example3-1',
    image: paypal,
    title: 'Paypal',
    percentage: '2.5%',
  },
  {
    id: 'check-card-example3-2',
    image: mastercard,
    title: 'Mastercard',
    percentage: '2.0%',
    defaultChecked: true,
  },
  {
    id: 'check-card-example3-3',
    image: bank,
    title: 'BankTransfer',
    percentage: '5%',
  },
]

const AdvCheckboxEx3 = () => {
  return (
    <Row>
      {checkboxData.map(({ id, image, title, percentage, defaultChecked }) => (
        <Col lg={4} key={id}>
          <Form.Check.Label htmlFor={id} className="check-card">
            <Form.Check.Input
              id={id}
              type="checkbox"
              name="check-card-example3"
              defaultChecked={defaultChecked}
            />
            <span className="check-card-wrapper d-flex gap-4 align-items-center">
              <span style={{ width: '48px', height: '48px' }}>
                <Image src={image} alt={title} className="img-fluid" />
              </span>
              <span className="check-card-content">
                <span className="check-card-title d-flex justify-content-between">
                  <span>
                    <span className="fw-bold text-dark">{title} - </span>
                    <span className="check-card-price fw-semibold text-dark mt-3">
                      {percentage}
                    </span>
                  </span>
                  <span className="check-icon"></span>
                </span>
                <span className="check-card-desc">
                  Last time used: <strong>26 March, 2023</strong>
                </span>
              </span>
            </span>
          </Form.Check.Label>
        </Col>
      ))}
    </Row>
  )
}

export default AdvCheckboxEx3

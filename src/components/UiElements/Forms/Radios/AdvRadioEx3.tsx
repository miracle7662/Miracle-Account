import { Row, Col, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// images
import paypal from '@/assets/images/brands/paypal.svg'
import mastercard from '@/assets/images/brands/mastercard.svg'
import bank from '@/assets/images/brands/bank.svg'

const paymentMethods = [
  {
    id: 'radio-card-example3-1',
    image: paypal,
    title: 'Paypal',
    fee: '2.5%',
  },
  {
    id: 'radio-card-example3-2',
    image: mastercard,
    title: 'Mastercard',
    fee: '2.0%',
    defaultChecked: true,
  },
  {
    id: 'radio-card-example3-3',
    image: bank,
    title: 'BankTransfer',
    fee: '5%',
  },
]

const AdvRadioEx3 = () => {
  return (
    <Row>
      {paymentMethods.map(({ id, image, title, fee, defaultChecked }) => (
        <Col lg={4} key={id}>
          <Form.Check.Label htmlFor={id} className="radio-card">
            <Form.Check.Input
              id={id}
              type="radio"
              name="radio-card-example3"
              defaultChecked={defaultChecked}
            />
            <span className="radio-card-wrapper d-flex gap-4 align-items-center">
              <span style={{ width: '48px', height: '48px' }}>
                <Image src={image} alt={title} className="img-fluid" />
              </span>
              <span className="radio-card-content">
                <span className="radio-card-title d-flex justify-content-between">
                  <span>
                    <span className="fw-bold text-dark">{title} - </span>
                    <span className="radio-card-price fw-semibold text-dark mt-3">{fee}</span>
                  </span>
                  <span className="check-icon"></span>
                </span>
                <span className="radio-card-desc">
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

export default AdvRadioEx3

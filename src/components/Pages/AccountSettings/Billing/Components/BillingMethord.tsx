import { Link } from 'react-router-dom'
import { Row, Col, Button, ListGroup, Stack, Image, Badge } from 'react-bootstrap'

import mastercard from '@/assets/images/brands/mastercard.svg'
import visa from '@/assets/images/brands/visa.svg'
import paypal from '@/assets/images/brands/paypal.svg'
import bank from '@/assets/images/brands/bank.svg'

const paymentMethods = [
  {
    image: mastercard,
    name: 'Mastercard',
    number: '- 9632',
    expireDate: '03/2026',
    ifDefault: true,
  },
  { image: visa, name: 'Visa', number: '- 2587', expireDate: '06/2025', ifDefault: false },
  {
    image: paypal,
    name: 'Paypal',
    number: ' - 2.5%',
    lastUsed: '26 March, 2023',
    ifDefault: false,
  },
  {
    image: bank,
    name: 'BankTransfer',
    number: ' - 5%',
    lastUsed: '26 March, 2023',
    ifDefault: false,
  },
  {
    image: mastercard,
    name: 'Mastercard',
    number: '- 8796',
    expireDate: '02/2023',
    ifDefault: false,
  },
]

const BillingMethod = () => {
  const renderPaymentMethods = () => {
    return paymentMethods.map(({ name, image, number, expireDate, lastUsed, ifDefault }, index) => (
      <ListGroup.Item
        key={index}
        className="d-sm-flex align-items-center justify-content-between gap-4"
      >
        <div className="d-sm-flex align-items-center gap-4">
          <div className="mb-3 mb-sm-0" style={{ width: '2rem', height: '2rem' }}>
            <Image src={image} alt={name} className="img-fluid" />
          </div>
          <div className="radio-card-content">
            <h6 className="fw-semibold mb-1">
              {name} ending in {number}
            </h6>
            {expireDate && (
              <span className="text-muted">
                Expire date: <span className="fw-medium">{expireDate}</span>
              </span>
            )}
            {lastUsed && (
              <span className="text-muted">
                Last time used: <span className="fw-medium">{lastUsed}</span>
              </span>
            )}
          </div>
        </div>
        <Stack direction="horizontal" className="gap-4 mt-3 mt-sm-0">
          {ifDefault && <Badge bg="success">Default</Badge>}
          {!ifDefault && (
            <Link to="#!" className="text-primary">
              Set as default
            </Link>
          )}
          <Link to="#!">
            <i className="fi fi-rr-trash text-danger"></i>
          </Link>
        </Stack>
      </ListGroup.Item>
    ))
  }

  return (
    <Row className="g-4 mb-4">
      <Col md={3}>
        <h5 className="fw-semibold">Payment Method</h5>
        <p>You can update your cards information here</p>
      </Col>
      <Col md={9} xl={8} xxl={6}>
        <ListGroup className="mb-3">{renderPaymentMethods()}</ListGroup>
        <Button variant="neutral">
          <i className="fi fi-rr-plus"></i>
          <span className="ms-3">New payment method</span>
        </Button>
      </Col>
    </Row>
  )
}

export default BillingMethod

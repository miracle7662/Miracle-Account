import { Row, Col, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// images
import illus1 from '@/assets/images/brands/1.svg'
import illus2 from '@/assets/images/brands/2.svg'
import illus3 from '@/assets/images/brands/3.svg'

const checkboxData = [
  {
    id: 'check-card-example4-1',
    image: illus1,
    title: 'Starter',
    price: 'Free',
  },
  {
    id: 'check-card-example4-2',
    image: illus2,
    title: 'Personal',
    price: '$10 /Mon',
  },
  {
    id: 'check-card-example4-3',
    image: illus3,
    title: 'Enterprise',
    price: '$20 /Mon',
    defaultChecked: true,
  },
]

const AdvCheckboxEx4 = () => {
  return (
    <Row>
      {checkboxData.map(({ id, image, title, price, defaultChecked }) => (
        <Col lg={4} key={id}>
          <Form.Check.Label htmlFor={id} className="check-card">
            <Form.Check.Input
              id={id}
              type="checkbox"
              name="check-card-example4"
              defaultChecked={defaultChecked}
            />
            <span className="check-card-wrapper d-flex gap-4 align-items-start">
              <span style={{ width: '80px', height: '80px' }}>
                <Image src={image} alt="" className="img-fluid" />
              </span>
              <span className="check-card-content flex-shrink-1">
                <span className="check-card-title d-flex justify-content-between">
                  <span>
                    <span className="fw-bold text-dark">{title} - </span>
                    <span className="check-card-price fw-semibold text-dark mt-3">{price}</span>
                  </span>
                  <span className="check-icon flex-grow-0"></span>
                </span>
                <span className="check-card-desc">
                  For smaller business, with simple salaries and pay schedules subscriptions.
                </span>
              </span>
            </span>
          </Form.Check.Label>
        </Col>
      ))}
    </Row>
  )
}

export default AdvCheckboxEx4

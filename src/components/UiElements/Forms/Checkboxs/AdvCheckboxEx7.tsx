import { Row, Col, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// images
import banner1 from '@/assets/images/banner/1.jpg'
import banner2 from '@/assets/images/banner/2.jpg'
import banner3 from '@/assets/images/banner/3.jpg'

const checkboxData = [
  {
    id: 'check-card-example7-1',
    name: 'check-card-example7',
    imageSrc: banner1,
    title: 'Starter',
    description: 'For smaller business, with simple salaries and pay schedules subscriptions.',
    price: 'Free',
  },
  {
    id: 'check-card-example7-2',
    name: 'check-card-example7',
    imageSrc: banner2,
    title: 'Premium',
    description: 'For smaller business, with simple salaries and pay schedules subscriptions.',
    price: '$5 /Mon',
    popular: true,
    defaultChecked: true,
  },
  {
    id: 'check-card-example7-3',
    name: 'check-card-example7',
    imageSrc: banner3,
    title: 'Business',
    description: 'For smaller business, with simple salaries and pay schedules subscriptions.',
    price: '$15 /Mon',
  },
]

const AdvCheckboxEx7 = () => {
  return (
    <Row>
      {checkboxData.map(
        ({ id, name, imageSrc, title, description, price, popular, defaultChecked }) => (
          <Col lg={4} key={id}>
            <Form.Check.Label htmlFor={id} className="check-card">
              <Form.Check.Input
                id={id}
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
              />
              <span className="check-card-wrapper text-center d-block p-0 pb-4">
                <Image src={imageSrc} alt={title} className="img-fluid" />
                <span className="check-card-content my-4 px-4 d-block">
                  <span className="check-card-title d-block">
                    {title}{' '}
                    {popular && <span className="badge bg-danger-subtle text-danger">Popular</span>}
                  </span>
                  <span className="check-card-desc d-block">{description}</span>
                  <span className="check-card-price fw-semibold text-dark mt-3 d-block">
                    {price}
                  </span>
                </span>
                <span className="check-icon"></span>
              </span>
            </Form.Check.Label>
          </Col>
        ),
      )}
    </Row>
  )
}

export default AdvCheckboxEx7

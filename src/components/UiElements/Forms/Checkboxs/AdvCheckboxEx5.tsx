import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const checkboxData = [
  {
    id: 'check-card-example5-1',
    iconClass: 'fi fi-rr-layers',
    title: 'Starter',
    desc: 'For smaller business, with simple salaries and pay schedules subscriptions.',
    price: 'Free',
  },
  {
    id: 'check-card-example5-2',
    iconClass: 'fi fi-rr-life-ring',
    title: 'Premium',
    desc: 'For smaller business, with simple salaries and pay schedules subscriptions.',
    price: '$5 /Mon',
  },
  {
    id: 'check-card-example5-3',
    iconClass: 'fi fi-rr-globe',
    title: 'Business',
    desc: 'For smaller business, with simple salaries and pay schedules subscriptions.',
    price: '$15 /Mon',
    defaultChecked: true,
    popular: true,
  },
  {
    id: 'check-card-example5-4',
    iconClass: 'fi fi-rr-brightness',
    title: 'Enterprise',
    desc: 'For smaller business, with simple salaries and pay schedules subscriptions.',
    price: '$30 /Mon',
  },
]

const AdvCheckboxEx5 = () => {
  return (
    <Row>
      {checkboxData.map(({ id, iconClass, title, desc, price, defaultChecked, popular }) => (
        <Col lg={3} key={id}>
          <Form.Check.Label htmlFor={id} className="check-card">
            <Form.Check.Input
              id={id}
              type="checkbox"
              name="check-card-example5"
              defaultChecked={defaultChecked}
            />
            <span className="check-card-wrapper text-center d-block">
              <div className="avatar avatar-xl">
                <i className={`fi ${iconClass} text-dark`}></i>
              </div>
              <span className="check-card-content my-4 d-block">
                <span className="check-card-title fw-bold text-dark d-block">{title}</span>
                <span className="check-card-desc d-block">{desc}</span>
                <span className="check-card-price fw-semibold text-dark mt-3 d-block">
                  {price}{' '}
                  {popular && <span className="badge bg-success-subtle text-success">Popular</span>}
                </span>
              </span>
              <span className="check-icon"></span>
            </span>
          </Form.Check.Label>
        </Col>
      ))}
    </Row>
  )
}

export default AdvCheckboxEx5

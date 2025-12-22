import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const radioCardsData = [
  {
    id: 'radio-card-example5-1',
    icon: 'fi fi-rr-layers',
    title: 'Starter',
    description: 'For smaller businesses, with simple salaries and pay schedules subscriptions.',
    price: 'Free',
    defaultChecked: true,
  },
  {
    id: 'radio-card-example5-2',
    icon: 'fi fi-rr-life-ring',
    title: 'Premium',
    description: 'For smaller businesses, with simple salaries and pay schedules subscriptions.',
    price: '$5',
    priceSuffix: '/Mon',
  },
  {
    id: 'radio-card-example5-3',
    icon: 'fi fi-rr-globe',
    title: 'Business',
    description: 'For smaller businesses, with simple salaries and pay schedules subscriptions.',
    price: '$15',
    priceSuffix: '/Mon',
    badge: 'Popular',
  },
  {
    id: 'radio-card-example5-4',
    icon: 'fi fi-rr-brightness',
    title: 'Enterprise',
    description: 'For smaller businesses, with simple salaries and pay schedules subscriptions.',
    price: '$30',
    priceSuffix: '/Mon',
  },
]

const AdvRadioEx5 = () => {
  return (
    <Row>
      {radioCardsData.map(
        ({ id, icon, title, description, price, priceSuffix, badge, defaultChecked }) => (
          <Col lg={3} key={id}>
            <Form.Check.Label htmlFor={id} className="radio-card">
              <Form.Check.Input
                id={id}
                type="radio"
                name="radio-card-example5"
                defaultChecked={defaultChecked}
              />
              <span className="radio-card-wrapper text-center d-block">
                <div className="avatar avatar-xl">
                  <i className={icon + ' text-dark'}></i>
                </div>
                <span className="radio-card-content my-4 d-block">
                  <span className="radio-card-title fw-bold text-dark d-block">
                    {title}
                    {badge && <span className="badge bg-success-subtle text-success">{badge}</span>}
                  </span>
                  <span className="radio-card-desc d-block">{description}</span>
                  <span className="radio-card-price fw-semibold text-dark mt-3 d-block">
                    {price} <span className="fs-12 fw-normal">{priceSuffix}</span>
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

export default AdvRadioEx5

import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const contactCards = [
  {
    iconClass: 'fi fi-rr-comment-alt',
    title: 'Chat to sales',
    description: 'Speaks to our friendly teams.',
    link: 'support@wrapcoders.com',
    col: 'col-12 col-md-6 col-lg-4',
  },
  {
    iconClass: 'fi fi-rr-map',
    title: 'Visit our store',
    description: 'Visit our office HQ.',
    link: 'Smith Street, California, USA',
    col: 'col-12 col-md-6 col-lg-4',
  },
  {
    iconClass: 'fi fi-rr-phone-call',
    title: 'Call now us',
    description: 'Mon-Fri from 10am to 6pm.',
    link: '+1(375)-98745-632',
    col: 'col-12 col-md-12 col-lg-4',
  },
]

const ContactCard = () => {
  return (
    <>
      <Row className="g-3 g-md-4">
        {contactCards.map(({ col, iconClass, title, description, link }, index) => (
          <Col key={index} className={col}>
            <Card>
              <Card.Body className="text-center">
                <i className={`${iconClass} fs-32 text-primary`}></i>
                <div className="my-4">
                  <h5>{title}</h5>
                  <p>{description}</p>
                </div>
                <Link to="#!">{link}</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ContactCard

import { Button, Card, Col, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const links = [
  { to: '/other-pages/about-us', text: 'About' },
  { to: '/other-pages/contact-us', text: 'Contact' },
  { to: '/other-pages/pricing', text: 'Pricing' },
  { to: '/other-pages/privacy-policy', text: 'Privacy' },
  { to: '/other-pages/terms-services', text: 'Terms' },
]

const socialMediaIcons = [
  { iconClass: 'fi fi-brands-facebook' },
  { iconClass: 'fi fi-brands-twitter' },
  { iconClass: 'fi fi-brands-instagram' },
  { iconClass: 'fi fi-brands-linkedin' },
  { iconClass: 'fi fi-brands-twitter-alt' },
]

const CommonFooter = () => {
  return (
    <>
      <Card.Footer className="px-4 px-6 py-12 py-lg-16">
        <div
          className="mb-6 mx-auto mx-md-0 text-center text-md-start"
          style={{ maxWidth: '425px' }}>
          <div
            className="mx-auto mx-md-0 border border-2 border-primary rounded-pill mb-4"
            style={{ width: '3rem' }}></div>
          <h6 className="fw-bold">WRAPCODERS INC.</h6>
          <p className="fw-light mb-4">
            We're here to bring financial stability, improve the economy. Leave money issue with us
            and focus on your business & make something awesome.
          </p>
        </div>
        <Row className="g-4 align-items-center">
          <Col md={8} lg={6}>
            <Stack
              gap={4}
              direction="horizontal"
              className="flex-wrap justify-content-center justify-content-md-start">
              {links.map(({ to, text }, idx) => (
                <Link key={idx} to={to}>
                  {text}
                </Link>
              ))}
            </Stack>
          </Col>
          <Col md={4} lg={6}>
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center justify-content-md-end">
              {socialMediaIcons.map(({ iconClass }, idx) => (
                <Button key={idx} variant="" className="btn-icon">
                  <i className={iconClass}></i>
                </Button>
              ))}
            </Stack>
          </Col>
        </Row>
      </Card.Footer>
    </>
  )
}

export default CommonFooter

import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Image, Stack, Button } from 'react-bootstrap'
import workingOfficeTogather from '@/assets/images/general/working-office-togather.jpg'
import OverlayLayerStyle from '@/components/Misc/OverlayLayer'

const AboutCompany = () => {
  const navigate = useNavigate()
  return (
    <>
      <Row className="g-6 align-items-center">
        <Col xl={6}>
          <p className="fs-12 fw-semibold text-primary mb-4 text-uppercase">WHO WE ARE</p>
          <div className="fw-bold text-dark display-5 lh-base mb-6">
            About our company <br />
            <div className="px-2 d-inline-block border border-2 border-primary position-relative">
              <span className="text-primary">wrapdocers</span>
              <span
                className="d-block bg-primary position-absolute"
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  left: '-0.3rem',
                  top: '-0.3rem',
                }}
              ></span>
              <span
                className="d-block bg-primary position-absolute"
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  left: '-0.3rem',
                  bottom: '-0.3rem',
                }}
              ></span>
              <span
                className="d-block bg-primary position-absolute"
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  right: '-0.3rem',
                  top: '-0.3rem',
                }}
              ></span>
              <span
                className="d-block bg-primary position-absolute"
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  right: '-0.3rem',
                  bottom: '-0.3rem',
                }}
              ></span>
            </div>{' '}
            sky high.
          </div>
          <p className="fs-20 lead mb-4">
            We're here to bring financial stability, improve the economy. Leave money issue with us
            and focus on your business & make something awesome.
          </p>
          <Stack direction="horizontal" gap={1}>
            <Button
              variant="primary"
              onClick={() => {
                navigate('/other-pages/pricing')
              }}
            >
              Pricing Plan
            </Button>
            <Link
              to="/other-pages/contact-us"
              className="btn btn-light bg-secondary-subtle border border-secondary border-opacity-10"
            >
              Contact Us
            </Link>
          </Stack>
        </Col>
        <Col xl={6} className="p-0 rounded position-relative">
          <Image
            src={workingOfficeTogather}
            alt="Image"
            className="img-fluid img-thumbnail rounded-3"
          />
          <div style={OverlayLayerStyle}>
            <Button
              variant=""
              className="bg-light text-dark border border-6 border-secondary-subtle hstack rounded-circle position-absolute top-50 start-50 translate-middle"
              style={{ width: '5rem', height: '5rem' }}
            >
              <i className="fi fi-rr-play fs-24"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AboutCompany

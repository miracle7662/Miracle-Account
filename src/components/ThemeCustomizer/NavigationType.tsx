import { Col, Form, Row } from 'react-bootstrap'
import { ThemeSettings } from '@/common/context'

type NavigationTypeProps = {
  handleChangeNavigationType: (value: string) => void
  navigationType: string
  navtypeConstants: typeof ThemeSettings.layout.type
}
const NavigationType = ({
  handleChangeNavigationType,
  navtypeConstants,
  navigationType,
}: NavigationTypeProps) => {
  return (
    <>
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}
      >
        Navigation Type
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="layoutVertical" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-type"
              id="layoutVertical"
              value={navtypeConstants.vertical}
              onChange={(e) => handleChangeNavigationType(e.target.value)}
              checked={navigationType === navtypeConstants.vertical}
            />
            <span className="radio-card-wrapper d-flex p-0 mb-2 position-relative">
              <span className="w-100 d-flex overflow-hidden" style={{ height: '7rem' }}>
                <span
                  className="bg-body-secondary border-end border-secondary border-opacity-10 rounded-start"
                  style={{ width: '2.5rem' }}
                >
                  <span className="d-block mt-2 mx-1">
                    <span
                      className="d-block w-100 mb-3 rounded bg-secondary bg-opacity-25"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-25"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-25"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-25"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-25"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-25"
                      style={{ height: '0.3rem' }}
                    ></span>
                  </span>
                </span>
                <span
                  className="w-100 bg-body-secondary border-bottom border-secondary border-opacity-10 rounded-top"
                  style={{ height: '1.2rem' }}
                >
                  <span className="h-100 hstack gap-1 justify-content-end me-2">
                    <span
                      className="d-block rounded-circle bg-secondary bg-opacity-25"
                      style={{ width: '0.3rem', height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block rounded-circle bg-secondary bg-opacity-25"
                      style={{ width: '0.3rem', height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block rounded-circle bg-secondary bg-opacity-25"
                      style={{ width: '0.3rem', height: '0.3rem' }}
                    ></span>
                  </span>
                </span>
              </span>
              <span className="check-icon m-2 end-0 bottom-0 position-absolute z-1"></span>
            </span>
            <span
              className="fs-11 fw-semibold text-muted text-uppercase d-block"
              style={{ letterSpacing: '0.5px' }}
            >
              Vertical
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="layoutHorizontal" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-type"
              id="layoutHorizontal"
              value={navtypeConstants.horizontal}
              onChange={(e) => handleChangeNavigationType(e.target.value)}
              checked={navigationType === navtypeConstants.horizontal}
            />
            <span className="radio-card-wrapper d-flex p-0 mb-2 position-relative">
              <span className="w-100 overflow-hidden" style={{ height: '7rem' }}>
                <span
                  className="hstack gap-1 bg-body-secondary border-bottom border-secondary border-opacity-10 rounded-top"
                  style={{ height: '1.2rem' }}
                >
                  <span
                    className="d-block rounded-pill bg-secondary bg-opacity-25 ms-1"
                    style={{ width: '1rem', height: '0.3rem' }}
                  ></span>
                  <span
                    className="d-block rounded-circle bg-secondary bg-opacity-25 ms-auto"
                    style={{ width: '0.3rem', height: '0.3rem' }}
                  ></span>
                  <span
                    className="d-block rounded-circle bg-secondary bg-opacity-25"
                    style={{ width: '0.3rem', height: '0.3rem' }}
                  ></span>
                  <span
                    className="d-block rounded-circle bg-secondary bg-opacity-25 me-1"
                    style={{ width: '0.3rem', height: '0.3rem' }}
                  ></span>
                </span>
                <span
                  className="hstack gap-1 bg-body-secondary border-bottom border-secondary border-opacity-10"
                  style={{ height: '1.2rem' }}
                >
                  <span
                    className="d-block w-100 rounded bg-secondary bg-opacity-25 ms-1"
                    style={{ height: '0.3rem' }}
                  ></span>
                  <span
                    className="d-block w-100 rounded bg-secondary bg-opacity-25"
                    style={{ height: '0.3rem' }}
                  ></span>
                  <span
                    className="d-block w-100 rounded bg-secondary bg-opacity-25"
                    style={{ height: '0.3rem' }}
                  ></span>
                  <span
                    className="d-block w-100 rounded bg-secondary bg-opacity-25"
                    style={{ height: '0.3rem' }}
                  ></span>
                  <span
                    className="d-block w-100 rounded bg-secondary bg-opacity-25 me-16"
                    style={{ height: '0.3rem' }}
                  ></span>
                </span>
              </span>
              <span className="check-icon m-2 end-0 bottom-0 position-absolute z-1"></span>
            </span>
            <span
              className="fs-11 fw-semibold text-muted text-uppercase d-block"
              style={{ letterSpacing: '0.5px' }}
            >
              Horizontal
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </>
  )
}

export default NavigationType

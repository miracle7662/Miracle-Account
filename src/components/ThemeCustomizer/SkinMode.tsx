import { Col, Form, Row } from 'react-bootstrap'
import { ThemeSettings } from '@/common/context'

type SkinModeProps = {
  handleChangeSkinMode: (value: any) => void
  skinMode?: string
  skinmodeConstants: typeof ThemeSettings.theme
}
const SkinMode = ({ handleChangeSkinMode, skinMode, skinmodeConstants }: SkinModeProps) => {
  return (
    <>
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}
      >
        Skin Mode
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="themeLight" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-bs-theme"
              id="themeLight"
              value={skinmodeConstants.light}
              onChange={(e) => handleChangeSkinMode(e.target.value)}
              checked={skinMode === skinmodeConstants.light}
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
              Light
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="themeDark" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-bs-theme"
              id="themeDark"
              value={skinmodeConstants.dark}
              onChange={(e) => handleChangeSkinMode(e.target.value)}
              checked={skinMode === skinmodeConstants.dark}
            />
            <span className="radio-card-wrapper d-flex p-0 mb-2 position-relative">
              <span className="w-100 d-flex overflow-hidden" style={{ height: '7rem' }}>
                <span
                  className="bg-black border-end border-secondary border-opacity-50 rounded-start"
                  style={{ width: '2.5rem' }}
                >
                  <span className="d-block mt-2 mx-1">
                    <span
                      className="d-block w-100 mb-3 rounded bg-secondary bg-opacity-50"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-50"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-50"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-50"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-50"
                      style={{ height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block w-100 mb-1 rounded bg-secondary bg-opacity-50"
                      style={{ height: '0.3rem' }}
                    ></span>
                  </span>
                </span>
                <span
                  className="w-100 bg-black border-bottom border-secondary border-opacity-10"
                  style={{ height: '1.2rem', borderRadius: '0 5px 0 0' }}
                >
                  <span className="h-100 hstack gap-1 justify-content-end me-2">
                    <span
                      className="d-block rounded-circle bg-secondary bg-opacity-50"
                      style={{ width: '0.3rem', height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block rounded-circle bg-secondary bg-opacity-50"
                      style={{ width: '0.3rem', height: '0.3rem' }}
                    ></span>
                    <span
                      className="d-block rounded-circle bg-secondary bg-opacity-50"
                      style={{ width: '0.3rem', height: '0.3rem' }}
                    ></span>
                  </span>
                  <span
                    className="hstack bg-black border border-secondary border-opacity-10 rounded m-1"
                    style={{ height: '5.4rem' }}
                  ></span>
                </span>
              </span>
              <span className="check-icon m-2 end-0 bottom-0 position-absolute z-1 border-black"></span>
            </span>
            <span
              className="fs-11 fw-semibold text-muted text-uppercase d-block"
              style={{ letterSpacing: '0.5px' }}
            >
              Dark
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </>
  )
}

export default SkinMode

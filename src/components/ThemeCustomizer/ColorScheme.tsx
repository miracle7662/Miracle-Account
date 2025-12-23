import { Col, Form, Row } from 'react-bootstrap'
import { ThemeSettings } from '@/common/context'

type ColorScheme = {
  handleChangeColorScheme: (value: any) => void
  colorScheme?: string
  schemeConstants: typeof ThemeSettings.color
}

const ColorScheme = ({ handleChangeColorScheme, colorScheme, schemeConstants }: ColorScheme) => {
  return (
    <>
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}
      >
        Color Scheme
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="colorSchemePrimary" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-color-scheme"
              id="colorSchemePrimary"
              value={schemeConstants.primary}
              onChange={(e) => handleChangeColorScheme(e.target.value)}
              checked={colorScheme === schemeConstants.primary}
            />
            <span className="radio-card-wrapper d-flex p-0 position-relative">
              <span className="w-100 d-flex" style={{ padding: '2px' }}>
                <span
                  className="rounded-start"
                  style={{
                    width: '33.333%',
                    height: '2.5rem',
                    backgroundColor: '#3E97FF',
                  }}
                ></span>
                <span
                  style={{
                    width: '33.333%',
                    height: '2.5rem',
                    backgroundColor: '#3e97ff',
                    opacity: '0.75',
                  }}
                ></span>
                <span
                  style={{
                    width: '33.333%',
                    height: '2.5rem',
                    backgroundColor: '#3E97FF',
                    opacity: '0.50',
                  }}
                ></span>
                <span
                  className="rounded-end"
                  style={{
                    width: '33.333%',
                    height: '2.5rem',
                    backgroundColor: '#3E97FF',
                    opacity: '0.25',
                  }}
                ></span>
              </span>
              <span
                className="fs-11 fw-semibold text-white text-uppercase d-block position-absolute top-50 translate-middle-y position-absolute z-1 ms-3"
                style={{ letterSpacing: '0.5px' }}
              >
                Primary
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="colorSchemeSuccess" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-color-scheme"
              id="colorSchemeSuccess"
              value={schemeConstants.success}
              onChange={(e) => handleChangeColorScheme(e.target.value)}
              checked={colorScheme === schemeConstants.success}
            />
            <span className="radio-card-wrapper d-flex p-0 position-relative">
              <span className="w-100 d-flex" style={{ padding: '2px' }}>
                <span
                  className="bg-success rounded-start"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-success bg-opacity-75"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-success bg-opacity-50"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-success bg-opacity-25 rounded-end"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
              </span>
              <span
                className="fs-11 fw-semibold text-white text-uppercase d-block position-absolute top-50 translate-middle-y position-absolute z-1 ms-3"
                style={{ letterSpacing: '0.5px' }}
              >
                Success
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="colorSchemeWarning" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-color-scheme"
              id="colorSchemeWarning"
              value={schemeConstants.warning}
              onChange={(e) => handleChangeColorScheme(e.target.value)}
              checked={colorScheme === schemeConstants.warning}
            />
            <span className="radio-card-wrapper d-flex p-0 position-relative">
              <span className="w-100 d-flex" style={{ padding: '2px' }}>
                <span
                  className="bg-warning rounded-start"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-warning bg-opacity-75"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-warning bg-opacity-50"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-warning bg-opacity-25 rounded-end"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
              </span>
              <span
                className="fs-11 fw-semibold text-white text-uppercase d-block position-absolute top-50 translate-middle-y position-absolute z-1 ms-3"
                style={{ letterSpacing: '0.5px' }}
              >
                Warning
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="colorSchemeInfo" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-color-scheme"
              id="colorSchemeInfo"
              value={schemeConstants.info}
              onChange={(e) => handleChangeColorScheme(e.target.value)}
              checked={colorScheme === schemeConstants.info}
            />
            <span className="radio-card-wrapper d-flex p-0 position-relative">
              <span className="w-100 d-flex" style={{ padding: '2px' }}>
                <span
                  className="bg-info rounded-start"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-info bg-opacity-75"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-info bg-opacity-50"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-info bg-opacity-25 rounded-end"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
              </span>
              <span
                className="fs-11 fw-semibold text-white text-uppercase d-block position-absolute top-50 translate-middle-y position-absolute z-1 ms-3"
                style={{ letterSpacing: '0.5px' }}
              >
                Info
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="colorSchemeDanger" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-color-scheme"
              id="colorSchemeDanger"
              value={schemeConstants.danger}
              onChange={(e) => handleChangeColorScheme(e.target.value)}
              checked={colorScheme === schemeConstants.danger}
            />
            <span className="radio-card-wrapper d-flex p-0 position-relative">
              <span className="w-100 d-flex" style={{ padding: '2px' }}>
                <span
                  className="bg-danger rounded-start"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-danger bg-opacity-75"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-danger bg-opacity-50"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-danger bg-opacity-25 rounded-end"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
              </span>
              <span
                className="fs-11 fw-semibold text-white text-uppercase d-block position-absolute top-50 translate-middle-y position-absolute z-1 ms-3"
                style={{ letterSpacing: '0.5px' }}
              >
                Danger
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="colorSchemeSecondary" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-color-scheme"
              id="colorSchemeSecondary"
              value={schemeConstants.secondary}
              onChange={(e) => handleChangeColorScheme(e.target.value)}
              checked={colorScheme === schemeConstants.secondary}
            />
            <span className="radio-card-wrapper d-flex p-0 position-relative">
              <span className="w-100 d-flex" style={{ padding: '2px' }}>
                <span
                  className="bg-secondary rounded-start"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-secondary bg-opacity-75"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-secondary bg-opacity-50"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
                <span
                  className="bg-secondary bg-opacity-25 rounded-end"
                  style={{ width: '33.333%', height: '2.5rem' }}
                ></span>
              </span>
              <span
                className="fs-11 fw-semibold text-white text-uppercase d-block position-absolute top-50 translate-middle-y position-absolute z-1 ms-3"
                style={{ letterSpacing: '0.5px' }}
              >
                Secondary
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </>
  )
}

export default ColorScheme

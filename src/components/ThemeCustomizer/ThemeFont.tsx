import { ThemeSettings } from '@/common/context'
import { Col, Form, Row } from 'react-bootstrap'

interface ThemeFontProps {
  handleChangeThemeFont: (value: any) => void
  themeFont?: string
  fontConstants: typeof ThemeSettings.font
}
const ThemeFont = ({ handleChangeThemeFont, themeFont, fontConstants }: ThemeFontProps) => {
  return (
    <div id="layout-width">
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}
      >
        Theme Font
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="themePublic" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-layout-font"
              id="themePublic"
              value={fontConstants.public}
              onChange={(e) => handleChangeThemeFont(e.target.value)}
              checked={themeFont === fontConstants.public}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Public Sans
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="themeInter" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-layout-font"
              id="themeInter"
              value={fontConstants.inter}
              onChange={(e) => handleChangeThemeFont(e.target.value)}
              checked={themeFont === fontConstants.inter}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Inter
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </div>
  )
}

export default ThemeFont

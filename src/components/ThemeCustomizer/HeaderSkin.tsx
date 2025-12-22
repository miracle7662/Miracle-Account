import { Col, Form, Row } from 'react-bootstrap'
import { ThemeSettings } from '@/common/context'

type HeaderSkinProps = {
  handleChangeHeaderSkin: (value: any) => void
  headerSkin?: string
  headerConstants: typeof ThemeSettings.header.theme
}
const HeaderSkin = ({ handleChangeHeaderSkin, headerSkin, headerConstants }: HeaderSkinProps) => {
  return (
    <>
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}
      >
        Header Skin
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="headerLight" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-header-skin"
              id="headerLight"
              value={headerConstants.light}
              onChange={(e) => handleChangeHeaderSkin(e.target.value)}
              checked={headerSkin === headerConstants.light}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Dark
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="headerDark" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-header-skin"
              id="headerDark"
              value={headerConstants.dark}
              onChange={(e) => handleChangeHeaderSkin(e.target.value)}
              checked={headerSkin === headerConstants.dark}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Dark
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </>
  )
}

export default HeaderSkin

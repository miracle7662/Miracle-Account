import { ThemeSettings } from '@/common/context'
import { Col, Form, Row } from 'react-bootstrap'

type NavigationSkinProps = {
  handleChangeNavigationSkin: (value: any) => void
  navigationSkin?: string
  navskinConstants: typeof ThemeSettings.sidebar.theme
}
const NavigationSkin = ({
  handleChangeNavigationSkin,
  navigationSkin,
  navskinConstants,
}: NavigationSkinProps) => {
  return (
    <>
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}
      >
        Navigation Skin
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="navigationLight" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-skin"
              id="navigationLight"
              value={navskinConstants.light}
              onChange={(e) => handleChangeNavigationSkin(e.target.value)}
              checked={navigationSkin === navskinConstants.light}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Light
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="navigationDark" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-skin"
              id="navigationDark"
              value={navskinConstants.dark}
              onChange={(e) => handleChangeNavigationSkin(e.target.value)}
              checked={navigationSkin === navskinConstants.dark}
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
          <Form.Check.Label htmlFor="navigationBrand" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-skin"
              id="navigationBrand"
              value={navskinConstants.brand}
              onChange={(e) => handleChangeNavigationSkin(e.target.value)}
              checked={navigationSkin === navskinConstants.brand}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Brand
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="navigationTransparent" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-skin"
              id="navigationTransparent"
              value={navskinConstants.transparent}
              onChange={(e) => handleChangeNavigationSkin(e.target.value)}
              checked={navigationSkin === navskinConstants.transparent}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Transparent
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </>
  )
}

export default NavigationSkin

import { ThemeSettings } from '@/common/context'
import { Col, Form, Row } from 'react-bootstrap'

type NavigationMenuProps = {
  handleChangeNavigationMenu: (value: any) => void
  navigationMenu?: string
  navmenuConstants: typeof ThemeSettings.sidebar.menu
}
const NavigationMenu = ({
  handleChangeNavigationMenu,
  navigationMenu,
  navmenuConstants,
}: NavigationMenuProps) => {
  return (
    <>
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}>
        Navigation Menu
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="navigationSoft" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-menu"
              id="navigationSoft"
              value={navmenuConstants.soft}
              onChange={(e) => handleChangeNavigationMenu(e.target.value)}
              checked={navigationMenu === navmenuConstants.soft}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}>
                Soft
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="navigationSolid" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-navigation-menu"
              id="navigationSolid"
              value={navmenuConstants.solid}
              onChange={(e) => handleChangeNavigationMenu(e.target.value)}
              checked={navigationMenu === navmenuConstants.solid}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}>
                Solid
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </>
  )
}

export default NavigationMenu

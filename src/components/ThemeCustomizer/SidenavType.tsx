import { ThemeSettings } from '@/common/context'
import { Col, Form, Row } from 'react-bootstrap'

type LayoutTypeProps = {
  handleChangeSidenavType: (value: string) => void
  sidenavType: string
  sidenavConstants: typeof ThemeSettings.sidebar.size
}

const SidenavType = ({
  handleChangeSidenavType,
  sidenavType,
  sidenavConstants,
}: LayoutTypeProps) => {
  return (
    <div id="sidebar-size">
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}>
        Sidenav Type
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="sidenavDefault" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-sidenav-size"
              id="sidenavDefault"
              value={sidenavConstants.default}
              onChange={(e) => handleChangeSidenavType(e.target.value)}
              checked={sidenavType === sidenavConstants.default}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}>
                Default
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="sidenavCompact" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-sidenav-size"
              id="sidenavCompact"
              value={sidenavConstants.compact}
              onChange={(e) => handleChangeSidenavType(e.target.value)}
              checked={sidenavType === sidenavConstants.compact}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}>
                Compact
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="sidenavIconbar" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-sidenav-size"
              id="sidenavIconbar"
              value={sidenavConstants.iconbar}
              onChange={(e) => handleChangeSidenavType(e.target.value)}
              checked={sidenavType === sidenavConstants.iconbar}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}>
                Iconbar
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="sidenavOverlay" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-sidenav-size"
              id="sidenavOverlay"
              value={sidenavConstants.full}
              onChange={(e) => handleChangeSidenavType(e.target.value)}
              checked={sidenavType === sidenavConstants.full}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}>
                Overlay
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="sidenavDetach" className="radio-card">
            <Form.Check.Input
              type="radio"
              name="data-sidenav-size"
              id="sidenavDetach"
              value={sidenavConstants.detach}
              onChange={(e) => handleChangeSidenavType(e.target.value)}
              checked={sidenavType === sidenavConstants.detach}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}>
                Detach
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </div>
  )
}

export default SidenavType

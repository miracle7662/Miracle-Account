import { Col, Form, Row } from 'react-bootstrap'
import { ThemeSettings } from '@/common/context'

type ContentSkinProps = {
  handleChangeContentSkin: (value: string) => void
  contentSkin?: string
  contentConstants: typeof ThemeSettings.layout.contentSkin
}
const ContentSkin = ({
  handleChangeContentSkin,
  contentSkin,
  contentConstants,
}: ContentSkinProps) => {
  return (
    <div id="layout-position">
      <h6
        className="fs-11 fw-bold text-dark text-uppercase mb-3"
        style={{ letterSpacing: '0.5px' }}
      >
        Content Skin
      </h6>
      <Row className="g-3">
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="contentDefault" className="radio-card">
            <Form.Check.Input
              type="radio"
              className="btn-check"
              name="data-content-skin"
              id="contentDefault"
              value={contentConstants.default}
              onChange={(e) => handleChangeContentSkin(e.target.value)}
              checked={contentSkin === contentConstants.default}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Default
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="contentSmooth" className="radio-card">
            <Form.Check.Input
              type="radio"
              className="btn-check"
              name="data-content-skin"
              id="contentSmooth"
              value={contentConstants.smooth}
              onChange={(e) => handleChangeContentSkin(e.target.value)}
              checked={contentSkin === contentConstants.smooth}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Smooth
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="contentShadow" className="radio-card">
            <Form.Check.Input
              type="radio"
              className="btn-check"
              name="data-content-skin"
              id="contentShadow"
              value={contentConstants.shadow}
              onChange={(e) => handleChangeContentSkin(e.target.value)}
              checked={contentSkin === contentConstants.shadow}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Shadow
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="contentBorder" className="radio-card">
            <Form.Check.Input
              type="radio"
              className="btn-check"
              name="data-content-skin"
              id="contentBorder"
              value={contentConstants.border}
              onChange={(e) => handleChangeContentSkin(e.target.value)}
              checked={contentSkin === contentConstants.border}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Border
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="contentModern" className="radio-card">
            <Form.Check.Input
              type="radio"
              className="btn-check"
              name="data-content-skin"
              id="contentModern"
              value={contentConstants.modern}
              onChange={(e) => handleChangeContentSkin(e.target.value)}
              checked={contentSkin === contentConstants.modern}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Modern
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Check.Label htmlFor="contentCreative" className="radio-card">
            <Form.Check.Input
              type="radio"
              className="btn-check"
              name="data-content-skin"
              id="contentCreative"
              value={contentConstants.creative}
              onChange={(e) => handleChangeContentSkin(e.target.value)}
              checked={contentSkin === contentConstants.creative}
            />
            <span className="radio-card-wrapper d-flex p-3 position-relative">
              <span
                className="fs-11 fw-semibold text-muted text-uppercase d-block"
                style={{ letterSpacing: '0.5px' }}
              >
                Creative
              </span>
              <span className="check-icon me-2 end-0 top-50 translate-middle-y position-absolute z-1"></span>
            </span>
          </Form.Check.Label>
        </Col>
      </Row>
    </div>
  )
}

export default ContentSkin

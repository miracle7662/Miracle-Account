import { Button, Col, Offcanvas, Row } from 'react-bootstrap'
import { ThemeSettings, useThemeContext } from './../../common/context'
import useThemeCustomizer from './../../components/ThemeCustomizer/useThemeCustomizer'
import ThemeCustomizerPublic from '@/components/ThemeCustomizer/ThemeCustomizerPublic'
import SimpleBar from 'simplebar-react'

const Customizer = () => {
  const { updateSettings, settings } = useThemeContext()

  const { reset } = useThemeCustomizer()

  const isOpenCustomizer = settings.customizer

  const handleCustomizer = () => {
    updateSettings({ customizer: ThemeSettings.customizer.hidden })
  }

  return (
    <Offcanvas
      show={isOpenCustomizer}
      onHide={handleCustomizer}
      placement="end"
      id="theme-settings-offcanvas"
      style={{ width: '375px' }}
    >
      <Offcanvas.Header
        className="d-flex align-items-center px-4 py-3 border-bottom"
        closeButton
        style={{ height: '4.5rem' }}
      >
        <div>
          <h5 className="fw-bold mb-1">Preview Settings</h5>
          <small className="fs-13 fw-normal text-muted">Customize and preview in real time</small>
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0">
        <SimpleBar scrollbarMaxSize={320} className="h-100">
          <ThemeCustomizerPublic />
        </SimpleBar>
      </Offcanvas.Body>

      <div className="offcanvas-footer border-top px-4 py-3 text-center">
        <Row className="g-2">
          <Col xs={6}>
            <Button
              variant="danger"
              type="button"
              className="w-100"
              id="reset-layout"
              onClick={reset}
            >
              Reset
            </Button>
          </Col>
          <Col xs={6}>
            <Button variant="primary" role="button" className="w-100">
              Buy Now
            </Button>
          </Col>
        </Row>
      </div>
    </Offcanvas>
  )
}

export default Customizer

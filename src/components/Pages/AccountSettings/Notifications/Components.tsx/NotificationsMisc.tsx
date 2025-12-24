import { Col, Row, Form } from 'react-bootstrap'

const NotificationsMisc = () => {
  return (
    <>
      <Row className="g-4">
        <Col md={3}>
          <h5 className="fw-semibold">Miscellaneous</h5>
          <p>You will get only notification what have enabled.</p>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Form.Check
            type="switch"
            className="mb-4"
            id="switch-miscellaneous-enable-sound"
            defaultChecked
            label={
              <div className="ms-2">
                <span className="h6 fw-semibold text-dark mb-1 d-block">Enable Sound</span>
                <span className="fw-normal d-block">Turn on sound for notifications.</span>
              </div>
            }
          />
          <Form.Check
            type="switch"
            className="mb-4"
            id="switch-miscellaneous-disable-notify"
            label={
              <div className="ms-2">
                <span className="h6 fw-semibold text-dark mb-1 d-block">Disable notify</span>
                <span className="fw-normal d-block">Disabled notifications for all users.</span>
              </div>
            }
          />
          <Form.Check
            type="switch"
            className="mb-4"
            id="switch-miscellaneous-led-notify"
            label={
              <div className="ms-2">
                <span className="h6 fw-semibold text-dark mb-1 d-block">LED notify</span>
                <span className="fw-normal d-block">Turn on LED notificatons light.</span>
              </div>
            }
          />
          <Form.Check
            type="switch"
            className="mb-0"
            id="switch-miscellaneous-contact-joining"
            label={
              <div className="ms-2">
                <span className="h6 fw-semibold text-dark mb-1 d-block">Contact joining</span>
                <span className="fw-normal d-block">Notify when a contact joins.</span>
              </div>
            }
          />
        </Col>
      </Row>
    </>
  )
}

export default NotificationsMisc

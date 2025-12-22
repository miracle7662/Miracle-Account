import { Col, Row, Form } from 'react-bootstrap'

const NotificationPush = () => {
  return (
    <>
      <Row className="g-4">
        <Col md={3}>
          <h5 className="fw-semibold">Push Notify</h5>
          <p>You will get only notification what have enabled.</p>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Form.Check
            type="radio"
            name="PushNotify"
            className="mb-4"
            id="radio-push-notify-everything"
            defaultChecked
            label={
              <div className="ms-2">
                <span className="h6 fw-semibold text-dark mb-1 d-block">Everything</span>
                <span className="fw-normal d-block">Notify or receiving post or story.</span>
              </div>
            }
          />
          <Form.Check
            type="radio"
            name="PushNotify"
            className="mb-4"
            id="radio-push-notify-important"
            label={
              <div className="ms-2">
                <span className="h6 fw-semibold text-dark mb-1 d-block">Only what's important</span>
                <span className="fw-normal d-block">These are notification to remaind you.</span>
              </div>
            }
          />
          <Form.Check
            type="radio"
            name="PushNotify"
            className="mb-0"
            id="radio-push-notify-no-push"
            label={
              <div className="ms-2">
                <span className="h6 fw-semibold text-dark mb-1 d-block">No push notifications</span>
                <span className="fw-normal d-block">
                  Send me an email when my items are approved or rejected.
                </span>
              </div>
            }
          />
        </Col>
      </Row>
    </>
  )
}

export default NotificationPush

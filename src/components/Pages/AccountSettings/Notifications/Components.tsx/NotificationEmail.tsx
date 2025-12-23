import { Col, Row, Form } from 'react-bootstrap'

const NotificationEmail = () => {
  return (
    <>
      <div className="mb-6 mb-md-12">
        <h5 className="fw-semibold">Nofication Settings</h5>
        <p>Select how you'll be notified when the following changes occur.</p>
      </div>
      <Row className="g-4 mb-6">
        <Col md={3}>Conversations tones</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check label="Email" type="checkbox" id="checkbox-email-conversations-tones" />
            </Col>
            <Col xs={4}>
              <Form.Check
                label="Browser"
                type="checkbox"
                id="checkbox-browser-conversations-tones"
                defaultChecked
              />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-conversations-tones" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-6">
        <Col md={3}>Account activity</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check
                label="Email"
                type="checkbox"
                id="checkbox-email-activity"
                defaultChecked
              />
            </Col>
            <Col xs={4}>
              <Form.Check label="Browser" type="checkbox" id="checkbox-browser-activity" />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-activity" defaultChecked />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-6">
        <Col md={3}>Successful payments</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check label="Email" type="checkbox" id="checkbox-email-payments" />
            </Col>
            <Col xs={4}>
              <Form.Check
                label="Browser"
                type="checkbox"
                id="checkbox-browser-payments"
                defaultChecked
              />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-payments" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-6">
        <Col md={3}>New post or story</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check label="Email" type="checkbox" id="checkbox-email-story" defaultChecked />
            </Col>
            <Col xs={4}>
              <Form.Check label="Browser" type="checkbox" id="checkbox-browser-story" />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-story" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-6">
        <Col md={3}>Comment notifications</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check label="Email" type="checkbox" id="checkbox-email-comment" />
            </Col>
            <Col xs={4}>
              <Form.Check label="Browser" type="checkbox" id="checkbox-browser-comment" />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-comment" defaultChecked />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-6">
        <Col md={3}>Notify Remainders</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check
                label="Email"
                type="checkbox"
                id="checkbox-email-remainders"
                defaultChecked
              />
            </Col>
            <Col xs={4}>
              <Form.Check label="Browser" type="checkbox" id="checkbox-browser-remainders" />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-remainders" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-6">
        <Col md={3}>Review notificationsrs</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check label="Email" type="checkbox" id="checkbox-email-review" />
            </Col>
            <Col xs={4}>
              <Form.Check label="Browser" type="checkbox" id="checkbox-browser-review" />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-review" defaultChecked />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-6">
        <Col md={3}>
          Daily summary emails
          <span></span>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check label="Email" type="checkbox" id="checkbox-email-daily-summary" />
            </Col>
            <Col xs={4}>
              <Form.Check
                label="Browser"
                type="checkbox"
                id="checkbox-browser-daily-summary"
                defaultChecked
              />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-daily-summary" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-4 mb-0">
        <Col md={3}>News and updates</Col>
        <Col md={9} xl={8} xxl={6}>
          <Row className="g-4 mb-4">
            <Col xs={4}>
              <Form.Check
                label="Email"
                type="checkbox"
                id="checkbox-email-news-updates"
                defaultChecked
              />
            </Col>
            <Col xs={4}>
              <Form.Check label="Browser" type="checkbox" id="checkbox-browser-news-updates" />
            </Col>
            <Col xs={4}>
              <Form.Check label="App" type="checkbox" id="checkbox-app-news-updates" />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default NotificationEmail

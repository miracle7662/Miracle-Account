import { Link } from 'react-router-dom'
import { Form, Row, Col, ListGroup } from 'react-bootstrap'

const AcSecurity = () => {
  return (
    <>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <h5 className="fw-semibold">Security</h5>
          <p>Ensure security on your account</p>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <ListGroup className="mb-3">
            <ListGroup.Item>
              <div className="d-sm-flex align-item-center gap-6">
                <div className="me-sm-12">
                  <div className="fw-semibold text-dark mb-1">Enable 2-step authentication</div>
                  <p className="mb-sm-0">
                    Protects you against password theft by requesting an authentication code via SMS
                    on every login.
                  </p>
                </div>
                <div className="ms-auto">
                  <Form.Check type="switch" defaultChecked />
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-sm-flex align-item-center gap-6">
                <div className="me-sm-12">
                  <div className="fw-semibold text-dark mb-1">
                    Ask to change password on every 6 months
                  </div>
                  <p className="mb-sm-0">
                    A simple but an effective way to be protected against data leaks and password
                    theft.
                  </p>
                </div>
                <div className="ms-auto ">
                  <Form.Check type="switch" />
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-sm-flex align-item-center gap-6">
                <div className="me-sm-12">
                  <div className="fw-semibold text-dark mb-1">Save my Activity Logs</div>
                  <p className="mb-sm-0">
                    You can save your all activity logs including unusual activity detected.
                  </p>
                </div>
                <div className="ms-auto">
                  <Form.Check type="switch" />
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item>
              <div className="d-sm-flex align-item-center gap-6">
                <div className="mesm-12">
                  <div className="fw-semibold text-dark mb-1">Authentication app</div>
                  <p className="mbsm-0">Google or anyothers auth app setup.</p>
                </div>
                <div className="ms-auto">
                  <Link to="#!" className="btn btn-md btn-neutral">
                    Setup
                  </Link>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-sm-flex align-item-center gap-6">
                <div className="mesm-12">
                  <div className="fw-semibold text-dark mb-1">Recovery email</div>
                  <p className="mbsm-0">E-mail used to send recovery link.</p>
                </div>
                <div className="ms-auto">
                  <Link to="#!" className="btn btn-md btn-neutral">
                    Setup
                  </Link>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-sm-flex align-item-center gap-6">
                <div className="mesm-12">
                  <div className="fw-semibold text-dark mb-1">Phone recovery</div>
                  <p className="mbsm-0">Your phone number or something</p>
                </div>
                <div className="ms-auto">
                  <Link to="#!" className="btn btn-md btn-neutral">
                    Setup
                  </Link>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default AcSecurity

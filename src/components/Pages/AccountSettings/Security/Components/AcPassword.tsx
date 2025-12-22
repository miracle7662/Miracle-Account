import { Form, Row, Col } from 'react-bootstrap'

const AcPassword = () => {
  return (
    <>
      <div className="mb-6 mb-md-12">
        <h5 className="fw-semibold">Password</h5>
        <p>Change password on your account</p>
      </div>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Current Password</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Form.Control type="password" placeholder="Current Password" />
        </Col>
      </Row>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">New Password</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Form.Control type="password" placeholder="New Password" />
        </Col>
      </Row>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Confirm Password</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Col>
      </Row>
      <Row className="g-md-4 mb-4">
        <Col md={3}></Col>
        <Col md={9} xl={8} xxl={6}>
          <h6>Password Requirements:</h6>
          <ul className="ps-1 ms-2 mb-0">
            <li className="mb-1">At least one lowercase character</li>
            <li className="mb-1">Minimum 8 characters long - the more, the better</li>
            <li>At least one number, symbol, or whitespace character</li>
          </ul>
        </Col>
      </Row>
    </>
  )
}

export default AcPassword

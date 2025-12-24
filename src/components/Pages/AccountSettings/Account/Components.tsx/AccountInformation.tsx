import { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import { Form, Row, Col } from 'react-bootstrap'
import 'flatpickr/dist/themes/airbnb.css'

interface AccountInformationProps {}

interface AccountInformationState {
  date: Date
}

class AccountInformation extends Component<AccountInformationProps, AccountInformationState> {
  constructor(props: AccountInformationProps) {
    super(props)

    this.state = {
      date: new Date(),
    }
  }

  handleChange = (dates: Date[]) => {
    const [date] = dates
    this.setState({ date })
  }

  render() {
    return (
      <>
        <div className="mb-6 mb-md-12">
          <h5 className="fw-semibold">Personal Information</h5>
          <p>Basic info, like your name and address that will displayed in public</p>
        </div>
        <Form>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">Fullname</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Form.Control type="text" placeholder="Fullname" />
            </Col>
          </Row>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">Username</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Form.Control type="url" placeholder="Username" />
            </Col>
          </Row>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">Email</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Row>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">Address</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Form.Control type="tel" placeholder="Address" />
            </Col>
          </Row>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">Phone</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Form.Control type="tel" placeholder="Phone" />
            </Col>
          </Row>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">Date of Birth</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Flatpickr
                onChange={this.handleChange}
                className="form-control"
                placeholder="Select date..."
              />
            </Col>
          </Row>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">Website</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Form.Control type="url" placeholder="Website" />
            </Col>
          </Row>
          <Row className="g-md-4 mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium">About</Form.Label>
            </Col>
            <Col md={9} xl={8} xxl={6}>
              <Form.Control as="textarea" style={{ height: '100px' }} placeholder="About" />
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}

export default AccountInformation

import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const cardData = [
  {
    id: 'radio-card-example6-1',
    name: 'William T. Angeles',
    company: 'Software Company',
    phone: '+1 662-618-5001',
    email: 'contact@jourrapide.com',
    specialization: 'Fronted Development',
    website: 'https://yourwebsite.com',
    address: 'New Yoark, United State',
  },
  {
    id: 'radio-card-example6-2',
    name: 'Kenneth P. Navarre',
    company: 'AI Technology',
    phone: '+1 662-618-5001',
    email: 'contact@jourrapide.com',
    specialization: 'Fronted Development',
    website: 'https://yourwebsite.com',
    address: 'Vargenia, United State',
    defaultChecked: true,
  },
  {
    id: 'radio-card-example6-3',
    name: 'Judith R. Truman',
    company: 'Entertainment',
    phone: '+1 662-618-5001',
    email: 'contact@jourrapide.com',
    specialization: 'Fronted Development',
    website: 'https://yourwebsite.com',
    address: 'California, United State',
  },
]

const AdvRadioEx6 = () => {
  return (
    <Row>
      {cardData.map(
        ({ id, name, company, phone, email, specialization, website, address, defaultChecked }) => (
          <Col lg={4} key={id}>
            <Form.Check.Label htmlFor={id} className="radio-card">
              <Form.Check.Input
                id={id}
                type="radio"
                name="radio-card-example6"
                defaultChecked={defaultChecked}
              />
              <span className="radio-card-wrapper d-flex gap-3">
                <span className="check-icon"></span>
                <span className="radio-card-content">
                  <span className="radio-card-title d-block">
                    <span className="d-block fw-bold text-dark mb-2">{name}</span>
                    <span className="d-block fs-12 fw-medium text-dark">{company}</span>
                  </span>
                  <span className="radio-card-desc d-block mt-6">
                    <span className="row mb-3">
                      <span className="col-auto">
                        <i className="fi fi-rr-phone-call"></i>
                      </span>
                      <span className="col-auto">{phone}</span>
                    </span>
                    <span className="row mb-3">
                      <span className="col-auto">
                        <i className="fi fi-rr-envelope"></i>
                      </span>
                      <span className="col-auto">{email}</span>
                    </span>
                    <span className="row mb-3">
                      <span className="col-auto">
                        <i className="fi fi-rr-briefcase"></i>
                      </span>
                      <span className="col-auto">{specialization}</span>
                    </span>
                    <span className="row mb-3">
                      <span className="col-auto">
                        <i className="fi fi-rr-globe"></i>
                      </span>
                      <span className="col-auto">{website}</span>
                    </span>
                    <span className="row mb-0">
                      <span className="col-auto">
                        <i className="fi fi-rr-marker"></i>
                      </span>
                      <span className="col-auto">{address}</span>
                    </span>
                  </span>
                </span>
              </span>
            </Form.Check.Label>
          </Col>
        ),
      )}
    </Row>
  )
}

export default AdvRadioEx6

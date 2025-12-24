import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const checkboxData = [
  {
    id: 'check-card-example6-1',
    name: 'check-card-example6',
    title: 'William T. Angeles',
    company: 'Software Company',
    phone: '+1 662-618-5001',
    email: 'contact@jourrapide.com',
    briefcase: 'Fronted Development',
    website: 'https://yourwebsite.com',
    address: '3640 Saint Clair Street, MS 38930',
  },
  {
    id: 'check-card-example6-2',
    name: 'check-card-example6',
    title: 'Kenneth P. Navarre',
    company: 'AI Technology',
    phone: '+1 662-618-5001',
    email: 'contact@jourrapide.com',
    briefcase: 'Fronted Development',
    website: 'https://yourwebsite.com',
    address: '3640 Saint Clair Street, MS 38930',
    defaultChecked: true,
  },
  {
    id: 'check-card-example6-3',
    name: 'check-card-example6',
    title: 'Judith R. Truman',
    company: 'Entertainment',
    phone: '+1 662-618-5001',
    email: 'contact@jourrapide.com',
    briefcase: 'Fronted Development',
    website: 'https://yourwebsite.com',
    address: '3640 Saint Clair Street, MS 38930',
  },
]

const AdvCheckboxEx6 = () => {
  return (
    <Row>
      {checkboxData.map(
        ({
          id,
          name,
          title,
          company,
          phone,
          email,
          briefcase,
          website,
          address,
          defaultChecked,
        }) => (
          <Col lg={4} key={id}>
            <Form.Check.Label htmlFor={id} className="check-card">
              <Form.Check.Input
                id={id}
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
              />
              <span className="check-card-wrapper d-flex gap-3">
                <span className="check-icon"></span>
                <span className="check-card-content">
                  <span className="check-card-title d-block">
                    <span className="d-block fw-bold text-dark mb-2">{title}</span>
                    <span className="d-block fs-12 fw-medium text-dark">{company}</span>
                  </span>
                  <span className="check-card-desc d-block mt-6">
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
                      <span className="col-auto">{briefcase}</span>
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

export default AdvCheckboxEx6

import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'

const QuestionOptions = [
  {
    value: 'What city were you born in?',
    label: '1. What city were you born in?',
  },
  {
    value: "What is your oldest sibling's middle name?",
    label: "2. What is your oldest sibling's middle name?",
  },
  {
    value: 'What was the first concert you attended?',
    label: '3. What was the first concert you attended?',
  },
  {
    value: 'What was the make and model of your first car?',
    label: '4. What was the make and model of your first car?',
  },
  {
    value: 'In what city or town did your parents meet?',
    label: '5. In what city or town did your parents meet?',
  },
]

const AcQuestions = () => {
  return (
    <>
      <div className="mb-6 mb-md-12">
        <h5 className="fw-semibold">Questions</h5>
        <p>Change security questions for your account</p>
      </div>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Question #1</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Select options={QuestionOptions} classNamePrefix="select" />
        </Col>
      </Row>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Answer #1</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Form.Control type="password" placeholder="Answer #1" />
        </Col>
      </Row>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Question #2</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Select options={QuestionOptions} classNamePrefix="select" />
        </Col>
      </Row>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Answer #2</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Form.Control type="password" placeholder="Answer #2" />
        </Col>
      </Row>
    </>
  )
}

export default AcQuestions

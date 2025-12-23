import { Card, Row, Col, Form } from 'react-bootstrap'
import Saving from '@/components/Misc/Saving'

import { AcDelete, AcPassword, AcQuestions, AcSecurity } from './Components'

const SecurityComponent = () => {
  return (
    <>
      <Card className="mb-3 mb-md-4">
        <Card.Body>
          <Form>
            <AcPassword />
            <hr className="my-6 my-md-12" />
            <AcQuestions />
            <hr className="my-6 my-md-12" />
            <AcSecurity />
            <hr className="my-6 my-md-12" />
            <Row className="g-md-4 mb-md-4">
              <Col md={3}></Col>
              <Col md={9} xl={8} xxl={6}>
                <Saving message="Updated successfully" />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <AcDelete />
        </Card.Body>
      </Card>
    </>
  )
}

export default SecurityComponent

import { Card, Row, Col } from 'react-bootstrap'
import Saving from '@/components/Misc/Saving'

import { BillingMethord, BillingHistory, BillingSubscription } from './Components'

const BillingComponent = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <BillingSubscription />
          <hr className="my-6 my-md-12" />
          <BillingMethord />
          <hr className="my-6 my-md-12" />
          <Row className="g-md-4 mb-md-4">
            <Col md={3}></Col>
            <Col md={9} xl={8} xxl={6}>
              <Saving message="Updated successfully" />
            </Col>
          </Row>
          <hr className="my-6 my-md-12" />
          <BillingHistory />
        </Card.Body>
      </Card>
    </>
  )
}

export default BillingComponent

import { Card, Row, Col } from 'react-bootstrap'
import Saving from '@/components/Misc/Saving.tsx'
import { NotificationEmail, NotificationPush, NotificationsMisc } from './Components.tsx'

const NotificationsComponent = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <NotificationEmail />
          <hr className="my-6 my-md-12" />
          <NotificationPush />
          <hr className="my-6 my-md-12" />
          <NotificationsMisc />
          <hr className="my-6 my-md-12" />
          <Row className="g-md-4 mb-md-4">
            <Col md={3}></Col>
            <Col md={9} xl={8} xxl={6}>
              <Saving message="Updated successfully" />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default NotificationsComponent

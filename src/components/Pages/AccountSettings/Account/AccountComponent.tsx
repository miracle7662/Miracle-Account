import { Card, Row, Col } from 'react-bootstrap'
import Saving from '@/components/Misc/Saving.tsx'
import { AccountAvatarCover, AccountInformation, AccountPreferences } from './Components.tsx'

const AccountComponent = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <AccountAvatarCover />
          <hr className="my-6 my-md-12" />
          <AccountInformation />
          <hr className="my-6 my-md-12" />
          <AccountPreferences />
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

export default AccountComponent

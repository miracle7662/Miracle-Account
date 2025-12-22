import React, { ReactNode } from 'react'
import { Button, Card, Col, Image, Row, Stack } from 'react-bootstrap'
import BgCircleShapeStyle from '@/components/Misc/BgCircleShape'
import fullAvatar from '@/assets/images/general/full-avatar.png'

interface AuthCorporateProps {
  children: ReactNode
}

const AuthCorporate: React.FC<AuthCorporateProps> = ({ children }) => {
  return (
    <Row className="auth-layout g-0">
      <Col xs={12} lg={6} xl={4}>
        <Stack
          className="align-items-center justify-content-center mx-4 mx-sm-6"
          style={{ minHeight: '100vh' }}
        >
          <Card className="w-100 mx-auto my-6 my-sm-8" style={{ maxWidth: '480px' }}>
            <Card.Body className="py-8 py-sm-8 px-sm-8">{children}</Card.Body>
          </Card>
        </Stack>
      </Col>
      <Col
        lg={6}
        xl={8}
        className="d-none d-lg-flex flex-column align-items-center justify-content-center bg-primary bg-opacity-10 position-relative"
        style={{ ...BgCircleShapeStyle, minHeight: '100vh' }}
      >
        <Image src={fullAvatar} fluid style={{ maxHeight: '100vh' }} className="py-24" />
        <div
          className="position-absolute end-10 bottom-10 bg-primary-subtle rounded-3 border border-primary border-opacity-10 p-5 shadow-sm"
          style={{ maxWidth: '365px' }}
        >
          <h4 className="mb-3">Grow faster with pro's help</h4>
          <p className="mb-4">
            Experience top-notch features with our services and insights. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit.
          </p>
          <Button variant="primary">Get Started</Button>
        </div>
      </Col>
    </Row>
  )
}

export default AuthCorporate

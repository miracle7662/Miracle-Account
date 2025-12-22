import React, { ReactNode } from 'react'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import LogoWhite from '@/components/Common/LogoWhite'
import BgCircleShapeStyle from '@/components/Misc/BgCircleShape'

interface AuthClassicProps {
  children: ReactNode
}

const AuthClassic: React.FC<AuthClassicProps> = ({ children }) => {
  return (
    <Row className="auth-layout g-0">
      <Col
        lg={6}
        className="d-none d-lg-flex text-bg-primary text-white d-flex flex-column align-items-center justify-content-center"
        style={{ ...BgCircleShapeStyle, minHeight: '100vh' }}
      >
        <div
          className="h-100 mx-auto my-12 d-flex flex-column justify-content-between px-4 px-sm-6"
          style={{ maxWidth: '576px' }}
        >
          <LogoWhite />
          <div>
            <h1 className="text-white mb-4">Welcome back!</h1>
            <p className="lead fs-20">
              We are glad to see you again! Get access to your Orders, Wishlist and Recommendations.
            </p>
          </div>
          <div>
            <div className="text-white">
              <span className="fs-12 fw-medium text-uppercase">Copyright&copy;</span>
              <span className="ms-1">{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </Col>
      <Col xs={12} lg={6}>
        <Stack
          className="align-items-center justify-content-center mx-4 mx-sm-6"
          style={{ minHeight: '100vh' }}
        >
          <Card className="w-100 mx-auto my-6 my-sm-8" style={{ maxWidth: '480px' }}>
            <Card.Body className="py-8 py-sm-8 px-sm-8">{children}</Card.Body>
          </Card>
        </Stack>
      </Col>
    </Row>
  )
}

export default AuthClassic

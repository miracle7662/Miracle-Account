import React, { ReactNode } from 'react'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import torusbg from '@/assets/images/general/torus-bg.png'
import LogoWhite from '@/components/Common/LogoWhite'

interface AuthCreativeProps {
  children: ReactNode
}

const AuthCreative: React.FC<AuthCreativeProps> = ({ children }) => {
  const creativeBgStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${torusbg})`,
    backgroundSize: '992px',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'start center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <Row className="auth-layout g-0">
      <Col
        lg={8}
        xl={9}
        className="d-none d-lg-flex flex-column align-items-center justify-content-center"
        style={{ ...creativeBgStyle }}
      >
        <div className="w-100 h-100 bg-primary bg-opacity-50 text-white">
          <div
            className="my-12 mx-auto d-flex flex-column justify-content-between px-4 px-sm-6"
            style={{ maxWidth: '768px', minHeight: 'calc(100vh - 6rem)' }}
          >
            <LogoWhite />
            <div>
              <h1 className="text-white mb-4">Welcome back!</h1>
              <p className="lead fs-20">
                We are glad to see you again! Get access to your Orders, Wishlist and
                Recommendations.
              </p>
            </div>
            <div>
              <div className="text-white">
                <span className="fs-12 fw-medium text-uppercase">Copyright&copy;</span>
                <span className="ms-1">{new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col xs={12} lg={4} xl={3}>
        <Stack
          className="align-items-center justify-content-center px-4 px-sm-6 auth-creative-layout"
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

export default AuthCreative

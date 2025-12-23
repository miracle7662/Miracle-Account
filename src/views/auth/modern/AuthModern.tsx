import React, { ReactNode, useEffect } from 'react'
import { useThemeContext } from '@/common'
import { changeHTMLAttribute } from '@/utils'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import LogoWhite from '@/components/Common/LogoWhite'
import bgVideo from '@/assets/images/general/video_bg_1.mp4'
import dotBg from '@/assets/images/general/dot.png'

interface AuthModernProps {
  children: ReactNode
}

const AuthModern: React.FC<AuthModernProps> = ({ children }) => {
  const { settings } = useThemeContext()

  useEffect(() => {
    changeHTMLAttribute('data-color-scheme', settings.color)
  }, [settings.color])

  useEffect(() => {
    changeHTMLAttribute('data-bs-theme', settings.theme)
  }, [settings.theme])

  useEffect(() => {
    changeHTMLAttribute('data-theme-font', settings.font)
  }, [settings.font])

  useEffect(() => {
    changeHTMLAttribute('data-content-skin', settings.layout.contentSkin)
  }, [settings.layout.contentSkin])

  return (
    <>
      <Row className="g-0">
        <Col
          lg={6}
          xl={8}
          className="d-none d-lg-flex bg-primary bg-opacity-25 text-white d-flex flex-column align-items-center justify-content-center position-relative"
          style={{ minHeight: '100vh', backgroundImage: `url(${dotBg})` }}
        >
          <video
            autoPlay
            loop
            muted
            className="position-absolute top-0 left-0 w-100 h-100 object-fit-cover"
            style={{ zIndex: -1 }}
          >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className="h-100 mx-auto my-12 d-flex flex-column justify-content-between px-4 px-sm-6"
            style={{ maxWidth: '768px' }}
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
        </Col>
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
      </Row>
    </>
  )
}

export default AuthModern

import React, { ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '@/common'
import { changeHTMLAttribute } from '@/utils'
import { Button, Card, Stack } from 'react-bootstrap'
import Logo from '@/components/Common/Logo'

interface EmailTemplatesLayoutProps {
  children: ReactNode
}

const EmailTemplatesLayout: React.FC<EmailTemplatesLayoutProps> = ({ children }) => {
  const { settings } = useThemeContext()

  useEffect(() => {
    changeHTMLAttribute('data-color-scheme', settings.color)
    changeHTMLAttribute('data-bs-theme', settings.theme)
    changeHTMLAttribute('data-theme-font', settings.font)
    changeHTMLAttribute('data-content-skin', settings.layout.contentSkin)
  }, [settings])

  return (
    <>
      <Stack
        className="email-layout align-items-center justify-content-center mx-4 mx-sm-6"
        style={{ minHeight: '100vh' }}
      >
        <Card className="w-100 mx-auto my-6 my-sm-8 rounded-5" style={{ maxWidth: '600px' }}>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Link to="/">
              <Logo />
            </Link>
            <Button variant="light" className="btn-icon btn-md">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Button>
          </Card.Header>
          <Card.Body className="py-8 py-sm-8 px-sm-8">{children}</Card.Body>
        </Card>
        <Link to="/" className="icon-link icon-link-hover link-primary py-2 px-4 mb-6">
          <i className="fi fi-rr-arrow-left bi"></i>
          <span className="ms-2">Back to Home</span>
        </Link>
      </Stack>
    </>
  )
}

export default EmailTemplatesLayout

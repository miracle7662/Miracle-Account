import React, { ReactNode, useEffect } from 'react'
import { useThemeContext } from '@/common'
import { changeHTMLAttribute } from '@/utils'
import { Card, Stack } from 'react-bootstrap'

interface ErrorLayoutProps {
  children: ReactNode
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
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
        className="error-layout align-items-center justify-content-center mx-4 mx-sm-6"
        style={{ minHeight: '100vh' }}
      >
        <Card className="w-100 mx-auto my-6 my-sm-8" style={{ maxWidth: '576px' }}>
          <Card.Body className="px-6 py-16 px-sm-16 py-md-24 px-md-24  text-center">
            {children}
          </Card.Body>
        </Card>
      </Stack>
    </>
  )
}

export default ErrorLayout

import { useEffect, Suspense, ReactNode, useState } from 'react'
import { ThemeSettings, useThemeContext } from '../common/context'
import { changeHTMLAttribute } from '../utils'
import { Button, Stack } from 'react-bootstrap'
import { PreloaderFull } from '@/components/Misc/Preloader'
import ThemeCustomizerPublic from './Customizer/CustomizerPublic'
import SupportLiveChat from './LiveChat/SupportLiveChat'

interface AuthLayoutProps {
  children?: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { settings, updateSettings } = useThemeContext()
  const [showLiveChat, setShowLiveChat] = useState(false)

  const handleSupportLiveChat = () => {
    setShowLiveChat(!showLiveChat)
  }

  const handleCustomizer = () => {
    updateSettings({ customizer: ThemeSettings.customizer.show })
  }

  useEffect(() => {
    changeHTMLAttribute('data-color-scheme', settings.color)
    changeHTMLAttribute('data-bs-theme', settings.theme)
    changeHTMLAttribute('data-theme-font', settings.font)
    changeHTMLAttribute('data-content-skin', settings.layout.contentSkin)
  }, [settings])

  return (
    <Suspense fallback={<PreloaderFull />}>
      <Suspense fallback={<div />}>
        <div className="wrapper">{children}</div>
      </Suspense>

      <Suspense fallback={<div />}>
        <ThemeCustomizerPublic />
      </Suspense>

      <Suspense fallback={<div />}>
        <SupportLiveChat show={showLiveChat} />
      </Suspense>

      <Stack className="position-fixed z-1" style={{ right: '0', bottom: '50%' }}>
        <Button
          onClick={handleCustomizer}
          variant="primary"
          className="btn-lg btn-icon rounded-0 rounded-start-3"
        >
          <i className="fi fi-rr-settings fs-18" />
        </Button>
      </Stack>

      <Stack
        className="support-livechat-btn position-fixed z-1"
        style={{ bottom: '2rem', right: '2rem' }}
      >
        {showLiveChat ? (
          <Button onClick={handleSupportLiveChat} variant="primary" className="btn-lg btn-icon">
            <i className="fi fi-rr-cross-small fs-20"></i>
          </Button>
        ) : (
          <Button
            onClick={handleSupportLiveChat}
            variant="primary"
            className="btn-lg rounded-5 w-100"
          >
            <i className="fi fi-rr-dot-circle fs-12"></i>
            <span className="ms-2">Live Chat</span>
          </Button>
        )}
      </Stack>
    </Suspense>
  )
}

export default AuthLayout

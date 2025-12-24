import { ThemeSettings, useThemeContext } from '@/common/context'
import { Preloader, PreloaderFull } from '@/components/Misc/Preloader'
import { useToggle } from '@/hooks'
import { changeHTMLAttribute } from '@/utils'
import { Suspense, useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import Customizer from '../Customizer/Customizer'
import Footer from '../Footer'
import Header from '../Header'
import SupportLiveChat from '../LiveChat/SupportLiveChat'
import Navigation from './Navigation'

interface HorizontaLayoutProps {
  children?: any
}

const HorizontalLayout = ({ children }: HorizontaLayoutProps) => {
  const [horizontalDropdownOpen, toggleMenu] = useToggle()
  const { settings, updateSettings } = useThemeContext()
  const [showLiveChat, setShowLiveChat] = useState(false)

  const fullPageRoutes = ['/fullpage', '/apps/Tableview', '/apps/Billview']
  const isFullPage = fullPageRoutes.includes(location.pathname)

  const handleSupportLiveChat = () => {
    setShowLiveChat(!showLiveChat)
  }

  const handleCustomizer = () => {
    updateSettings({ customizer: ThemeSettings.customizer.show })
  }

  useEffect(() => {
    changeHTMLAttribute('data-color-scheme', settings.color)
    changeHTMLAttribute('data-navigation-type', 'horizontal')
    changeHTMLAttribute('data-bs-theme', settings.theme)
    changeHTMLAttribute('data-theme-font', settings.font)
    changeHTMLAttribute('data-content-layout', settings.layout.mode)
    changeHTMLAttribute('data-header-skin', settings.header.theme)
    changeHTMLAttribute('data-navigation-skin', settings.sidebar.theme)
    changeHTMLAttribute('data-navigation-menu', settings.sidebar.menu)
    changeHTMLAttribute('data-content-skin', settings.layout.contentSkin)

    return () => {
      document.getElementsByTagName('html')[0].removeAttribute('data-navigation-type')
    }
  }, [settings])

  return (
    <Suspense fallback={<div />}>
      <div className="wrapper">
        {!isFullPage && (
          <>
            <Suspense fallback={<PreloaderFull />}>
              <Header toggleMenu={toggleMenu} navOpen={horizontalDropdownOpen} />
            </Suspense>

            <Suspense fallback={<div />}>
              <Navigation isMenuOpened={horizontalDropdownOpen} />
            </Suspense>
          </>
        )}

        <main className="main-content">
          <div
            className={`inner-content ${
              location.pathname.startsWith('/apps/') ? 'apps-content' : ''
            }`}>
            <Suspense fallback={<Preloader />}>{children}</Suspense>
          </div>
        </main>

        {!['/apps/'].some((path) => location.pathname.startsWith(path)) && (
          <Suspense fallback={<div />}>
            <Footer />
          </Suspense>
        )}
      </div>

      <Suspense fallback={<div />}>
        <Customizer />
      </Suspense>

      <Suspense fallback={<div />}>
        <SupportLiveChat show={showLiveChat} />
      </Suspense>

      <Stack className="position-fixed z-1" style={{ right: '0', bottom: '50%' }}>
        <Button
          onClick={handleCustomizer}
          variant="primary"
          className="btn-lg btn-icon rounded-0 rounded-start-3">
          <i className="fi fi-rr-settings fs-18" />
        </Button>
      </Stack>

      <Stack
        className="support-livechat-btn position-fixed z-1"
        style={{ bottom: '2rem', right: '2rem' }}>
        {showLiveChat ? (
          <Button onClick={handleSupportLiveChat} variant="primary" className="btn-lg btn-icon">
            <i className="fi fi-rr-cross-small fs-20"></i>
          </Button>
        ) : (
          <Button
            onClick={handleSupportLiveChat}
            variant="primary"
            className="btn-lg rounded-5 w-100">
            <i className="fi fi-rr-dot-circle fs-12"></i>
            <span className="ms-2">Live Chat</span>
          </Button>
        )}
      </Stack>
    </Suspense>
  )
}

export default HorizontalLayout

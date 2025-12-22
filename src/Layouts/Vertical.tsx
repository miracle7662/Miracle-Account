import { Preloader, PreloaderFull } from '@/components/Misc/Preloader'
import React, { Suspense, useEffect } from 'react'
//import { Button, Stack } from 'react-bootstrap'
import { ThemeSettings, useThemeContext } from '../common/context'
//import { useViewport } from '../hooks'
import { changeHTMLAttribute } from '../utils'
// import SupportLiveChat from './LiveChat/SupportLiveChat'

const Header = React.lazy(() => import('./Header'))
const Footer = React.lazy(() => import('./Footer'))
const Navigation = React.lazy(() => import('./Navigation'))
const Customizer = React.lazy(() => import('./Customizer/Customizer'))

interface VerticalLayoutProps {
  children?: any
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
 // const { width } = useViewport()
  const { settings, updateSidebar,  } = useThemeContext()

  const fullPageRoutes = ['/fullpage', '/apps/Tableview', '/apps/Billview']
  const isFullPage = fullPageRoutes.includes(location.pathname)


  useEffect(() => {
    changeHTMLAttribute('data-color-scheme', settings.color)
    changeHTMLAttribute('data-bs-theme', settings.theme)
    changeHTMLAttribute('data-theme-font', settings.font)
    changeHTMLAttribute('data-content-layout', settings.layout.mode)
    changeHTMLAttribute('data-header-skin', settings.header.theme)
    changeHTMLAttribute('data-navigation-skin', settings.sidebar.theme)
    changeHTMLAttribute('data-navigation-menu', settings.sidebar.menu)
    changeHTMLAttribute('data-sidenav-size', ThemeSettings.sidebar.size.iconbar) // Always iconbar

    //changeHTMLAttribute('data-sidenav-size', settings.sidebar.size.iconbar)
    changeHTMLAttribute('data-content-skin', settings.layout.contentSkin)
  }, [settings])

 //Force sidebar size to iconbar on first render
    useEffect(() => {
     updateSidebar({ size: ThemeSettings.sidebar.size.iconbar })
     }, [updateSidebar])


  return (
    <Suspense fallback={<div />}>
      <div className="wrapper">
        {!isFullPage && (
          <>
            <Suspense fallback={<PreloaderFull />}>
              <Navigation />
            </Suspense>

            <Suspense fallback={<div />}>
              <Header />
            </Suspense>
          </>
        )}

        <main className="main-content">
          <div
            className={`inner-content ${
              location.pathname.startsWith('/apps/') ? 'apps-content' : ''
            }`}>
            <Suspense fallback={<Preloader />}> {children}</Suspense>
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

      {/* <Suspense fallback={<div />}>
        <SupportLiveChat show={showLiveChat} />
      </Suspense> */}

      {/* <Stack
        className="position-fixed z-1"
        style={{
          right: '0',
          bottom: '50%',
        }}>
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
      </Stack> */}
    </Suspense>
  )
}
export default VerticalLayout
import { ThemeSettings } from '@/common/context'
import ColorScheme from './ColorScheme'
import ContentLayout from './ContentLayout'
import ContentSkin from './ContentSkin'
import HeaderSkin from './HeaderSkin'
import NavigationMenu from './NavigationMenu'
import NavigationSkin from './NavigationSkin'
import NavigationType from './NavigationType'
import SidenavType from './SidenavType'
import SkinMode from './SkinMode'
import ThemeFont from './ThemeFont'
import useThemeCustomizer from './useThemeCustomizer'

const ThemeCustomizer = () => {
  const {
    colorScheme,
    navigationType,
    skinMode,
    themeFont,
    contentLayout,
    headerSkin,
    navigationSkin,
    navigationMenu,
    sidenavType,
    contentSkin,
    handleChangeColorScheme,
    handleChangeNavigationType,
    handleChangeSkinMode,
    handleChangeThemeFont,
    handleChangeContentLayout,
    handleChangeHeaderSkin,
    handleChangeNavigationSkin,
    handleChangeNavigationMenu,
    handleChangeSidenavType,
    handleChangeContentSkin,
  } = useThemeCustomizer()

  const renderSidenavType = () => {
    if (navigationType === ThemeSettings.layout.type.horizontal) {
      return null
    }
    return (
      <>
        <hr className="mb-0 mt-2" />
        <div className="p-4">
          <SidenavType
            handleChangeSidenavType={handleChangeSidenavType}
            sidenavType={sidenavType}
            sidenavConstants={ThemeSettings.sidebar.size}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="p-4">
        <ColorScheme
          handleChangeColorScheme={handleChangeColorScheme}
          colorScheme={colorScheme}
          schemeConstants={ThemeSettings.color}
        />
      </div>
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <NavigationType
          handleChangeNavigationType={handleChangeNavigationType}
          navigationType={navigationType}
          navtypeConstants={ThemeSettings.layout.type}
        />
      </div>
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <ContentLayout
          handleChangeContentLayout={handleChangeContentLayout}
          contentLayout={contentLayout}
          layoutConstants={ThemeSettings.layout.mode}
        />
      </div>
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <SkinMode
          handleChangeSkinMode={handleChangeSkinMode}
          skinMode={skinMode}
          skinmodeConstants={ThemeSettings.theme}
        />
      </div>
      {renderSidenavType()}
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <NavigationSkin
          handleChangeNavigationSkin={handleChangeNavigationSkin}
          navigationSkin={navigationSkin}
          navskinConstants={ThemeSettings.sidebar.theme}
        />
      </div>
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <NavigationMenu
          handleChangeNavigationMenu={handleChangeNavigationMenu}
          navigationMenu={navigationMenu}
          navmenuConstants={ThemeSettings.sidebar.menu}
        />
      </div>
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <HeaderSkin
          handleChangeHeaderSkin={handleChangeHeaderSkin}
          headerSkin={headerSkin}
          headerConstants={ThemeSettings.header.theme}
        />
      </div>
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <ContentSkin
          handleChangeContentSkin={handleChangeContentSkin}
          contentSkin={contentSkin}
          contentConstants={ThemeSettings.layout.contentSkin}
        />
      </div>
      <hr className="mb-0 mt-2" />
      <div className="p-4">
        <ThemeFont
          handleChangeThemeFont={handleChangeThemeFont}
          themeFont={themeFont}
          fontConstants={ThemeSettings.font}
        />
      </div>
    </>
  )
}

export default ThemeCustomizer

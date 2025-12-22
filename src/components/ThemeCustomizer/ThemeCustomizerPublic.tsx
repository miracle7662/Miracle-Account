import { ThemeSettings } from '@/common/context'
import ColorScheme from './ColorScheme'
import ContentSkin from './ContentSkin'
import SkinMode from './SkinMode'
import ThemeFont from './ThemeFont'
import useThemeCustomizer from './useThemeCustomizer'

const ThemeCustomizerPublic = () => {
  const {
    colorScheme,
    skinMode,
    themeFont,
    contentSkin,
    handleChangeColorScheme,
    handleChangeSkinMode,
    handleChangeThemeFont,
    handleChangeContentSkin,
  } = useThemeCustomizer()

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
        <ContentSkin
          handleChangeContentSkin={handleChangeContentSkin}
          contentSkin={contentSkin}
          contentConstants={ThemeSettings.layout.contentSkin}
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

export default ThemeCustomizerPublic

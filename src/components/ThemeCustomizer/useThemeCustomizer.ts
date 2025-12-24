import { ThemeSettings, useThemeContext } from '@/common/context'
import { useViewport } from '@/hooks'

export default function useThemeCustomizer() {
  const { settings, updateSettings, updateLayout, updateHeader, updateSidebar } = useThemeContext()
  const colorScheme = settings.color
  const navigationType = settings.layout.type
  const skinMode = settings.theme
  const themeFont = settings.font
  const contentLayout = settings.layout.mode
  const headerSkin = settings.header.theme
  const navigationSkin = settings.sidebar.theme
  const navigationMenu = settings.sidebar.menu
  const sidenavType = settings.sidebar.size
  const contentSkin = settings.layout.contentSkin
  const { width } = useViewport()

  const handleChangeColorScheme = (color: string) => {
    switch (color) {
      case 'success':
        updateSettings({ color: ThemeSettings.color.success })
        break
      case 'warning':
        updateSettings({ color: ThemeSettings.color.warning })
        break
      case 'info':
        updateSettings({ color: ThemeSettings.color.info })
        break
      case 'danger':
        updateSettings({ color: ThemeSettings.color.danger })
        break
      case 'secondary':
        updateSettings({ color: ThemeSettings.color.secondary })
        break
      default:
        updateSettings({ color: ThemeSettings.color.primary })
        break
    }
  }

  const handleChangeNavigationType = (type: string) => {
    switch (type) {
      case 'horizontal':
        updateLayout({ type: ThemeSettings.layout.type.horizontal })
        break
      default:
        updateLayout({ type: ThemeSettings.layout.type.vertical })
        break
    }
  }

  const handleChangeContentLayout = (width: string) => {
    switch (width) {
      case 'fluid':
        updateLayout({ mode: ThemeSettings.layout.mode.fluid })
        break
      default:
        updateLayout({ mode: ThemeSettings.layout.mode.boxed })
        break
    }
  }

  const handleChangeSkinMode = (theme: string) => {
    switch (theme) {
      case 'dark':
        updateSettings({ theme: ThemeSettings.theme.dark })
        break
      default:
        updateSettings({ theme: ThemeSettings.theme.light })
        break
    }
  }

  const handleChangeSidenavType = (type: string) => {
    switch (type) {
      case 'fullscreen':
        updateSidebar({ size: ThemeSettings.sidebar.size.fullscreen })
        break
      case 'full':
        updateSidebar({ size: ThemeSettings.sidebar.size.full })
        break
      case 'iconbar':
        updateSidebar({ size: ThemeSettings.sidebar.size.iconbar })
        break
      case 'compact':
        updateSidebar({ size: ThemeSettings.sidebar.size.compact })
        break
      case 'detach':
        updateSidebar({ size: ThemeSettings.sidebar.size.detach })
        break
      default:
        updateSidebar({ size: ThemeSettings.sidebar.size.default })
        break
    }
  }

  const handleChangeNavigationSkin = (theme: string) => {
    switch (theme) {
      case 'light':
        updateSidebar({ theme: ThemeSettings.sidebar.theme.light })
        break
      case 'dark':
        updateSidebar({ theme: ThemeSettings.sidebar.theme.dark })
        break
      case 'brand':
        updateSidebar({ theme: ThemeSettings.sidebar.theme.brand })
        break
      case 'transparent':
        updateSidebar({ theme: ThemeSettings.sidebar.theme.transparent })
        break
      default:
        updateSidebar({ theme: ThemeSettings.sidebar.theme.light })
        break
    }
  }

  const handleChangeNavigationMenu = (menu: string) => {
    switch (menu) {
      case 'soft':
        updateSidebar({ menu: ThemeSettings.sidebar.menu.soft })
        break
      case 'solid':
        updateSidebar({ menu: ThemeSettings.sidebar.menu.solid })
        break
      default:
        updateSidebar({ menu: ThemeSettings.sidebar.menu.soft })
        break
    }
  }

  const handleChangeHeaderSkin = (value: string) => {
    switch (value) {
      case 'dark':
        updateHeader({ theme: ThemeSettings.header.theme.dark })
        break
      default:
        updateHeader({ theme: ThemeSettings.header.theme.light })
        break
    }
  }

  const handleChangeContentSkin = (position: string) => {
    switch (position) {
      case 'default':
        updateLayout({
          contentSkin: ThemeSettings.layout.contentSkin.default,
        })
        break
      case 'smooth':
        updateLayout({
          contentSkin: ThemeSettings.layout.contentSkin.smooth,
        })
        break
      case 'shadow':
        updateLayout({
          contentSkin: ThemeSettings.layout.contentSkin.shadow,
        })
        break
      case 'border':
        updateLayout({
          contentSkin: ThemeSettings.layout.contentSkin.border,
        })
        break
      case 'modern':
        updateLayout({
          contentSkin: ThemeSettings.layout.contentSkin.modern,
        })
        break
      case 'creative':
        updateLayout({
          contentSkin: ThemeSettings.layout.contentSkin.creative,
        })
        break
      default:
        updateLayout({ contentSkin: ThemeSettings.layout.contentSkin.modern })
        break
    }
  }

  const handleChangeThemeFont = (font: string) => {
    switch (font) {
      case 'inter':
        updateSettings({ font: ThemeSettings.font.inter })
        break
      default:
        updateSettings({ font: ThemeSettings.font.public })
        break
    }
  }

  const reset = () => {
    updateSettings({
      color: ThemeSettings.color.primary,
      layout: {
        type: ThemeSettings.layout.type.vertical,
        mode: ThemeSettings.layout.mode.boxed,
        contentSkin: ThemeSettings.layout.contentSkin.modern,
      },
      theme: ThemeSettings.theme.light,
      font: ThemeSettings.font.public,
      header: {
        theme: ThemeSettings.header.theme.light,
        logo: ThemeSettings.header.logo.show,
      },
      sidebar: {
        theme: ThemeSettings.sidebar.theme.light,
        menu: ThemeSettings.sidebar.menu.soft,
        size:
          width < 992
            ? ThemeSettings.sidebar.size.full
            : width < 1200
              ? ThemeSettings.sidebar.size.iconbar
              : ThemeSettings.sidebar.size.default,
      },
      customizer: ThemeSettings.customizer.show,
    })
  }

  return {
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
    reset,
  }
}

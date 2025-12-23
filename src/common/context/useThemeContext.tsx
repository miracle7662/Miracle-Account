import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<any>({})

export const ThemeSettings = {
  color: {
    primary: 'primary',
    success: 'success',
    warning: 'warning',
    info: 'info',
    danger: 'danger',
    secondary: 'secondary',
  },
  layout: {
    type: { vertical: 'vertical', horizontal: 'horizontal' },
    mode: { fluid: 'fluid', boxed: 'boxed' },
    contentSkin: {
      default: 'default',
      smooth: 'smooth',
      shadow: 'shadow',
      border: 'border',
      modern: 'modern',
      creative: 'creative',
    },
  },
  theme: { light: 'light', dark: 'dark' },
  font: { public: 'public', inter: 'inter' },
  header: {
    theme: { light: 'light', dark: 'dark' },
    logo: { hidden: 'fullscreen', show: '' },
  },
  sidebar: {
    theme: { light: 'light', dark: 'dark', brand: 'brand', transparent: 'transparent' },
    menu: { soft: 'soft', solid: 'solid' },
    size: {
      default: 'default',
      compact: 'compact',
      iconbar: 'iconbar',
      detach: 'detach',
      showOnHover: 'sm-hover',
      full: 'full',
      fullscreen: 'fullscreen',
    },
  },
  customizer: { show: true, hidden: false },
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within an ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())

  const getDefaultSettings = () => {
    return {
      color: ThemeSettings.color.primary,
      layout: {
        type:
          params['layout_type'] === 'horizontal'
            ? ThemeSettings.layout.type.horizontal
            : ThemeSettings.layout.type.vertical,
        mode:
          params['layout_mode'] === 'fluid'
            ? ThemeSettings.layout.mode.fluid
            : ThemeSettings.layout.mode.boxed,
        contentSkin: ThemeSettings.layout.contentSkin.modern,
      },
      header: {
        theme:
          params['header_theme'] === 'dark'
            ? ThemeSettings.header.theme.dark
            : ThemeSettings.header.theme.light,
        logo: ThemeSettings.header.logo.show,
      },
      sidebar: {
        theme:
          params['menu_theme'] === 'dark'
            ? ThemeSettings.sidebar.theme.dark
            : ThemeSettings.sidebar.theme.light,
        size: ThemeSettings.sidebar.size.default,
        menu:
          params['menu_item'] === 'solid'
            ? ThemeSettings.sidebar.menu.solid
            : ThemeSettings.sidebar.menu.soft,
      },
      theme: params['theme_mode'] === 'dark' ? ThemeSettings.theme.dark : ThemeSettings.theme.light,
      font: params['theme_font'] === 'inter' ? ThemeSettings.font.inter : ThemeSettings.font.public,
      customizer: ThemeSettings.customizer.hidden,
    }
  }

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('themeSettings')
    return savedSettings ? JSON.parse(savedSettings) : getDefaultSettings()
  })

  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = useCallback(
    (newSettings: any) => {
      setSettings((prev: any) => ({
        ...(prev ?? {}),
        ...(newSettings ?? {}),
      }))
    },
    [setSettings],
  )

  const updateLayout = useCallback(
    (newLayout: any) => {
      setSettings((prev: any) => ({
        ...(prev ?? {}),
        layout: { ...(prev ?? {}).layout, ...(newLayout ?? {}) },
      }))
    },
    [setSettings],
  )

  const updateHeader = useCallback(
    (newHeader: any) => {
      setSettings((prev: any) => ({
        ...(prev ?? {}),
        header: { ...(prev ?? {}).header, ...(newHeader ?? {}) },
      }))
    },
    [setSettings],
  )

  const updateSidebar = useCallback(
    (newSidebar: any) => {
      setSettings((prev: any) => ({
        ...(prev ?? {}),
        sidebar: { ...(prev ?? {}).sidebar, ...(newSidebar ?? {}) },
      }))
    },
    [setSettings],
  )

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateSettings,
        updateLayout,
        updateHeader,
        updateSidebar,
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

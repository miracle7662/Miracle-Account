import { ThemeSettings, useThemeContext } from '@/common/context'

const DarkLight = () => {
  const toggleDarkMode = () => {
    if (settings.theme === 'dark') {
      updateSettings({ theme: ThemeSettings.theme.light })
    } else {
      updateSettings({ theme: ThemeSettings.theme.dark })
    }
  }

  const { settings, updateSettings } = useThemeContext()
  return (
    <div>
      <div className="header-btn">
        <div id="light-dark-mode" onClick={toggleDarkMode}>
          <i className="dark-light-icon-toggle fi fi-rr-moon fs-20" />
        </div>
      </div>
    </div>
  )
}

export default DarkLight

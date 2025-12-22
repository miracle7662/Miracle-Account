import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'   // IMPORTANT for Electron builds

import './i18n'
import App from './App'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <HashRouter>
      <App />
    </HashRouter>
  )
}

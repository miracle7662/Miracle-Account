import configureBackend from './common/api/backend'
import { AuthProvider, ThemeProvider } from './common/context'
import ThemeRoutes from './routes/Routes'


// Flaticons
import './../node_modules/@flaticon/flaticon-uicons/css/all/all.css'

// Theme.scss
import './assets/scss/theme.scss'

configureBackend()

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemeRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

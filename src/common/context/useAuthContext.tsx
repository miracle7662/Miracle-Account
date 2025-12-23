import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
  Suspense,
} from 'react'
import { Preloader, PreloaderFull } from '@/components/Misc/Preloader'
import { getCurrentUser, refreshToken } from '@/common/api/auth'

type User = {
  id: number
  username: string
  email?: string
  password: string
  name: string
  role: string
  token: string
  outletid?: number
  hotelid?: number
  companyName?: string
  year?: string
}

const AuthContext = createContext<any>({})

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
const authSessionKey = 'WINDOW_AUTH_SESSION'



export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(
    localStorage.getItem(authSessionKey)
      ? JSON.parse(localStorage.getItem(authSessionKey) || '{}')
      : undefined,
  )

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const saveSession = useCallback(
    (user: User) => {
      sessionStorage.setItem(authSessionKey, JSON.stringify(user))
      localStorage.setItem(authSessionKey, JSON.stringify(user))
      setUser(user)
    },
    [setUser],
  )

  const removeSession = useCallback(() => {
    sessionStorage.removeItem(authSessionKey)
    localStorage.removeItem(authSessionKey)
    setUser(undefined)

    // Clear refresh interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current)
      refreshIntervalRef.current = null
    }
  }, [setUser])

  const handleTokenRefresh = useCallback(async () => {
    if (!user?.token) return

    try {
      const refreshResponse = await refreshToken(user.token)
      if (refreshResponse.token) {
        // Update user with new token
        const updatedUser = { ...user, token: refreshResponse.token }
        saveSession(updatedUser)
        console.log('Token refreshed successfully')
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      // If refresh fails, logout the user
      removeSession()
    }
  }, [user, saveSession, removeSession])

  const startTokenRefresh = useCallback(() => {
    // Clear any existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current)
    }

    // Set up automatic refresh every 23 hours (23 * 60 * 60 * 1000 ms)
    refreshIntervalRef.current = setInterval(() => {
      handleTokenRefresh()
    }, 23 * 60 * 60 * 1000)
  }, [handleTokenRefresh])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem(authSessionKey)
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser && parsedUser.token) {
            const currentUser = await getCurrentUser(parsedUser.token)
            saveSession({ ...currentUser, token: parsedUser.token })

            // Start token refresh cycle
            startTokenRefresh()
          } else {
            removeSession()
          }
        } catch (error) {
          removeSession()
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [saveSession, removeSession, startTokenRefresh])

  // Start refresh cycle when user logs in
  useEffect(() => {
    if (user && !refreshIntervalRef.current) {
      startTokenRefresh()
    }
  }, [user, startTokenRefresh])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [])

  return (
    <>
      {loading ? (
        <PreloaderFull />
      ) : (
        <Suspense fallback={<Preloader />}>
          <AuthContext.Provider
            value={{
              user,
              isAuthenticated: Boolean(user),
              saveSession,
              removeSession,
            }}
          >
            {children}
          </AuthContext.Provider>
        </Suspense>
      )}
    </>
  )
}

export default AuthProvider
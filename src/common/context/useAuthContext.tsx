import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Suspense,
} from 'react'
import { Preloader, PreloaderFull } from '@/components/Misc/Preloader'
import { getCurrentUser } from '@/common/api/auth'

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
  companyid?: number
  yearid?: number
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
  }, [setUser])

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
  }, [saveSession, removeSession])

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
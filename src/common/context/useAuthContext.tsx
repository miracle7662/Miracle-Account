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

  const [companyid, setCompanyid] = useState<number | null>(
    localStorage.getItem('selected_companyid')
      ? parseInt(localStorage.getItem('selected_companyid') || '0')
      : null,
  )

  const [yearid, setYearid] = useState<number | null>(
    localStorage.getItem('selected_yearid')
      ? parseInt(localStorage.getItem('selected_yearid') || '0')
      : null,
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
    localStorage.removeItem('selected_companyid')
    localStorage.removeItem('selected_yearid')
    setUser(undefined)
    setCompanyid(null)
    setYearid(null)
  }, [setUser])

  const saveCompanyYear = useCallback(
    (companyId: number, yearId: number) => {
      localStorage.setItem('selected_companyid', companyId.toString())
      localStorage.setItem('selected_yearid', yearId.toString())
      setCompanyid(companyId)
      setYearid(yearId)
    },
    [],
  )

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
              companyid,
              yearid,
              isAuthenticated: Boolean(user),
              saveSession,
              removeSession,
              saveCompanyYear,
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
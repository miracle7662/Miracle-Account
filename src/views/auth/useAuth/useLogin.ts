import { useAuthContext } from '@/common'
import { loginUserWithEmail, loginUserWithUsername } from '@/common/api/auth'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function useLogin() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const { isAuthenticated, saveSession } = useAuthContext()

  const redirectUrl = useMemo(
    () => (location.state && location.state.from ? location.state.from.pathname : '/'),
    [location.state],
  )

  const loginWithEmail = async (
    event: React.FormEvent<HTMLFormElement>,
    { email, password }: { email: string; password: string },
  ) => {
    event.preventDefault()
    setLoading(true)

    try {
      const res: any = await loginUserWithEmail(email, password)

      setLoading(false)
      toast.success('Login successful!')

      setTimeout(() => {
        if (res.token) {
          saveSession(res)
        }
      }, 1500)
    } catch (error) {
      setLoading(false)
      toast.error('Invalid email or password!')
    }
  }

  const loginWithUsername = async (
    event: React.FormEvent<HTMLFormElement>,
    { username, password, company, year }: { username: string; password: string; company?: string; year?: string },
  ) => {
    event.preventDefault()
    setLoading(true)

    try {
      const res: any = await loginUserWithUsername(username, password, company, year)

      setLoading(false)
      toast.success('Login successful!')

      setTimeout(() => {
        if (res.token) {
          saveSession(res)
          navigate('/auth/company-selection')
        }
      }, 1500)
    } catch (error) {
      setLoading(false)
      toast.error('Invalid username or password!')
    }
  }

  return { loading, loginWithEmail, loginWithUsername, redirectUrl, isAuthenticated }
}

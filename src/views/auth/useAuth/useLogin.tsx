import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'

interface LoginResponse {
  token: string
  user: any
  company?: string
  year?: string
}

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Get redirect URL from location state or default to dashboard
  const redirectUrl = (location.state as any)?.from?.pathname || '/'

  const saveSession = (data: LoginResponse) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    if (data.company) localStorage.setItem('company', data.company)
    if (data.year) localStorage.setItem('year', data.year)
  }

  const loginUserWithUsername = async (
    username: string,
    password: string,
    company?: string,
    year?: string,
  ): Promise<LoginResponse> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, company, year }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return data
  }

  const initialLoginWithUsername = async (
    event: React.FormEvent<HTMLFormElement>,
    { username, password }: { username: string; password: string },
  ) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/initial-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      setLoading(false)

      if (response.ok) {
        // Store temp data for company/year selection
        sessionStorage.setItem('tempUserData', JSON.stringify(data.userData))
        sessionStorage.setItem('tempPassword', password)

        toast.success('Credentials verified!')

        setTimeout(() => {
          navigate('/auth/company-selector', {
            state: {
              companies: data.companies,
              years: data.years,
              username: username
            }
          })
        }, 1500)
      } else {
        toast.error(data.message || 'Invalid username or password!')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Network error occurred')
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
          navigate(redirectUrl)
        }
      }, 1500)
    } catch (error) {
      setLoading(false)
      toast.error('Invalid username or password!')
    }
  }

  return {
    loading,
    initialLoginWithUsername,
    loginWithUsername,
    saveSession,
  }
}

export default useLogin

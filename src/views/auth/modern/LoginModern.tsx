import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthContext } from '@/common'
import { Button, Form, Stack } from 'react-bootstrap'
import TitleHelmet from '@/components/Common/TitleHelmet'
import useLogin from '../useAuth/useLogin'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthModern from './AuthModern'

const LoginModern = () => {
  const { removeSession } = useAuthContext()
  const { loading,  loginWithUsername, redirectUrl, isAuthenticated } = useLogin()
  const [email, setEmail] = useState<string>('admin')
  const [password, setPassword] = useState<string>('admin123')
  const [company, setCompany] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [companies, setCompanies] = useState<any[]>([])
  const [years, setYears] = useState<any[]>([])
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [companyError, setCompanyError] = useState<string | null>(null)
  const [yearError, setYearError] = useState<string | null>(null)

  useEffect(() => {
    removeSession()
    // Fetch companies
    fetch('/api/companymaster')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => setCompanies(data))
      .catch(err => console.error('Error fetching companies:', err.message))

    // Fetch years
    fetch('/api/yearmaster')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => setYears(data))
      .catch(err => console.error('Error fetching years:', err.message))
  }, [removeSession])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const validateEmail = (input: string) => {
    if (!input) {
      setEmailError('Email is required')
      return false
    } else {
      setEmailError(null)
      return true
    }
  }

  const validatePassword = (input: string) => {
    if (!input) {
      setPasswordError('Password is required')
      return false
    } else {
      setPasswordError(null)
      return true
    }
  }

  const validateCompany = (input: string) => {
    if (!input) {
      setCompanyError('Company is required')
      return false
    } else {
      setCompanyError(null)
      return true
    }
  }

  const validateYear = (input: string) => {
    if (!input) {
      setYearError('Year is required')
      return false
    } else {
      setYearError(null)
      return true
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    const isCompanyValid = validateCompany(company)
    const isYearValid = validateYear(year)

    if (isEmailValid && isPasswordValid && isCompanyValid && isYearValid) {
      loginWithUsername(e, { username: email, password, company, year })
    }
  }

  return (
    <>
      <TitleHelmet title="Login Modern" />
      <AuthLayout>
        <AuthModern>
          {isAuthenticated && <Navigate to={redirectUrl} replace />}
          <div className="mb-12">
            <h4 className="fw-bold mb-3">Login to your account</h4>
            <p className="fs-16 lead">Hey, Enter your details to get login to your account.</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  validateEmail(e.target.value)
                }}
                isInvalid={!!emailError}
                required
              />
              <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value)
                  validateCompany(e.target.value)
                }}
                isInvalid={!!companyError}
                required
              >
                <option value="">Select Company</option>
                {companies.map((comp) => (
                  <option key={comp.companyid} value={comp.companyid}>
                    {comp.company_name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{companyError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value)
                  validateYear(e.target.value)
                }}
                isInvalid={!!yearError}
                required
              >
                <option value="">Select Year</option>
                {years.map((yr) => (
                  <option key={yr.yearid} value={yr.yearid}>
                    {yr.Year}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{yearError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  validatePassword(e.target.value)
                }}
                isInvalid={!!passwordError}
                required
              />
              <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
              <span
                className="btn btn-icon position-absolute translate-middle top-50"
                style={{ right: '-1rem' }}
                onClick={togglePasswordVisibility}
              >
                <i className={`fi ${showPassword ? 'fi-rr-eye-crossed' : 'fi-rr-eye'}`}></i>
              </span>
            </Form.Group>
            <Stack direction="horizontal">
              <Form.Check type="checkbox" id="check-api-checkbox">
                <Form.Check.Input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <Form.Check.Label>Remember me</Form.Check.Label>
              </Form.Check>
              <Link to="/auth/modern/forgot-password" className="link-primary ms-auto">
                Forgot password?
              </Link>
            </Stack>
            <div className="d-grid gap-2 my-4">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={loading}
                className="text-white"
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
            <div>
              Don't have an account? <Link to="/auth/modern/register">Create an Account</Link>
            </div>
            <div className="mt-12 mb-6 border-bottom position-relative">
              <span className="small py-1 px-3 text-uppercase text-muted bg-body-tertiary rounded position-absolute translate-middle start-50">
                or
              </span>
            </div>
            <div className="d-grid flex-wrap d-sm-flex gap-2">
              <Button variant="neutral" className="px-3 flex-fill">
                <i className="fi fi-brands-google"></i>
                <span className="ms-2">Login with Google</span>
              </Button>
              <Button variant="neutral" className="px-3 flex-fill">
                <i className="fi fi-brands-facebook"></i>
                <span className="ms-2">Login with Facebook</span>
              </Button>
            </div>
          </Form>
        </AuthModern>
      </AuthLayout>
    </>
  )
}

export default LoginModern

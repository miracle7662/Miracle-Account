import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthContext } from '@/common'
import { Button, Form, Stack } from 'react-bootstrap'
import TitleHelmet from '@/components/Common/TitleHelmet'
import useLogin from '../useAuth/useLogin'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthClassic from './AuthClassic'
import { useTranslation } from 'react-i18next'

const LoginClassic = () => {
  const { t } = useTranslation()
  const { removeSession } = useAuthContext()
  const { loading, loginWithEmail, isAuthenticated } = useLogin()
  const [email, setEmail] = useState<string>('superadmin')
  const [password, setPassword] = useState<string>('superadmin123')
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  useEffect(() => {
    removeSession()
  }, [removeSession])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const validateEmail = (input: string) => {
    if (!input) {
      setEmailError(t('login.email_required'))
      return false
    } else {
      setEmailError(null)
      return true
    }
  }

  const validatePassword = (input: string) => {
    if (!input) {
      setPasswordError(t('login.password_required'))
      return false
    } else {
      setPasswordError(null)
      return true
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (isEmailValid && isPasswordValid) {
      loginWithEmail(e, { email, password })
    }
  }

  return (
    <>
      <TitleHelmet title="Login Classic" />
      <AuthLayout>
        <AuthClassic>
          {isAuthenticated && <Navigate to="/auth/company-selection" replace />}
          <div className="mb-12">
            <h4 className="fw-bold mb-3">{t('login.login_title')}</h4>
            <p className="fs-16 lead">{t('login.login_subtitle')}</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
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
                <Form.Check.Label>{t('login.remember_me')}</Form.Check.Label>
              </Form.Check>
              <Link to="/auth/classic/forgot-password" className="link-primary ms-auto">
                {t('login.forgot_password')}
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
              {t('login.no_account_text')} <Link to="/auth/classic/register">{t('login.create_account_link')}</Link>
            </div>
            <div className="mt-12 mb-6 border-bottom position-relative">
              <span className="small py-1 px-3 text-uppercase text-muted bg-body-tertiary rounded position-absolute translate-middle start-50">
                {t('login.or_separator')}
              </span>
            </div>
            <div className="d-grid flex-wrap d-sm-flex gap-2">
              <Button variant="neutral" className="px-3 flex-fill">
                <i className="fi fi-brands-google"></i>
                <span className="ms-2">{t('login.login_with_google')}</span>
              </Button>
              <Button variant="neutral" className="px-3 flex-fill">
                <i className="fi fi-brands-facebook"></i>
                <span className="ms-2">{t('login.login_with_facebook')}</span>
              </Button>
            </div>
          </Form>
        </AuthClassic>
      </AuthLayout>
    </>
  )
}

export default LoginClassic

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Button, Form } from 'react-bootstrap'
import TitleHelmet from '@/components/Common/TitleHelmet'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthClassic from './AuthClassic'

const generatePassword = (length: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~@#$%^&*(){}[]'
  let newPassword = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    newPassword += charset.charAt(randomIndex)
  }
  return newPassword
}

const ResetPasswordClassic = () => {
  const [newPassword, setNewPassword] = useState<string>(generatePassword(0))
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleGeneratePassword = () => {
    setNewPassword(generatePassword(16))
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Password reset successful!')
      setTimeout(() => {
        navigate('/auth/classic/login')
      }, 2000)
    }, 1000)
  }

  return (
    <>
      <TitleHelmet title="Reset Password" />
      <AuthLayout>
        <AuthClassic>
          <div className="mb-12">
            <h4 className="fw-bold mb-3">Reset Password</h4>
            <p className="fs-16 lead">
              Enter your email and a reset link will sent to you, let's access our the best
              recommendation for you.
            </p>
          </div>
          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="btn btn-icon position-absolute translate-middle top-50"
                style={{ right: '1rem' }}
                onClick={handleTogglePasswordVisibility}
              >
                <i className={`fi ${showPassword ? 'fi-rr-eye-crossed' : 'fi-rr-eye'}`}></i>
              </span>
              <span
                className="btn btn-icon position-absolute translate-middle top-50"
                style={{ right: '-1rem' }}
                onClick={handleGeneratePassword}
              >
                <i className="fi fi-rr-magic-wand"></i>
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
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
                  'Reset Password'
                )}
              </Button>
            </div>
          </Form>
          <div>
            Don't have an account? <Link to="/auth/classic/register">Create an Account</Link>
          </div>
        </AuthClassic>
      </AuthLayout>
    </>
  )
}

export default ResetPasswordClassic

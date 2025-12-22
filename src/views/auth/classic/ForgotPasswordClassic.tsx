import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import TitleHelmet from '@/components/Common/TitleHelmet'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthClassic from './AuthClassic'

const ForgotPasswordClassic = () => {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast(() => (
        <span>
          🤖 Reset link sent to: <span className="fw-semibold text-black">{email}</span>
        </span>
      ))
    }, 2000)
  }

  return (
    <>
      <TitleHelmet title="Forgot Password" />
      <AuthLayout>
        <AuthClassic>
          <div className="mb-12">
            <h4 className="fw-bold mb-3">Forgot Password</h4>
            <p className="fs-16 lead">
              If you forgot your password, well, then we'll email you instructions to reset your
              password.
            </p>
          </div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div>
              <Link to="/auth/classic/login" className="link-primary">
                Return to login
              </Link>
            </div>
          </Form>
        </AuthClassic>
      </AuthLayout>
    </>
  )
}

export default ForgotPasswordClassic

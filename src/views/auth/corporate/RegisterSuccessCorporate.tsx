import { Link, useLocation } from 'react-router-dom'
import TitleHelmet from '@/components/Common/TitleHelmet'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthCorporate from './AuthCorporate'

const RegisterSuccessCorporate = () => {
  const location = useLocation()
  const { username, email, password } = location.state || {}

  return (
    <>
      <TitleHelmet title="Register Success Corporate" />

      <AuthLayout>
        <AuthCorporate>
          <div className="mb-6">
            <h4 className="fw-bold mb-3 text-success d-flex align-items-center gap-2">
              <i className="fi fi-br-shield-check fs-24"></i> Register Success
            </h4>
            <p className="fs-16 lead mb-4">
              Thank you for submitting the form. You can now sign in with your username or email and
              password.
            </p>
            <div>
              <p>
                Username: <span className="fw-semibold text-dark">{username}</span>
              </p>
              <p>
                Email: <span className="fw-semibold text-dark">{email}</span>
              </p>
              <p>
                Password: <span className="fw-semibold text-dark">{password}</span>
              </p>
            </div>
          </div>
          <Link to="/auth/corporate/login" className="btn btn-primary">
            Return to login
          </Link>
        </AuthCorporate>
      </AuthLayout>
    </>
  )
}

export default RegisterSuccessCorporate

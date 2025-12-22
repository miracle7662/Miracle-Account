import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import TitleHelmet from '@/components/Common/TitleHelmet'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthMinmal from './AuthMinmal'

const TwoFactorOTP: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [resendCount, setResendCount] = useState<number>(0)
  const navigate = useNavigate()

  const handleOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (otp.every((digit) => digit !== '')) {
      const enteredOtp = otp.join('')

      if (enteredOtp === '123456') {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          toast.success('Verification successful!')
          setTimeout(() => {
            navigate('/')
          }, 3000)
        }, 1000)
      } else {
        toast.error('Incorrect OTP. Please try again.')
      }
    } else {
      toast.error('Please fill in all OTP digits.')
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
    }
  }

  const handleResend = () => {
    if (resendCount < 2) {
      setResendCount((prevCount) => prevCount + 1)
      toast.success('New OTP sent!')
    } else {
      toast.error('Resend limit reached. Please wait.')
    }
  }

  return (
    <>
      <TitleHelmet title="Verify OTP" />
      <AuthLayout>
        <AuthMinmal>
          <div className="mb-12">
            <h4 className="fw-bold mb-3">Two Step Verify (OTP)</h4>
            <p className="fs-16 lead">
              Please enter the code generated one-time password to verify your account ownership.
            </p>
          </div>
          <Stack direction="horizontal" className="mb-12">
            <p className="mb-0">
              <span className="fw-medium mb-1 d-block">A code has been sent to: </span>
              <strong>+1(375)*****9897</strong>
            </p>
            <Link to="#!" className="ms-auto link-primary badge fs-11 bg-secondary-subtle">
              Change Methord
            </Link>
          </Stack>
          <Form onSubmit={handleOTP}>
            <Form.Text className="text-muted">Use Code: 123456</Form.Text>
            <Stack direction="horizontal" gap={2} className="flex-row justify-content-center mt-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  className="text-center form-control rounded"
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
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
                    Validating...
                  </>
                ) : (
                  'Validate'
                )}
              </Button>
            </div>
            <div className="mt-5 text-muted">
              <span>Didn't get the code </span>
              {resendCount < 3 && (
                <a href="javascript:void(0);" onClick={handleResend}>
                  Resend ({resendCount + 1}/3)
                </a>
              )}
            </div>
          </Form>
        </AuthMinmal>
      </AuthLayout>
    </>
  )
}

export default TwoFactorOTP

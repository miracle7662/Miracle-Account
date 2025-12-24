import { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import ErrorLayout from './ErrorLayout'
import CountdownTimer from './Countdown/countdownTimer'
import TitleHelmet from '@/components/Common/TitleHelmet'

const socialMediaIcons = [
  { iconClass: 'fi fi-brands-facebook' },
  { iconClass: 'fi fi-brands-twitter' },
  { iconClass: 'fi fi-brands-instagram' },
  { iconClass: 'fi fi-brands-linkedin' },
  { iconClass: 'fi fi-brands-twitter-alt' },
]

const ComingSoon = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      setEmailError('Email is required')
      return
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setEmailError('')
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast.success('We have received your request. You will be notified once we go live.')
    }, 2000)
  }

  return (
    <>
      <TitleHelmet title="Comming Soon" />
      <ErrorLayout>
        <div className="mb-16 mb-md-24">
          <CountdownTimer />
        </div>
        <div className="my-8">
          <h3 className="fw-bold mb-3">We're launching soon</h3>
          <p className="fs-16 lead">
            We're creating something awesome. Please subscribe to get notified when it's ready!
          </p>
        </div>
        <div className="mb-8 text-start">
          <Stack direction="horizontal" gap={2} className="justify-content-center">
            <Form className="w-100">
              <Form.Control
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError('')
                }}
                onBlur={() => {
                  if (!email) {
                    setEmailError('Email is required')
                  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setEmailError('Please enter a valid email address')
                  }
                }}
              />
            </Form>
            <Button onClick={handleSubscribe} disabled={loading} className="text-white">
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ width: '1.25rem', height: '1.25rem' }}
                  ></span>
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </Stack>
          {emailError && <div className="fs-13 text-danger mt-1">{emailError}</div>}
        </div>
        <Stack gap={1} direction="horizontal" className="justify-content-center">
          {socialMediaIcons.map((icon, index) => (
            <Button key={index} variant="" className="btn-icon btn-md">
              <i className={icon.iconClass}></i>
            </Button>
          ))}
        </Stack>
      </ErrorLayout>
    </>
  )
}

export default ComingSoon

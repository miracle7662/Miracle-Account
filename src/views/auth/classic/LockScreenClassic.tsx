import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import TitleHelmet from '@/components/Common/TitleHelmet'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import avatar from '@/assets/images/avatars/1.png'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthClassic from './AuthClassic'

const LockScreenClassic = () => {
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [attempts, setAttempts] = useState<number>(0)
  const navigate = useNavigate()

  const correctPasswordOrPin = '1234'

  const handleUnlock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

      if (password === correctPasswordOrPin) {
        toast.success('Unlock successful!')
        setTimeout(() => {
          navigate('/user-profile/overview')
        }, 3000)
      } else {
        setAttempts((prevAttempts) => prevAttempts + 1)

        if (attempts >= 3) {
          toast.error('Maximum unlock attempts reached. Please try again later.')
        } else {
          toast.error('Incorrect password or pin. Please try again.')
        }
      }
    }, 2000)
  }

  return (
    <>
      <TitleHelmet title="Lock Screen Classic" />
      <AuthLayout>
        <AuthClassic>
          <Stack direction="horizontal" gap={3} className="mb-12">
            <Avatar
              type="image"
              src={avatar}
              alt="User Avatar"
              className="avatar avatar-xl border border-4"
            />
            <div>
              <h6 className="fw-semibold mb-1">Alexndra Della</h6>
              <p className="fw-light text-muted mb-0">alex.della@outlook.com</p>
            </div>
          </Stack>
          <div className="mb-12">
            <h4 className="fw-bold mb-3">Unlock your account</h4>
            <p className="fs-16 lead">
              Enter your password or pin to unlock the screen! Let's access our the best
              recommendation for you.
            </p>
          </div>
          <Form onSubmit={handleUnlock}>
            <Form.Text className="text-muted">Use Code: 1234</Form.Text>
            <Form.Group className="mb-3 mt-2">
              <Form.Control
                type="password"
                placeholder="Password or PIN"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    Unlocking...
                  </>
                ) : (
                  'Unlock'
                )}
              </Button>
            </div>
            <Stack direction="horizontal">
              <div>
                <span>Not you? </span>
                <Link to="/auth/classic/login" className="link-primary">
                  Return to login
                </Link>
              </div>
              <Link to="/auth/classic/forgot-password" className="ms-auto">
                Forgot <span className="text-primary">PIN/Pass</span>?
              </Link>
            </Stack>
          </Form>
        </AuthClassic>
      </AuthLayout>
    </>
  )
}

export default LockScreenClassic

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/common'
import { Button, Form, Card } from 'react-bootstrap'
import TitleHelmet from '@/components/Common/TitleHelmet'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthClassic from './AuthClassic'
import axios from 'axios'

interface Year {
  yearid: number
  Year: string
  Startdate: string
  Enddate: string
}

const YearSelection = () => {
  const { user, saveSession, isAuthenticated } = useAuthContext()
  const [years, setYears] = useState<Year[]>([])
  const [selectedYearId, setSelectedYearId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchYears()
  }, [])

  const fetchYears = async () => {
    try {
      setFetchLoading(true)
      const response = await axios.get('http://localhost:3001/api/auth/years', {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      setYears(response.data)
    } catch (error: any) {
      setError('Failed to fetch years')
      console.error('Error fetching years:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleYearSelect = async () => {
    if (!selectedYearId) {
      setError('Please select a year')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await axios.post('http://localhost:3001/api/auth/select-year', {
        yearid: selectedYearId
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })

      // Update user session with new token and year info
      const updatedUser = {
        ...user,
        ...response.data.year,
        token: response.data.token,
        yearid: response.data.year.yearid,
        year: response.data.year.Year
      }

      saveSession(updatedUser)

    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to select year')
      console.error('Error selecting year:', error)
    } finally {
      setLoading(false)
    }
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/classic/login" replace />
  }

  // Redirect if company not selected
  if (!user?.companyid) {
    return <Navigate to="/auth/company-selection" replace />
  }

  // Redirect if year already selected
  if (user?.yearid) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <TitleHelmet title="Select Year" />
      <AuthLayout>
        <AuthClassic>
          <div className="mb-12">
            <h4 className="fw-bold mb-3">Select Year</h4>
            <p className="fs-16 lead">Choose the financial year you want to work with</p>
          </div>

          <Card className="mb-4">
            <Card.Body>
              {fetchLoading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading years...</span>
                  </div>
                  <p className="mt-2">Loading years...</p>
                </div>
              ) : years.length === 0 ? (
                <div className="text-center text-muted">
                  <p>No years available</p>
                </div>
              ) : (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Financial Year</Form.Label>
                    <Form.Select
                      value={selectedYearId || ''}
                      onChange={(e) => setSelectedYearId(Number(e.target.value))}
                      isInvalid={!!error}
                    >
                      <option value="">Select a year...</option>
                      {years.map((year) => (
                        <option key={year.yearid} value={year.yearid}>
                          {year.Year} ({year.Startdate} - {year.Enddate})
                        </option>
                      ))}
                    </Form.Select>
                    {error && (
                      <Form.Control.Feedback type="invalid">
                        {error}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleYearSelect}
                      disabled={loading || !selectedYearId}
                      className="text-white"
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Selecting...
                        </>
                      ) : (
                        'Continue'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>

          <div className="text-center">
            <small className="text-muted">
              Welcome, {user?.name || user?.username}! Please select your financial year to continue.
            </small>
          </div>
        </AuthClassic>
      </AuthLayout>
    </>
  )
}

export default YearSelection

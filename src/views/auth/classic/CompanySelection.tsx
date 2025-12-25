import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/common'
import { Button, Form, Card } from 'react-bootstrap'
import TitleHelmet from '@/components/Common/TitleHelmet'
import AuthLayout from '@/Layouts/AuthLayout'
import AuthClassic from './AuthClassic'
import axios from 'axios'

interface Company {
  companyid: number
  company_name: string
}

const CompanySelection = () => {
  const { user, saveSession, isAuthenticated } = useAuthContext()
  const [companies, setCompanies] = useState<Company[]>([])
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setFetchLoading(true)
      const response = await axios.get('http://localhost:3001/api/auth/companies', {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      setCompanies(response.data)
    } catch (error: any) {
      setError('Failed to fetch companies')
      console.error('Error fetching companies:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleCompanySelect = async () => {
    if (!selectedCompanyId) {
      setError('Please select a company')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await axios.post('http://localhost:3001/api/auth/select-company', {
        companyid: selectedCompanyId
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })

      // Update user session with new token and company info
      const updatedUser = {
        ...user,
        ...response.data.company,
        token: response.data.token,
        companyid: response.data.company.companyid,
        companyName: response.data.company.company_name
      }

      saveSession(updatedUser)

    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to select company')
      console.error('Error selecting company:', error)
    } finally {
      setLoading(false)
    }
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/classic/login" replace />
  }

  // Redirect if company already selected
  if (user?.companyid) {
    return <Navigate to="/auth/year-selection" replace />
  }

  return (
    <>
      <TitleHelmet title="Select Company" />
      <AuthLayout>
        <AuthClassic>
          <div className="mb-12">
            <h4 className="fw-bold mb-3">Select Company</h4>
            <p className="fs-16 lead">Choose the company you want to work with</p>
          </div>

          <Card className="mb-4">
            <Card.Body>
              {fetchLoading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading companies...</span>
                  </div>
                  <p className="mt-2">Loading companies...</p>
                </div>
              ) : companies.length === 0 ? (
                <div className="text-center text-muted">
                  <p>No companies available</p>
                </div>
              ) : (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Select
                      value={selectedCompanyId || ''}
                      onChange={(e) => setSelectedCompanyId(Number(e.target.value))}
                      isInvalid={!!error}
                    >
                      <option value="">Select a company...</option>
                      {companies.map((company) => (
                        <option key={company.companyid} value={company.companyid}>
                          {company.company_name}
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
                      onClick={handleCompanySelect}
                      disabled={loading || !selectedCompanyId}
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
              Welcome, {user?.name || user?.username}! Please select your company to continue.
            </small>
          </div>
        </AuthClassic>
      </AuthLayout>
    </>
  )
}

export default CompanySelection

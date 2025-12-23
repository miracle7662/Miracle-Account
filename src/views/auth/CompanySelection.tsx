import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Col, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { useAuthContext } from '@/common/context/useAuthContext'
import { getCompanies } from '@/common/api/auth'

const CompanySelection: React.FC = () => {
  const [companies, setCompanies] = useState<any[]>([])
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user, saveSession } = useAuthContext()

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies()
        setCompanies(response.data)
      } catch (err) {
        setError('Failed to load companies')
      }
    }
    fetchCompanies()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCompany || !selectedYear) {
      setError('Please select both company and year')
      return
    }

    setLoading(true)
    try {
      const updatedUser = {
        ...user,
        companyName: selectedCompany,
        year: selectedYear,
      }
      saveSession(updatedUser)
      navigate('/')
    } catch (err) {
      setError('Failed to save selection')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card>
              <CardBody className="p-4">
                <div className="text-center mb-4">
                  <h4 className="text-primary">Select Company & Year</h4>
                  <p className="text-muted">Choose your company and financial year to continue</p>
                </div>

                {error && <Alert color="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="company">Company</Label>
                    <Input
                      type="select"
                      id="company"
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      required
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.name}>
                          {company.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="year">Financial Year</Label>
                    <Input
                      type="select"
                      id="year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </Input>
                  </FormGroup>

                  <Button
                    color="primary"
                    type="submit"
                    block
                    disabled={loading}
                    className="mt-3"
                  >
                    {loading ? 'Saving...' : 'Continue'}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CompanySelection

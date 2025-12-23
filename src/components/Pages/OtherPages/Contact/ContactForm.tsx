import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  [key: string]: string
}

const ContactForm = () => {
  const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const isFormValid =
      Object.values(formErrors).every((error) => !error) &&
      Object.values(formData).every((value) => value !== '')
    setIsFormValid(isFormValid)
  }, [formData, formErrors])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setFormErrors({
      ...formErrors,
      [name]: value === '' ? `${name} is required` : '',
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isFormValid) {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toast.success('Message sent successfully!')
        setFormData(initialFormData)
      } catch (error) {
        toast.error('Error sending the message. Please try again.')
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  return (
    <>
      <Card className="mx-4 mx-md-6 border-0">
        <Card.Body
          className="p-4 p-md-12 p-lg-16 w-100 mx-auto rounded-5 bg-secondary-subtle z-1 shadow-sm border"
          style={{ maxWidth: '768px', marginBottom: '-150px' }}
        >
          <h3>Get in touch</h3>
          <p>Our friendly team would love to hear from you.</p>
          <Form className="mt-12" onSubmit={handleSubmit}>
            <Row className="g-4 mb-4">
              <Col md={6}>
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <div className="fs-12 text-danger">{formErrors.firstName}</div>
              </Col>
              <Col md={6}>
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <div className="fs-12 text-danger">{formErrors.lastName}</div>
              </Col>
              <Col md={6}>
                <Form.Label>Emial</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="fs-12 text-danger">{formErrors.email}</div>
              </Col>
              <Col md={6}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <div className="fs-12 text-danger">{formErrors.phone}</div>
              </Col>
              <Col md={12}>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
                <div className="fs-12 text-danger">{formErrors.subject}</div>
              </Col>
              <Col md={12}>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <div className="fs-12 text-danger">{formErrors.message}</div>
              </Col>
            </Row>
            <Button
              type="submit"
              size="lg"
              className="w-100 text-white"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Toaster position="top-center" />
    </>
  )
}

export default ContactForm

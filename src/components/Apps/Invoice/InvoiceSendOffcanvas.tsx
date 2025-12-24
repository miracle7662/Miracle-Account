import React, { useState } from 'react'
import { Button, Form, Offcanvas, Stack } from 'react-bootstrap'
import toast from 'react-hot-toast'

interface InvoiceOffcanvasProps {
  showSendOptions: boolean
  handleCloseSendOptions: () => void
}

const InvoiceSendOffcanvas: React.FC<InvoiceOffcanvasProps> = ({
  showSendOptions,
  handleCloseSendOptions,
}) => {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [toError, setToError] = useState('')
  const [subjectError, setSubjectError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'to') {
      setTo(value)
      setToError('')
    } else if (name === 'subject') {
      setSubject(value)
      setSubjectError('')
    } else if (name === 'message') {
      setMessage(value)
      setMessageError('')
    }
  }

  const validateForm = () => {
    let valid = true

    if (!to.trim()) {
      setToError('To field is required')
      valid = false
    } else if (!emailRegex.test(to)) {
      setToError('Invalid email address')
      valid = false
    }

    if (!subject.trim()) {
      setSubjectError('Subject field is required')
      valid = false
    }

    if (!message.trim()) {
      setMessageError('Message field is required')
      valid = false
    }

    return valid
  }

  const handleSendClick = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      toast.success('Invoice sent successfully!')
      handleCloseSendOptions()
      resetForm()
    }, 2000)
  }

  const resetForm = () => {
    setTo('')
    setSubject('')
    setMessage('')
    setToError('')
    setSubjectError('')
    setMessageError('')
  }

  return (
    <>
      <Offcanvas show={showSendOptions} onHide={handleCloseSendOptions} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Send Invoice</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Group className="mb-6" controlId="exampleForm.ControlInputFrom">
            <Form.Label>Invoice:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Invoice number"
              disabled
              readOnly
              defaultValue="#INV-987456"
            />
          </Form.Group>
          <Form.Group className="mb-6" controlId="exampleForm.ControlInputFrom">
            <Form.Label>From:</Form.Label>
            <Form.Control type="email" placeholder="wrapcoders@gmail.com" disabled readOnly />
          </Form.Group>
          <Form.Group className="mb-6" controlId="formTo">
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Invoice to...."
              name="to"
              value={to}
              onChange={handleInputChange}
              isInvalid={toError !== ''}
            />
            <Form.Control.Feedback type="invalid">{toError}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-6" controlId="formSubject">
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject...."
              name="subject"
              value={subject}
              onChange={handleInputChange}
              isInvalid={subjectError !== ''}
            />
            <Form.Control.Feedback type="invalid">{subjectError}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-12" controlId="formMessage">
            <Form.Label>Message:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Message...."
              name="message"
              value={message}
              onChange={handleInputChange}
              isInvalid={messageError !== ''}
            />
            <Form.Control.Feedback type="invalid">{messageError}</Form.Control.Feedback>
          </Form.Group>
          <Stack gap={2} direction="horizontal">
            <Button
              variant="primary"
              onClick={handleSendClick}
              className="text-white w-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fi fi-rr-paper-plane me-2 fs-14"></i>
                  Send
                </>
              )}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleCloseSendOptions()
                resetForm()
              }}
              className=" w-50"
            >
              <i className="fi fi-rr-trash me-2 fs-14"></i>
              Cancel
            </Button>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default InvoiceSendOffcanvas

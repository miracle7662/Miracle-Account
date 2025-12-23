import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface AddContactModalProps {
  show: boolean
  onHide: () => void
  onAddContact: (contactData: any) => void
}

const AddContactModal: React.FC<AddContactModalProps> = ({ show, onHide, onAddContact }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    location: '',
    website: '',
    label: '',
    about: '',
  })

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const avatarImageRef = React.useRef<HTMLImageElement | null>(null)
  const avatarImageUploader = React.useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
    imageRef: React.RefObject<HTMLImageElement>,
    imageUploader: React.RefObject<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        const currentImage = imageRef.current
        if (currentImage) {
          currentImage.src = event.target?.result as string
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReset = (
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
    imageRef: React.RefObject<HTMLImageElement>,
    imageUploader: React.RefObject<HTMLInputElement>,
  ) => {
    setImageFile(null)

    const defaultImageSrc = 'https://via.placeholder.com/150' // Replace with a valid image URL
    const currentImage = imageRef.current
    if (currentImage) {
      currentImage.src = defaultImageSrc
    }

    if (imageUploader.current) {
      imageUploader.current.value = ''
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()
    const form = document.getElementById('addContactForm') as HTMLFormElement
    setValidated(true)

    if (form.checkValidity()) {
      setLoading(true)
      setTimeout(() => {
        onAddContact(formData)
        setLoading(false)
        handleDiscard()
        toast.success('Contact added successfully!')
      }, 2000)
    }
  }

  const handleDiscard = () => {
    const form = document.getElementById('addContactForm') as HTMLFormElement
    onHide()
    setValidated(false)
    if (form) {
      form.reset()
    }
    handleReset(setAvatarFile, avatarImageRef, avatarImageUploader)
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate id="addContactForm" validated={validated} onSubmit={handleAddContact}>
            <Row className="gy-6 gx-4">
              <Col lg={12} className="hstack gap-4">
                <div className="mb-0 text-muted">Avatar</div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(e, setAvatarFile, avatarImageRef, avatarImageUploader)
                    }
                    ref={(input) => (avatarImageUploader.current = input)}
                    style={{
                      display: 'none',
                    }}
                  />
                  <div
                    style={{
                      height: '6rem',
                      width: '6rem',
                      cursor: 'pointer',
                    }}
                    className="d-flex align-items-center justify-content-center fs-24 border border-3 rounded overflow-hidden bg-secondary-subtle"
                    onClick={() => avatarImageUploader.current?.click()}>
                    {avatarFile ? (
                      <img
                        src={URL.createObjectURL(avatarFile)}
                        ref={avatarImageRef}
                        className="rounded"
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                        }}
                      />
                    ) : (
                      <FiPlus />
                    )}
                  </div>
                  <p className="text-muted mt-2">
                    Click to change avatar image{' - '}
                    <Link
                      to="#!"
                      className="text-danger"
                      onClick={() =>
                        handleReset(setAvatarFile, avatarImageRef, avatarImageUploader)
                      }>
                      Reset
                    </Link>
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="firstname"
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.firstname}
                    placeholder="First Name...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the first name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="lastname"
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.lastname}
                    placeholder="Last Name...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Control
                    type="tel"
                    name="phone"
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.phone}
                    placeholder="Phone...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the phone number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="role"
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.role}
                    placeholder="Role...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the role.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="location"
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.location}
                    placeholder="Location...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the location.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Control
                    type="url"
                    name="website"
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.website}
                    placeholder="Website...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the website.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="about"
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.about}
                    placeholder="About...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the about.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    onChange={handleInputChange}
                    placeholder="Message...."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the message.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="text-danger" onClick={handleDiscard}>
            Discard
          </Button>
          <Button
            variant="primary"
            onClick={handleAddContact}
            className={`text-white ${loading ? 'disabled' : ''}`}
            disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"></span>
                Adding...
              </>
            ) : (
              <>
                <i className="fi fi-rr-plus me-2 fs-14"></i>
                Add Contact
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddContactModal

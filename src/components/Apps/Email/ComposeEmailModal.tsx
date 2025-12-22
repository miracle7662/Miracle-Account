import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Modal, Button, Form } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import Select from 'react-select'
import {
  CustomSelectOption,
  CustomMultiValue,
} from '@/components/UiElements/Extended/Selects/Components/CustomMultipleComponent'
import { CustomImageOptions } from '@/components/UiElements/Extended/Selects/data'
import 'react-quill/dist/quill.snow.css'

interface ComposeEmailModalProps {
  show: boolean
  onHide: () => void
  onCompose: (emailData: any) => void
}

const ComposeEmailModal: React.FC<ComposeEmailModalProps> = ({ show, onHide, onCompose }) => {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [isCCVisible, setCCVisible] = useState(false)
  const [isBCCVisible, setBCCVisible] = useState(false)
  const [toError, setToError] = useState('')
  const [ccError, setCCError] = useState('')
  const [bccError, setBCCError] = useState('')
  const [subjectError, setSubjectError] = useState('')
  const [bodyError, setBodyError] = useState('')
  const [loading, setLoading] = useState(false)

  const [selectedToOption, setSelectedToOption] = useState<any>(null)
  const [selectedCCOption, setSelectedCCOption] = useState<any>(null)
  const [selectedBCCOption, setSelectedBCCOption] = useState<any>(null)

  const handleReset = () => {
    setSubject('')
    setBody('')
    setCCVisible(false)
    setBCCVisible(false)
    setToError('')
    setCCError('')
    setBCCError('')
    setSubjectError('')
    setBodyError('')
    setSelectedToOption(null)
    setSelectedCCOption(null)
    setSelectedBCCOption(null)
  }

  const handleCompose = () => {
    setToError('')
    setCCError('')
    setBCCError('')
    setSubjectError('')
    setBodyError('')

    let isValid = true

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !selectedToOption ||
      !selectedToOption.length ||
      !selectedToOption.every((option: any) => option.value && emailRegex.test(option.value))
    ) {
      setToError('Please enter valid email address(es).')
      isValid = false
    }

    if (
      isCCVisible &&
      (!selectedCCOption ||
        !selectedCCOption.length ||
        !selectedCCOption.every((option: any) => option.value && emailRegex.test(option.value)))
    ) {
      setCCError('Please enter valid CC email address(es).')
      isValid = false
    }

    if (
      isBCCVisible &&
      (!selectedBCCOption ||
        !selectedBCCOption.length ||
        !selectedBCCOption.every((option: any) => option.value && emailRegex.test(option.value)))
    ) {
      setBCCError('Please enter valid BCC email address(es).')
      isValid = false
    }

    if (!subject) {
      setSubjectError('Please enter the subject.')
      isValid = false
    }

    if (!body) {
      setBodyError('Please enter the message body.')
      isValid = false
    }

    if (isValid) {
      setLoading(true)

      setTimeout(() => {
        const emailData = {
          to: selectedToOption.value,
          subject,
          body,
        }

        onCompose(emailData)

        toast.success('Email sent successfully')
        handleReset()
        setLoading(false)
        onHide()
      }, 2000)
    }
  }

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const quillFormats = ['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image']

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4 position-relative w-100">
              <span className="me-1 fs-12 hstack gap-3 position-absolute end-0">
                <Link to="" className="text-muted" onClick={() => setCCVisible(!isCCVisible)}>
                  CC
                </Link>
                <Link to="" className="text-muted" onClick={() => setBCCVisible(!isBCCVisible)}>
                  BCC
                </Link>
              </span>
              <Form.Label>To</Form.Label>{' '}
              <Select
                isMulti
                isSearchable
                placeholder=""
                options={CustomImageOptions}
                classNamePrefix="select"
                components={{
                  Option: CustomSelectOption,
                  MultiValue: CustomMultiValue,
                }}
                value={selectedToOption}
                onChange={(selectedOption) => setSelectedToOption(selectedOption)}
                className={toError ? 'is-invalid' : ''}
              />
              {toError && <Form.Control.Feedback type="invalid">{toError}</Form.Control.Feedback>}
            </Form.Group>
            {isCCVisible && (
              <Form.Group className="mb-4">
                <Form.Label>Cc</Form.Label>
                <Select
                  isMulti
                  isSearchable
                  placeholder=""
                  options={CustomImageOptions}
                  classNamePrefix="select"
                  components={{
                    Option: CustomSelectOption,
                    MultiValue: CustomMultiValue,
                  }}
                  value={selectedCCOption}
                  onChange={(selectedOption) => setSelectedCCOption(selectedOption)}
                  className={ccError ? 'is-invalid' : ''}
                />
                {ccError && <Form.Control.Feedback type="invalid">{ccError}</Form.Control.Feedback>}
              </Form.Group>
            )}

            {isBCCVisible && (
              <Form.Group className="mb-4">
                <Form.Label>Bcc</Form.Label>
                <Select
                  isMulti
                  isSearchable
                  placeholder=""
                  options={CustomImageOptions}
                  classNamePrefix="select"
                  components={{
                    Option: CustomSelectOption,
                    MultiValue: CustomMultiValue,
                  }}
                  value={selectedBCCOption}
                  onChange={(selectedOption) => setSelectedBCCOption(selectedOption)}
                  className={bccError ? 'is-invalid' : ''}
                />
                {bccError && (
                  <Form.Control.Feedback type="invalid">{bccError}</Form.Control.Feedback>
                )}
              </Form.Group>
            )}
            <Form.Group className="mb-4">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                isInvalid={!!subjectError}
              />
              <Form.Control.Feedback type="invalid">{subjectError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <ReactQuill
                value={body}
                onChange={(value) => setBody(value)}
                modules={quillModules}
                formats={quillFormats}
                theme="snow"
                className={bodyError ? 'is-invalid' : ''}
              />
              {bodyError && <div className="invalid-feedback">{bodyError}</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            className="text-danger"
            onClick={() => {
              handleReset()
              onHide()
            }}
          >
            Discard
          </Button>
          <Button
            variant="primary"
            onClick={handleCompose}
            className="text-white"
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
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ComposeEmailModal

import React from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Row, Col, Stack, Form } from 'react-bootstrap'
import { contactItem } from '@/components/Apps/Contact/data/types'

interface ContactDetailsProps {
  onDelete: () => void
  selectedContact: contactItem | null
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ onDelete, selectedContact }) => {
  if (!selectedContact) {
    return null
  }
  const handleToggleNotification = (checked: boolean) => {
    if (checked) {
      toast.success('Notification enabled')
    } else {
      toast.error('Notification disabled')
    }
  }

  const handleToggleIgnoreMessages = (checked: boolean) => {
    if (checked) {
      toast.success('Ignore Messages enabled')
    } else {
      toast.error('Ignore Messages disabled')
    }
  }

  const handleToggleBlockUser = (checked: boolean) => {
    if (checked) {
      toast.success('Block User enabled')
    } else {
      toast.error('Block User disabled')
    }
  }
  const InviteOptions = [
    { value: 'Guest', label: 'Guest' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Viewer', label: 'Viewer' },
    { value: 'Member', label: 'Member' },
  ]

  const defaultEditorOption = InviteOptions.find((option) => option.value === 'Editor')
  const defaultViewerOption = InviteOptions.find((option) => option.value === 'Viewer')

  const { name, email, phone, role, joined, location, website, message, about } = selectedContact

  return (
    <>
      <PerfectScrollbar className="px-4 py-4 h-100">
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Name:
          </Col>
          <Col sm={10}>{name}</Col>
        </Row>
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Email:
          </Col>
          <Col sm={10}>{email}</Col>
        </Row>
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Phone:
          </Col>
          <Col sm={10}>{phone}</Col>
        </Row>
        <hr className="my-8" />
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Joined:
          </Col>
          <Col sm={10}>{joined}</Col>
        </Row>
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Role:
          </Col>
          <Col sm={10}>{role}</Col>
        </Row>
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Location:
          </Col>
          <Col sm={10}>{location}</Col>
        </Row>
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Website:
          </Col>
          <Col sm={10}>{website}</Col>
        </Row>
        <hr className="my-8" />
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Message:
          </Col>
          <Col sm={10}>{message}</Col>
        </Row>
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            About:
          </Col>
          <Col sm={10}>{about}</Col>
        </Row>
        <hr className="my-8" />
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Settings:
          </Col>
          <Col sm={10}>
            <Form.Check type="switch" id="check-api-notification" className="mb-4">
              <Form.Check.Input
                onChange={(e) => handleToggleNotification(e.target.checked)}
                defaultChecked
              />
              <Form.Check.Label className="ms-2">
                <span className="fw-semibold text-dark">Notification</span>
                <br />
                <span className="fs-13 text-muted">You can enable or disable notification.</span>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check type="switch" id="check-api-ignore-message" className="mb-4">
              <Form.Check.Input onChange={(e) => handleToggleIgnoreMessages(e.target.checked)} />
              <Form.Check.Label className="ms-2">
                <span className="fw-semibold text-dark">Ignore Messages</span>
                <br />
                <span className="fs-13 text-muted">You won't be notified when message you.</span>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check type="switch" id="check-api-block-user" className="mb-0">
              <Form.Check.Input onChange={(e) => handleToggleBlockUser(e.target.checked)} />
              <Form.Check.Label className="ms-2">
                <span className="fw-semibold text-dark">Block User</span>
                <br />
                <span className="fs-13 text-muted">Give feedback and report conversion.</span>
              </Form.Check.Label>
            </Form.Check>
          </Col>
        </Row>
        <hr className="my-8" />
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Contribution:
          </Col>
          <Col sm={10}>
            <div className="d-md-flex align-items-center gap-4 mb-4">
              <Form.Check id="radio-api-role-member">
                <Form.Check.Input type="radio" name="invite-member-radio" />
                <Form.Check.Label className="ms-2" htmlFor="radio-api-role-member">
                  <span className="fw-semibold text-dark">Team Member</span>
                  <br />
                  <span className="fs-13 fw-light ">
                    Can view, comment on, create and edit all of the projects within the wordspace.
                  </span>
                </Form.Check.Label>
              </Form.Check>
              <div className="ms-7 mt-2 ms-md-auto mt-md-0" style={{ minWidth: '150px' }}>
                <Select
                  options={InviteOptions}
                  classNamePrefix="select"
                  defaultValue={defaultEditorOption ? [defaultEditorOption] : []}
                />
              </div>
            </div>
            <div className="d-md-flex align-items-center gap-4">
              <Form.Check id="radio-api-role-contributor">
                <Form.Check.Input type="radio" name="invite-member-radio" />
                <Form.Check.Label className="ms-2" htmlFor="radio-api-role-contributor">
                  <span className="fw-semibold text-dark">Team Contributor</span>
                  <br />
                  <span className="fs-13 fw-light ">
                    Can view, comment on, create and edit projects within a wordspace that you have
                    specifically selected.
                  </span>
                </Form.Check.Label>
              </Form.Check>
              <div className="ms-7 mt-2 ms-md-auto mt-md-0" style={{ minWidth: '150px' }}>
                <Select
                  options={InviteOptions}
                  classNamePrefix="select"
                  defaultValue={defaultViewerOption ? [defaultViewerOption] : []}
                />
              </div>
            </div>
          </Col>
        </Row>
        <hr className="my-8" />
        <Row className="g-2 g-md-6 mb-6">
          <Col sm={2} className="fw-medium text-muted">
            Social:
          </Col>
          <Col sm={10}>
            <Stack direction="horizontal" gap={4}>
              <Link to="">
                <i className="fi fi-brands-facebook"></i>
              </Link>
              <Link to="">
                <i className="fi fi-brands-twitter"></i>
              </Link>
              <Link to="">
                <i className="fi fi-brands-instagram"></i>
              </Link>
              <Link to="">
                <i className="fi fi-brands-linkedin"></i>
              </Link>
            </Stack>
          </Col>
        </Row>
      </PerfectScrollbar>
    </>
  )
}

export default ContactDetails

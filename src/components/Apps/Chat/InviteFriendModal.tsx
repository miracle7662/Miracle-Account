import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import Select from 'react-select'
import {
  CustomSelectOption,
  CustomMultiValue,
} from '@/components/UiElements/Extended/Selects/Components/CustomMultipleComponent'
import { CustomImageOptions } from '@/components/UiElements/Extended/Selects/data'

interface InviteFriendModalProps {
  show: boolean
  inviteEmail: string
  setInviteEmail: React.Dispatch<React.SetStateAction<string>>
  handleInviteClose: () => void
}

const InviteFriendModal: React.FC<InviteFriendModalProps> = ({
  show,
  inviteEmail,
  setInviteEmail,
  handleInviteClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedOptions, setSelectedOptions] = useState<any[]>([])
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleInviteSubmit = () => {
    if (selectedOptions.length === 0) {
      setValidationError('Please select at least one item to send the invitation.')
      return
    }

    setValidationError(null)
    setLoading(true)

    setTimeout(() => {
      toast.success('Invitation sent successfully')
      setLoading(false)
      handleInviteClose()
      setSelectedOptions([])
    }, 2000)
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

  return (
    <Modal centered show={show} onHide={handleInviteClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invite Friends</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {validationError && (
          <Alert
            variant="danger"
            className="mb-3 text-danger"
            style={{ borderStyle: 'dashed', padding: '0.75rem 1rem' }}
          >
            {validationError}
          </Alert>
        )}
        <Select
          isMulti
          isSearchable
          placeholder="Select to invite...."
          options={CustomImageOptions}
          classNamePrefix="select"
          components={{
            Option: CustomSelectOption,
            MultiValue: CustomMultiValue,
          }}
          onChange={(options: any[]) => {
            setValidationError(null)
            setSelectedOptions(options)
          }}
        />
        <hr className="my-4" />
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" className="text-danger" onClick={handleInviteClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleInviteSubmit}
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
              Send Invite
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InviteFriendModal

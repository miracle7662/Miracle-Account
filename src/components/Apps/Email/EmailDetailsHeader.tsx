import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Stack, OverlayTrigger, Tooltip, Dropdown, Button } from 'react-bootstrap'
import { emailItem } from '@/components/Apps/Email/data/types'

const EmailDetailsHeader: React.FC<{
  onDelete: () => void
  handlePrev: () => void
  handleNext: () => void
  selectedEmail: emailItem | null
  selectedEmailIndex: number
  filteredEmails: emailItem[]
  onStarChange: (emailId: string, isStarred: boolean) => void
  setSelectedEmail: React.Dispatch<React.SetStateAction<emailItem | null>>
  setFilteredEmails: React.Dispatch<React.SetStateAction<emailItem[]>>
  setContainerToggle: React.Dispatch<React.SetStateAction<boolean>>
  sidebarLeftToggle: boolean
  setSidebarLeftToggle: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  onDelete,
  handlePrev,
  handleNext,
  selectedEmail,
  selectedEmailIndex,
  filteredEmails,
  onStarChange,
  setFilteredEmails,
  setSelectedEmail,
  setContainerToggle,
  sidebarLeftToggle,
  setSidebarLeftToggle,
}) => {
  const [isStarred, setIsStarred] = useState(selectedEmail?.starred || false)
  const { subject, label } = selectedEmail || {}

  useEffect(() => {
    setIsStarred(selectedEmail?.starred || false)
  }, [selectedEmail])

  const handleStarClick = () => {
    setIsStarred((prev) => !prev)
    const toastMessage = isStarred ? 'Unstarred' : 'Starred'
    toast[isStarred ? 'error' : 'success'](`Email ${toastMessage}`)

    if (selectedEmail) {
      onStarChange(selectedEmail.id, !isStarred)
      setFilteredEmails((prevFilteredEmails) =>
        prevFilteredEmails.map((item) =>
          item.id === selectedEmail.id ? { ...item, starred: !isStarred } : item,
        ),
      )
    }
  }

  const handleGoBack = () => {
    document.querySelector('.apps-card')?.classList.remove('apps-container-toggle')
    setSelectedEmail(null)
    setContainerToggle(false)
    setSidebarLeftToggle(false)
  }

  const handleSidebarLeftToggle = () => {
    document.querySelector('.apps-card')?.classList.add('apps-sidebar-left-toggle')
    setSidebarLeftToggle(true)
    if (sidebarLeftToggle) {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-left-toggle')
      setSidebarLeftToggle(false)
    }
  }

  return (
    <>
      <Stack
        gap={4}
        direction="horizontal"
        className="w-100 px-3 border-bottom align-items-center justify-content-between"
        style={{ minHeight: '4.5rem' }}
      >
        <Stack gap={2} direction="horizontal">
          <Button variant="light" className="btn-icon btn-md" onClick={handleGoBack}>
            <i className="fi fi-rr-arrow-left"></i>
          </Button>
          <div
            className="fs-14 fw-semibold text-dark text-truncate d-none d-sm-flex"
            style={{ maxWidth: '180px' }}
          >
            {subject}
          </div>
          {label && typeof label === 'object' && (
            <div>
              <span className="d-inline-flex align-items-center gap-2 rounded-pill border py-1 px-2">
                <span
                  className={`d-block rounded-circle bg-gradient bg-${label.gradient}`}
                  style={{ width: '7px', height: '7px' }}
                ></span>
                <span className="fs-12">{label.name}</span>
              </span>
            </div>
          )}
        </Stack>
        <Stack direction="horizontal" gap={1} className="justify-content-end">
          <Button
            variant="light"
            className="btn-icon btn-md d-none d-lg-flex"
            onClick={handleSidebarLeftToggle}
          >
            <i className="fi fi-rr-menu-burger"></i>
          </Button>
          <Button variant="light" className="btn-icon btn-md" onClick={handleStarClick}>
            <i className={`fi fi-rr-star fs-14 ${isStarred ? 'text-warning' : ''}`}></i>
          </Button>
          <OverlayTrigger overlay={<Tooltip>Prev</Tooltip>}>
            <Button
              variant="light"
              className="btn-icon btn-md"
              onClick={handlePrev}
              disabled={selectedEmailIndex <= 0}
            >
              <i className="fi fi-rr-angle-left"></i>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Next</Tooltip>}>
            <Button
              variant="light"
              className="btn-icon btn-md"
              onClick={handleNext}
              disabled={selectedEmailIndex >= filteredEmails.length - 1}
            >
              <i className="fi fi-rr-angle-right"></i>
            </Button>
          </OverlayTrigger>
          <Dropdown id="dropdown-email-actions">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-email-options"
              className="btn-icon btn-md arrow-none"
            >
              <i className="fi fi-br-menu-dots-vertical fs-14"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="fi fi-rr-ban"></i>
                <span className="ms-3">Unread</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-time-half-past"></i>
                <span className="ms-3">Snooze</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-check-circle"></i>
                <span className="ms-3">Add Tasks</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className="fi fi-rr-triangle-warning"></i>
                <span className="ms-3">Report Spam</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-anchor"></i>
                <span className="ms-3">Report Phishing</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger" onClick={onDelete}>
                <i className="fi fi-rr-trash"></i>
                <span className="ms-3">Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </>
  )
}

export default EmailDetailsHeader

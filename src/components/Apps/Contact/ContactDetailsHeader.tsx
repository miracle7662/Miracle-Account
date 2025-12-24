import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import { Stack, OverlayTrigger, Tooltip, Dropdown, Button } from 'react-bootstrap'
import { contactItem } from '@/components/Apps/Contact/data/types'

interface ContactDetailsHeaderProps {
  onDelete: () => void
  handlePrev: () => void
  handleNext: () => void
  selectedContactIndex: number
  filteredContacts: contactItem[]
  selectedContact: contactItem | null
  setSelectedContact: React.Dispatch<React.SetStateAction<contactItem | null>>
  onStarChange: (contactId: string, isStarred: boolean) => void
  setFilteredContacts: React.Dispatch<React.SetStateAction<contactItem[]>>
  setContainerToggle: React.Dispatch<React.SetStateAction<boolean>>
  sidebarLeftToggle: boolean
  setSidebarLeftToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const ContactDetailsHeader: React.FC<ContactDetailsHeaderProps> = ({
  onDelete,
  handlePrev,
  handleNext,
  selectedContactIndex,
  filteredContacts,
  selectedContact,
  onStarChange,
  setFilteredContacts,
  setSelectedContact,
  setContainerToggle,
  sidebarLeftToggle,
  setSidebarLeftToggle,
}) => {
  const [isStarred, setIsStarred] = useState(selectedContact?.starred || false)
  const { image, name, phone } = selectedContact || {}

  useEffect(() => {
    setIsStarred(selectedContact?.starred || false)
  }, [selectedContact])

  const handleStarClick = () => {
    setIsStarred((prev) => !prev)
    const toastMessage = isStarred ? 'Unstarred' : 'Starred'
    toast[isStarred ? 'error' : 'success'](`${toastMessage} ${selectedContact?.name}!`)

    if (selectedContact) {
      onStarChange(selectedContact.id, !isStarred)
      setFilteredContacts((prevFilteredContacts) =>
        prevFilteredContacts.map((item) =>
          item.id === selectedContact.id ? { ...item, starred: !isStarred } : item,
        ),
      )
    }
  }

  const handleGoBack = () => {
    document.querySelector('.apps-card')?.classList.remove('apps-container-toggle')
    setSelectedContact(null)
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
        direction="horizontal"
        className="px-3 border-bottom justify-content-between"
        style={{ minHeight: '4.5rem' }}
      >
        <Stack gap={2} direction="horizontal">
          <Button variant="light" className="btn-icon btn-md" onClick={handleGoBack}>
            <i className="fi fi-rr-arrow-left"></i>
          </Button>
          <Stack direction="horizontal" gap={3}>
            <div>
              <Avatar type="image" size="md" src={image || ''} alt="User Avatar" />
            </div>
            <div className="d-none d-sm-block">
              <h6 className="mb-1">{name}</h6>
              <span className="fs-13 text-muted d-block">{phone}</span>
            </div>
          </Stack>
        </Stack>
        <Stack direction="horizontal" gap={1}>
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
              disabled={selectedContactIndex <= 0}
            >
              <i className="fi fi-rr-angle-left"></i>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Next</Tooltip>}>
            <Button
              variant="light"
              className="btn-icon btn-md"
              onClick={handleNext}
              disabled={selectedContactIndex >= filteredContacts.length - 1}
            >
              <i className="fi fi-rr-angle-right"></i>
            </Button>
          </OverlayTrigger>
          <Dropdown id="dropdown-contact-actions">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-contact-options"
              className="btn-icon btn-md arrow-none"
            >
              <i className="fi fi-br-menu-dots-vertical fs-14"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="fi fi-rr-pen-nib"></i>
                <span className="ms-3">Edit</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-box"></i>
                <span className="ms-3">Archive</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className="fi fi-rr-check-circle"></i>
                <span className="ms-3">Add Tasks</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-time-half-past"></i>
                <span className="ms-3">Add Labels</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className="fi fi-rr-triangle-warning"></i>
                <span className="ms-3">Report Spam</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-ban"></i>
                <span className="ms-3">Block Contact</span>
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

export default ContactDetailsHeader

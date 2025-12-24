import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Button, Dropdown, DropdownDivider, Stack } from 'react-bootstrap'
import { InvoiceItem } from './data/types'

interface InvoiceContentHeaderProps {
  selectedInvoice: any
  handleSendClick: () => void
  onDeleteInvoice: (invoice: any) => void
  setSelectedInvoice: React.Dispatch<React.SetStateAction<InvoiceItem | null>>
  setContainerToggle: React.Dispatch<React.SetStateAction<boolean>>
  sidebarLeftToggle: boolean
  setSidebarLeftToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const InvoiceContentHeader: React.FC<InvoiceContentHeaderProps> = ({
  selectedInvoice,
  setSelectedInvoice,
  handleSendClick,
  onDeleteInvoice,
  setContainerToggle,
  sidebarLeftToggle,
  setSidebarLeftToggle,
}) => {
  const [isStarred, setIsStarred] = useState<boolean>(false)
  const [isArchive, setIsArchive] = useState<boolean>(false)

  useEffect(() => {
    if (!selectedInvoice) {
      return
    }

    setIsStarred(false)
    setIsArchive(false)
  }, [selectedInvoice])

  const handleStarClick = () => {
    setIsStarred(!isStarred)
    toast[isStarred ? 'error' : 'success'](isStarred ? 'Removed from starred' : 'Added to starred')
  }

  const handleArchiveClick = () => {
    setIsArchive(!isArchive)
    toast[isArchive ? 'error' : 'success'](isArchive ? 'Removed from archive' : 'Added to archive')
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')

    if (printWindow) {
      const contentToPrint = document.getElementById('invoice-content')

      if (contentToPrint) {
        const contentClone = contentToPrint.cloneNode(true)
        const styles = document.getElementsByTagName('style')

        printWindow.document.head.innerHTML = document.head.innerHTML

        for (let i = 0; i < styles.length; i++) {
          printWindow.document.head.appendChild(styles[i].cloneNode(true))
        }

        printWindow.document.body.appendChild(contentClone)

        printWindow.print()
      }
    }
  }

  const handleGoBack = () => {
    document.querySelector('.apps-card')?.classList.remove('apps-container-toggle')
    setSelectedInvoice(null)
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
        <Stack direction="horizontal" gap={2}>
          <Button variant="light" className="btn-icon" onClick={handleGoBack}>
            <i className="fi fi-rr-arrow-left"></i>
          </Button>
          <h5 className="fw-bold mb-0">{selectedInvoice.invnumber}</h5>
        </Stack>
        <Stack direction="horizontal" gap={1}>
          <Button
            variant="light"
            className="btn-icon btn-md d-none d-lg-flex"
            onClick={handleSidebarLeftToggle}
          >
            <i className="fi fi-rr-menu-burger"></i>
          </Button>
          <Button variant="light" className="btn-icon btn-md" onClick={handlePrint}>
            <i className="fi fi-rr-print"></i>
          </Button>
          <Button variant="light" className="btn-icon btn-md" onClick={handleSendClick}>
            <i className="fi fi-rr-paper-plane"></i>
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="light" className="btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="fi fi-rr-edit"></i>
                <span className="ms-3 ">
                  Edit <span className="fs-12 fst-italic fw-light text-muted">(Coming Soon)</span>
                </span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item onClick={handleStarClick}>
                <i className={`fi fi-rr-star ${isStarred ? 'text-warning' : ''}`}></i>
                <span className="ms-3 ">{isStarred ? 'Unstarred' : 'Starred'}</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleArchiveClick}>
                <i className={`fi fi-rr-add-folder ${isArchive ? 'text-success' : ''}`}></i>
                <span className="ms-3 ">{isArchive ? 'Unarchive' : 'Archived'}</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item
                className="text-danger"
                onClick={(e) => {
                  e.stopPropagation()
                  if (selectedInvoice?.id) {
                    onDeleteInvoice(selectedInvoice.id)
                  }
                }}
              >
                <i className="fi fi-rr-trash"></i>
                <span className="ms-3 ">Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </>
  )
}

export default InvoiceContentHeader

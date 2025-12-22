import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Preloader } from '@/components/Misc/Preloader'
import { Button, Card, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import {
  EmailDetails,
  EmailDetailsHeader,
  EmailHeader,
  EmailList,
  EmailSearchBar,
  EmailSidebar,
} from '@/components/Apps/Email'
import ComposeEmailModal from '@/components/Apps/Email/ComposeEmailModal'
import emailItems from '@/components/Apps/Email/data/emailItems'
import { emailItem, Category, Label } from '@/components/Apps/Email/data/types'
import TitleHelmet from '@/components/Common/TitleHelmet'

const Email: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('inbox')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredEmails, setFilteredEmails] = useState<emailItem[]>(emailItems)
  const [selectedEmail, setSelectedEmail] = useState<emailItem | null>(null)
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [containerToggle, setContainerToggle] = useState<boolean>(false)
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false)
  const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false)

  const handleCompose = (emailData: any) => {
    console.log('Composed Email:', emailData)
  }

  const categories: Category[] = [
    {
      name: 'Inbox',
      value: 'inbox',
      icon: 'fi-rr-envelope-plus',
      badge: 5,
      badgeClassName: 'bg-primary-subtle text-primary',
    },
    { name: 'Sent', value: 'sent', icon: 'fi-rr-paper-plane' },
    { name: 'Starred', value: 'starred', icon: 'fi-rr-star' },
    {
      name: 'Draft',
      value: 'draft',
      icon: 'fi-rr-pen-nib',
      badge: 3,
      badgeClassName: 'bg-danger-subtle text-danger',
    },
    { name: 'Spam', value: 'spam', icon: 'fi-rr-triangle-warning' },
    { name: 'Trash', value: 'trash', icon: 'fi-rr-trash' },
  ]

  const labels: Label[] = [
    { name: 'Updates', value: 'updates', gradient: 'primary' },
    { name: 'Important', value: 'important', gradient: 'success' },
    { name: 'Personal', value: 'personal', gradient: 'warning' },
    { name: 'Private', value: 'private', gradient: 'danger' },
  ]

  useEffect(() => {
    setFilteredEmails(emailItems.filter((item) => item.inbox))
  }, [])

  const handleSearch = (value: string) => {
    setSearchTerm(value)

    const filteredEmailsByCategory = emailItems.filter(
      (item) => item[selectedCategory as keyof emailItem],
    )
    const filteredEmailsBySearch = filteredEmailsByCategory.filter((item) =>
      item.message.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredEmails(filteredEmailsBySearch)
  }

  const handleCategoryChange = (categoryValue: string) => {
    setSelectedCategory(categoryValue)
    setSearchTerm('')

    if (labels.find((label) => label.value === categoryValue)) {
      setFilteredEmails(
        emailItems.filter((item) => {
          if (typeof item.label === 'object') {
            return item.label.value === categoryValue
          } else {
            return item.label && item.label.includes(categoryValue)
          }
        }),
      )
    } else {
      setFilteredEmails(emailItems.filter((item) => item[categoryValue as keyof emailItem]))
    }
  }

  const handleEmailItemClick = (email: emailItem) => {
    setSelectedEmail(email)
  }

  const handleStarChange = (emailId: string, isStarred: boolean) => {
    const updatedEmails = filteredEmails.map((item) =>
      item.id === emailId ? { ...item, starred: isStarred } : item,
    )
    setFilteredEmails(updatedEmails)
  }

  const handleDeleteEmail = () => {
    if (selectedEmail) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this email!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3E97FF',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)

          setTimeout(() => {
            const updatedEmails = emailItems.filter((item) => item.id !== selectedEmail.id)

            emailItems.splice(0, emailItems.length, ...updatedEmails)

            const filteredEmailsByCategory = updatedEmails.filter(
              (item) => item[selectedCategory as keyof emailItem],
            )

            setFilteredEmails(filteredEmailsByCategory)

            if (filteredEmailsByCategory.length === 0) {
              setFilteredEmails([])
            }
            setSelectedEmail(null)
            setContainerToggle(false)
            setSidebarLeftToggle(false)
            setLoading(false)
            toast.success('Email deleted successfully')
          }, 1500)
        }
      })
    }
  }

  useEffect(() => {
    const index = filteredEmails.findIndex((email) => email.id === (selectedEmail?.id || ''))
    setSelectedEmailIndex(index)
  }, [filteredEmails, selectedEmail])

  const handleNext = () => {
    if (selectedEmailIndex < filteredEmails.length - 1) {
      const nextIndex = selectedEmailIndex + 1
      setSelectedEmail(filteredEmails[nextIndex])
    }
  }

  const handlePrev = () => {
    if (selectedEmailIndex > 0) {
      const prevIndex = selectedEmailIndex - 1
      setSelectedEmail(filteredEmails[prevIndex])
    }
  }

  useEffect(() => {
    if (sidebarMiniToggle) {
      document.querySelector('.apps-card')?.classList.add('apps-sidebar-mini-toggle')
    } else {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-mini-toggle')
    }
  }, [sidebarMiniToggle])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991.98 && sidebarLeftToggle) {
        document.querySelector('.apps-card')?.classList.remove('apps-sidebar-left-toggle')
      }
    }

    if (sidebarLeftToggle) {
      document.querySelector('.apps-card')?.classList.add('apps-sidebar-left-toggle')
    } else {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-left-toggle')
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [sidebarLeftToggle])

  useEffect(() => {
    if (containerToggle) {
      document.querySelector('.apps-card')?.classList.add('apps-container-toggle')
    } else {
      document.querySelector('.apps-card')?.classList.remove('apps-container-toggle')
    }
  }, [containerToggle])

  return (
    <>
      <TitleHelmet title="Email" />
      <Card className={`apps-card ${sidebarMiniToggle ? 'apps-sidebar-mini-toggle' : ''}`}>
        <div className="apps-sidebar-mini">
          <EmailSidebar
            categories={categories}
            labels={labels}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            setSidebarMiniToggle={setSidebarMiniToggle}
          />
        </div>
        <div className="apps-sidebar apps-sidebar-left">
          <EmailHeader
            selectedCategory={selectedCategory}
            labels={labels}
            categories={categories}
            sidebarMiniToggle={sidebarMiniToggle}
            setSidebarMiniToggle={setSidebarMiniToggle}
          />
          <EmailSearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <EmailList
            filteredEmails={filteredEmails}
            selectedEmail={selectedEmail}
            handleEmailItemClick={handleEmailItemClick}
            setLoading={setLoading}
            setFilteredEmails={setFilteredEmails}
            setContainerToggle={setContainerToggle}
            setSidebarMiniToggle={setSidebarMiniToggle}
          />
        </div>
        <div className="apps-container">
          <div className="apps-container-inner">
            {loading ? (
              <Stack className="align-items-center justify-content-center flex-grow-1 h-100 ">
                <Preloader />
              </Stack>
            ) : !selectedEmail ? (
              <Stack
                className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center"
                style={{ maxWidth: '320px' }}
              >
                <i className="fi fi-rr-envelope-dot fs-48 mb-6"></i>
                <h4 className="fw-bold">Select a mail to read</h4>
                <p className="fs-15 fw-light text-muted mb-4">
                  Select a mail to read from left sidebar email list, and start your conversation.
                </p>
                <Button
                  variant=""
                  className="btn-neutral"
                  onClick={() => setShowComposeModal(true)}
                >
                  <i className="fi fi-br-plus fs-10"></i>
                  <span className="ms-2">New Message</span>
                </Button>
              </Stack>
            ) : (
              <>
                <EmailDetailsHeader
                  onDelete={handleDeleteEmail}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  selectedEmail={selectedEmail}
                  selectedEmailIndex={selectedEmailIndex}
                  setSelectedEmail={setSelectedEmail}
                  filteredEmails={filteredEmails}
                  onStarChange={handleStarChange}
                  setFilteredEmails={setFilteredEmails}
                  setContainerToggle={setContainerToggle}
                  sidebarLeftToggle={sidebarLeftToggle}
                  setSidebarLeftToggle={setSidebarLeftToggle}
                />
                <EmailDetails key={selectedEmail?.id} selectedEmail={selectedEmail} />
              </>
            )}
          </div>
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)}></div>
      </Card>
      <ComposeEmailModal
        show={showComposeModal}
        onHide={() => setShowComposeModal(false)}
        onCompose={handleCompose}
      />
    </>
  )
}

export default Email

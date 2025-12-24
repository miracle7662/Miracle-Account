import React from 'react'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, Stack } from 'react-bootstrap'
import Loading from '@/components/Misc/Loading'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import { emailItem } from '@/components/Apps/Email/data/types'

interface EmailListProps {
  filteredEmails: emailItem[]
  selectedEmail: emailItem | null
  handleEmailItemClick: (email: emailItem) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setFilteredEmails: React.Dispatch<React.SetStateAction<emailItem[]>>
  setContainerToggle: React.Dispatch<React.SetStateAction<boolean>>
  setSidebarMiniToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const EmailList: React.FC<EmailListProps> = ({
  filteredEmails,
  selectedEmail,
  handleEmailItemClick,
  setLoading,
  setFilteredEmails,
  setContainerToggle,
  setSidebarMiniToggle,
}) => {
  const handleEmailtemClick = (email: emailItem) => {
    setSidebarMiniToggle(false)
    setContainerToggle(true)
    setLoading(true)
    setTimeout(() => {
      handleEmailItemClick(email)
      setLoading(false)

      setFilteredEmails((prevFilteredEmails) =>
        prevFilteredEmails.map((item) =>
          item.id === email.id ? { ...item, unread: false } : item,
        ),
      )
    }, 1000)
  }

  return (
    <>
      <PerfectScrollbar className="h-100 d-flex flex-column">
        {filteredEmails.length === 0 ? (
          <ListGroup.Item className="py-4 text-center flex-grow-1">No items found</ListGroup.Item>
        ) : (
          <ListGroup variant="flush" className="flex-grow-1">
            {filteredEmails.map((email, idx) => (
              <ListGroup.Item
                className={`py-4 ${
                  selectedEmail && selectedEmail.id === email.id ? 'bg-secondary-subtle' : ''
                }`}
                key={idx}
                onClick={() => handleEmailtemClick(email)}
                style={{ cursor: 'pointer' }}
              >
                <Stack direction="horizontal" gap={3} className="w-100 align-items-start">
                  <div className="flex-grow-1">
                    <Avatar type="image" size="sm" src={email.image} alt="User Avatar" />
                  </div>
                  <div className="w-100">
                    <Stack direction="horizontal" className="w-100 align-items-start mb-1">
                      <span className="fs-13 text-dark d-block mb-0">{email.name}</span>
                      <Stack direction="horizontal" gap={2} className="ms-auto text-end">
                        {email.attachment && (
                          <Link to="">
                            <i className="fi fi-rr-paperclip-vertical fs-14 text-muted"></i>
                          </Link>
                        )}
                        {email.starred && (
                          <Link to="" className="text-warning">
                            <i className="fi fi-rr-star fs-14"></i>
                          </Link>
                        )}
                      </Stack>
                    </Stack>
                    <div style={{ maxWidth: '275px' }}>
                      <h6 className="fs-14 text-truncate">{email.subject}</h6>
                    </div>
                    <div>
                      <p
                        className="fw-light mw-100"
                        style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        {email.message}
                      </p>
                      <Stack direction="horizontal" gap={2} className="text-muted">
                        <i className="fi fi-rr-calendar fs-12"></i>
                        <small className="text-lowercase">{email.fulldatetime}</small>
                      </Stack>
                    </div>
                  </div>
                </Stack>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <div className="m-4">
          <Loading className="w-100" />
        </div>
      </PerfectScrollbar>
    </>
  )
}

export default EmailList

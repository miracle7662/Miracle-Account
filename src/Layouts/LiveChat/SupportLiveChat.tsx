import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Dropdown, DropdownDivider, Form, Stack } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import profilePic from '@/assets/images/avatars/2.png'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'

const avatarImages = [avatar1, avatar2, avatar3]

interface SupportLiveChatProps {
  show: boolean
}

const supportLinks = [
  { text: 'I need request callback', url: '#!' },
  { text: 'How do I place an order?', url: '#!' },
  { text: 'I need help with something', url: '#!' },
  { text: 'My payment method not working', url: '#!' },
]

const SupportLiveChat = ({ show }: SupportLiveChatProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleChatExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (show) {
      document.body.classList.add('chat-show')
    } else {
      document.body.classList.remove('chat-show')
    }
    if (isExpanded) {
      document.body.classList.add('chat-expanded')
    } else {
      document.body.classList.remove('chat-expanded')
    }
  }, [show, isExpanded])

  return (
    <>
      <Card
        className={`support-live-chat ${show ? 'chat-show' : ''} ${
          isExpanded ? 'chat-expanded' : ''
        }`}
      >
        <Card.Header className="py-3 pe-2 d-flex align-items-center">
          <Stack direction="horizontal" gap={3} className="flex-shrink-0">
            <Avatar type="image" size="md" src={profilePic} alt="Avatar">
              <div className="avatar-status online"></div>
            </Avatar>
            <div>
              <h6 className="mb-1">Althea Cabardo</h6>
              <span className="fs-12 text-success fst-italic">Typing....</span>
            </div>
          </Stack>
          <div className="ms-auto d-flex align-items-center">
            <Button variant="" className="btn-icon" onClick={toggleChatExpanded}>
              {isExpanded ? (
                <i className="fi fi-ss-compress fs-14"></i>
              ) : (
                <i className="fi fi-ss-expand fs-14"></i>
              )}
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="" className="p-0 btn-icon btn-md arrow-none">
                <i className="fi fi-bs-menu-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
                <Dropdown.Item>Chats close</Dropdown.Item>
                <Dropdown.Item>Search chats</Dropdown.Item>
                <Dropdown.Item>Show history</Dropdown.Item>
                <Dropdown.Item>Report admin</Dropdown.Item>
                <Dropdown.Item>Request callback</Dropdown.Item>
                <DropdownDivider />
                <Dropdown.Item className="text-danger">Delete chats</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <PerfectScrollbar className="support-chat-content-body">
          <Card.Body>
            <div className="mt-8 mb-24 text-center mx-auto" style={{ maxWidth: '280px' }}>
              <div className="avatar-group avatar-group-lg mb-4 justify-content-center">
                {avatarImages.map((avatarSrc, index) => (
                  <Avatar
                    key={index}
                    type="image"
                    src={avatarSrc}
                    alt={`User Avatar ${index + 1}`}
                    className="avatar avatar-lg"
                  />
                ))}
              </div>
              <h5 className="text-dark mb-3">Avilable Support Agents</h5>
              <p className="fw-light text-muted">
                Ask us anything - we'll get back to you here or by email within 24 hours.
              </p>
            </div>
            <div className="text-end">
              {supportLinks.map(({ url, text }, idx) => (
                <Link key={idx} to={url} className="d-block mb-3">
                  <span className="rounded-pill border border-primary border-opacity-10 shadow-xs fs-13 fw-normal py-2 px-3">
                    {text}
                  </span>
                </Link>
              ))}
            </div>
          </Card.Body>
        </PerfectScrollbar>
        <Card.Footer className="w-100 ps-2 pe-3 py-3 d-flex align-items-center justify-content-between">
          <Form className="w-100 d-flex align-items-center">
            <div className="w-100 mx-3 position-relative">
              <Form.Control
                type="text"
                className="rounded-pill"
                placeholder="Your message here...."
              />
             
            </div>
            <Button variant="primary" className="btn-icon flex-shrink-0">
              <i className="fi fi-rr-paper-plane"></i>
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </>
  )
}

export default SupportLiveChat

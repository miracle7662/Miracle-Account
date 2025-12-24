import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { toast } from 'react-hot-toast'
import { Button, Col, Dropdown, Form, Row, Stack } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

import { ChatItem } from './data/types'

interface ChatUserInfoSidebarProps {
  selectedChat: ChatItem | null
  setSidebarRightToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatUserInfoSidebar: React.FC<ChatUserInfoSidebarProps> = ({
  selectedChat,
  setSidebarRightToggle,
}) => {
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

  const handleSidebarRightClose = () => {
    document.querySelector('.apps-card')?.classList.remove('apps-sidebar-right-toggle')
    setSidebarRightToggle(false)
  }

  return (
    <>
      <div className="apps-sidebar apps-sidebar-right">
        <Stack
          direction="horizontal"
          className="px-3 border-bottom justify-content-between"
          style={{ minHeight: '4.5rem' }}
        >
          <Button variant="light" className="btn-icon" onClick={handleSidebarRightClose}>
            <i className="fi fi-rr-arrow-left"></i>
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="light" className="btn-icon arrow-none">
              <i className="fi fi-bs-menu-dots-vertical fs-14"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="fi fi-rr-thumbtack"></i>
                <span className="ms-3">Pin</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-edit"></i>
                <span className="ms-3">Edit</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-bell-slash"></i>
                <span className="ms-3">Mute</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-brands-instagram"></i>
                <span className="ms-3">Media</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className="fi fi-rr-ban"></i>
                <span className="ms-3">Block</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-triangle-warning"></i>
                <span className="ms-3">Report</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-shield-check"></i>
                <span className="ms-3">Security</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className="fi fi-rr-settings"></i>
                <span className="ms-3">Settings</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
        <PerfectScrollbar className="h-100">
          <Stack gap={3} className="py-16 align-items-center text-center">
            <div style={{ width: '5rem', height: '5rem' }}>
              <Avatar type="image" src={selectedChat?.image || ''} />
            </div>
            <div className="my-2">
              <h6 className="mb-1">{selectedChat?.name || 'User'}</h6>
              <span className="fs-13 text-muted">{selectedChat?.role || 'No message'}</span>
            </div>
            <div className="fs-11 fw-semibold text-uppercase px-2 py-1 border rounded-pill">
              <span className="fs-10 text-muted me-1">Last Active:</span>
              <span className="text-success">{selectedChat?.time}</span>
            </div>
          </Stack>
          <hr className="m-0" />
          <div className="px-4 py-4">
            <h6 className="fs-11 text-muted text-uppercase mb-3">About Info</h6>
            <p className="mb-0">{selectedChat?.about}</p>
          </div>
          <hr className="m-0" />
          <div className="px-4 py-4">
            <h6 className="fs-11 text-muted text-uppercase mb-4">Personal Info</h6>
            <Row className="g-4 mb-3">
              <Col sm={4} className="fw-semibold">
                Fullname:
              </Col>
              <Col sm={8}>{selectedChat?.name}</Col>
            </Row>
            <Row className="g-4 mb-3">
              <Col sm={4} className="fw-semibold">
                Joined:
              </Col>
              <Col sm={8}>{selectedChat?.joined}</Col>
            </Row>
            <Row className="g-4 mb-3">
              <Col sm={4} className="fw-semibold">
                Email:
              </Col>
              <Col sm={8}>{selectedChat?.email}</Col>
            </Row>
            <Row className="g-4 mb-3">
              <Col sm={4} className="fw-semibold">
                Phone:
              </Col>
              <Col sm={8}>{selectedChat?.phone}</Col>
            </Row>
            <Row className="g-4 mb-3">
              <Col sm={4} className="fw-semibold">
                Location:
              </Col>
              <Col sm={8}>{selectedChat?.location}</Col>
            </Row>
            <Row className="g-4 mb-3">
              <Col sm={4} className="fw-semibold">
                Website:
              </Col>
              <Col sm={8}>{selectedChat?.website}</Col>
            </Row>
          </div>
          <hr className="m-0" />
          <div className="px-4 py-4">
            <h6 className="fs-11 text-muted text-uppercase mb-4">Settings</h6>
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
          </div>
        </PerfectScrollbar>
      </div>
    </>
  )
}

export default ChatUserInfoSidebar
